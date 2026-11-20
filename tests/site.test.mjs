import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { buildSite } from "../scripts/build-site.mjs";

test("static site build produces all public pages", async () => {
  const outputDirectory = await mkdtemp(path.join(os.tmpdir(), "pm-flow-site-"));

  try {
    await buildSite({
      sourceDirectory: path.resolve("website"),
      outputDirectory
    });

    const home = await readFile(path.join(outputDirectory, "index.html"), "utf8");
    const workflow = await readFile(
      path.join(outputDirectory, "workflow/index.html"),
      "utf8"
    );

    assert.match(home, /PM Decision Flow/);
    assert.match(home, /五阶段/);
    assert.match(workflow, /证据等级/);
  } finally {
    await rm(outputDirectory, { recursive: true, force: true });
  }
});
