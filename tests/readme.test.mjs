import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("README explains the project before implementation details", async () => {
  const readme = await readFile("README.md", "utf8");

  for (const phrase of [
    "60 秒看懂",
    "它解决什么问题",
    "适合谁",
    "快速开始",
    "当前证据状态",
    "Simulated",
    "npm test"
  ]) {
    assert.match(readme, new RegExp(phrase, "i"));
  }
});
