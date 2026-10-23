import { describe, expect, it } from 'vitest';
import { packageInput } from './package.schema.js';

describe('package input', () => {
  const valid = { title: 'Demo trail walk', description: 'A guided sample experience for testing.', destinationId: '507f1f77bcf86cd799439011', capacityMax: 6, priceAmount: 0 };
  it('accepts a free package', () => { expect(packageInput.parse(valid).priceAmount).toBe(0); });
  it('rejects zero capacity', () => { expect(packageInput.safeParse({ ...valid, capacityMax: 0 }).success).toBe(false); });
  it('rejects negative prices', () => { expect(packageInput.safeParse({ ...valid, priceAmount: -1 }).success).toBe(false); });
});
