import { createHmac, timingSafeEqual } from 'node:crypto';

function decodeBase32(input: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const clean = input.toUpperCase().replace(/=+$/,'').replace(/\s+/g,'');
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];
  for (const character of clean) {
    const index = alphabet.indexOf(character);
    if (index < 0) throw new Error('Invalid base32 secret');
    value = (value << 5) | index;
    bits += 5;
    if (bits >= 8) { bytes.push((value >>> (bits - 8)) & 255); bits -= 8; }
  }
  return Buffer.from(bytes);
}

function codeAt(secret: string, counter: number) {
  const message = Buffer.alloc(8);
  message.writeBigUInt64BE(BigInt(counter));
  const digest = createHmac('sha1', decodeBase32(secret)).update(message).digest();
  const offset = digest[digest.length - 1] & 15;
  const code = (digest.readUInt32BE(offset) & 0x7fffffff) % 1_000_000;
  return String(code).padStart(6, '0');
}

export function verifyTotp(secret: string, supplied: string, now = Date.now()) {
  if (!/^\d{6}$/.test(supplied)) return false;
  const counter = Math.floor(now / 30_000);
  return [-1, 0, 1].some(window => {
    const expected = Buffer.from(codeAt(secret, counter + window));
    const received = Buffer.from(supplied);
    return expected.length === received.length && timingSafeEqual(expected, received);
  });
}
