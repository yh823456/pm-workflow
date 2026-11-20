import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const REQUIRED_SKILLS = [
  "skills/01-intake.md",
  "skills/02-evidence.md",
  "skills/03-decision.md",
  "skills/04-prd.md",
  "skills/05-verify.md"
];

const REQUIRED_TEMPLATES = [
  "templates/problem-brief.md",
  "templates/evidence-log.md",
  "templates/decision-record.md",
  "templates/lightweight-prd.md",
  "templates/result-review.md"
];

const REQUIRED_STATE_FIELDS = [
  "initiative",
  "stage",
  "owner",
  "evidence_level",
  "status",
  "gate",
  "next_action",
  "updated_at"
];

const ALLOWED_STAGES = new Set([
  "intake",
  "evidence",
  "decision",
  "prd",
  "verify"
]);

const ALLOWED_EVIDENCE_LEVELS = new Set([
  "public",
  "interview",
  "product-data",
  "stakeholder",
  "simulated",
  "mixed"
]);

const IGNORED_DIRECTORIES = new Set([
  ".git",
  "node_modules",
  "dist",
  "cache"
]);

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listMarkdownFiles(root) {
  const files = [];

  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      if (IGNORED_DIRECTORIES.has(entry.name)) {
        continue;
      }

      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }

  await walk(root);
  return files;
}

function normalize(relativePath) {
  return relativePath.split(path.sep).join("/");
}

export async function validateRepository(root = process.cwd()) {
  const errors = [];
  const requiredFiles = [
    ...REQUIRED_SKILLS,
    ...REQUIRED_TEMPLATES,
    "workflow/state.json",
    "workflow/log.md",
    "case-study/customer-feedback-platform/README.md",
    "README.md"
  ];

  for (const relativePath of requiredFiles) {
    if (!(await exists(path.join(root, relativePath)))) {
      errors.push(`Missing required file: ${relativePath}`);
    }
  }

  const statePath = path.join(root, "workflow/state.json");
  if (await exists(statePath)) {
    try {
      const state = JSON.parse(await readFile(statePath, "utf8"));

      for (const field of REQUIRED_STATE_FIELDS) {
        if (!(field in state)) {
          errors.push(`workflow/state.json is missing field: ${field}`);
        }
      }

      if (state.stage && !ALLOWED_STAGES.has(state.stage)) {
        errors.push(`workflow/state.json has invalid stage: ${state.stage}`);
      }

      if (
        state.evidence_level &&
        !ALLOWED_EVIDENCE_LEVELS.has(state.evidence_level)
      ) {
        errors.push(
          `workflow/state.json has invalid evidence_level: ${state.evidence_level}`
        );
      }
    } catch (error) {
      errors.push(`workflow/state.json is not valid JSON: ${error.message}`);
    }
  }

  const caseReadmePath = path.join(
    root,
    "case-study/customer-feedback-platform/README.md"
  );
  if (await exists(caseReadmePath)) {
    const caseReadme = await readFile(caseReadmePath, "utf8");
    for (const phrase of ["SIMULATED CASE", "NOT EXTERNALLY VALIDATED"]) {
      if (!caseReadme.includes(phrase)) {
        errors.push(`Case study is missing disclosure phrase: ${phrase}`);
      }
    }
  }

  const markdownFiles = await listMarkdownFiles(root);
  for (const filePath of markdownFiles) {
    const relativePath = normalize(path.relative(root, filePath));
    if (
      relativePath.startsWith("docs/superpowers/") ||
      relativePath.startsWith("website/")
    ) {
      continue;
    }

    const content = await readFile(filePath, "utf8");
    if (/\b(TBD|TODO|PLACEHOLDER)\b/i.test(content)) {
      errors.push(`Unresolved placeholder marker in: ${relativePath}`);
    }
  }

  return errors;
}

async function main() {
  const errors = await validateRepository(process.cwd());
  if (errors.length === 0) {
    console.log("Repository content is valid.");
    return;
  }

  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  await main();
}
