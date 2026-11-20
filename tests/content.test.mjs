import test from "node:test";
import assert from "node:assert/strict";
import { validateRepository } from "../scripts/validate.mjs";

test("repository contains the V0.1 workflow contract", async () => {
  const errors = await validateRepository(process.cwd());
  assert.deepEqual(errors, []);
});
