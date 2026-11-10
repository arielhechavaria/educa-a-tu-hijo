import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeFichas } from './build-assets.mjs';

test('mergeFichas orders by cuaderno then orden', () => {
  const out = mergeFichas([
    { id: 'b-p002-a', cuaderno: 'b', orden: 1 },
    { id: 'a-p003-a', cuaderno: 'a', orden: 2 },
    { id: 'a-p001-a', cuaderno: 'a', orden: 1 },
  ]);
  assert.deepEqual(out.map((f) => f.id), ['a-p001-a', 'a-p003-a', 'b-p002-a']);
});
