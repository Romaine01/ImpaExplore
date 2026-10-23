import { describe, expect, it } from 'vitest';
import { verifyTotp } from './totp.js';

describe('TOTP verification', () => {
  it('accepts the RFC 6238 SHA-1 vector truncated to six digits', () => {
    expect(verifyTotp('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ', '287082', 59_000)).toBe(true);
  });
  it('rejects malformed and expired values', () => {
    expect(verifyTotp('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ', 'not-six', 59_000)).toBe(false);
    expect(verifyTotp('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ', '287082', 180_000)).toBe(false);
  });
});
