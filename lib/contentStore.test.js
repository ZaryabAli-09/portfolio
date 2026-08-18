const test = require('node:test');
const assert = require('node:assert/strict');

const { readToolbox, readSiteSettings } = require('./contentStore');

test('readToolbox returns a list of toolbox groups', async () => {
  const items = await readToolbox();
  assert.ok(Array.isArray(items), 'toolbox data should be an array');
  assert.ok(items.length > 0, 'toolbox should not be empty');
  assert.ok(Array.isArray(items[0].tags), 'each toolbox group should include tags');
});

test('readSiteSettings returns portfolio metadata', async () => {
  const settings = await readSiteSettings();
  assert.ok(settings && typeof settings === 'object');
  assert.ok(settings.name, 'site name should exist');
  assert.ok(settings.email, 'site email should exist');
  assert.ok(Array.isArray(settings.socialLinks), 'social links should be an array');
});
