const test = require("node:test");
const assert = require("node:assert/strict");

const { readProjects } = require("./workStore");

test("work projects include gallery and detail section metadata", async () => {
  const projects = await readProjects();
  assert.ok(Array.isArray(projects), "projects should be an array");
  assert.ok(projects.length > 0, "projects should not be empty");

  const first = projects[0];
  assert.ok(
    Array.isArray(first.galleryImages),
    "galleryImages should be an array",
  );
  assert.ok(
    Array.isArray(first.detailSections),
    "detailSections should be an array",
  );
});
