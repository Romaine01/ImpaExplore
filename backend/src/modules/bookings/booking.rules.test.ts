import { describe, expect, it } from 'vitest';
import { serviceDay, canTransition } from './booking.rules.js';

describe('booking rules', () => {
  it('uses the guide service day in Manila, including UTC day boundaries', () => {
    expect(serviceDay(new Date('2026-10-23T16:30:00.000Z'))).toBe('2026-10-24');
    expect(serviceDay(new Date('2026-10-23T15:30:00.000Z'))).toBe('2026-10-23');
  });
  it('allows only the assigned actor to move a pending request', () => {
    expect(canTransition('PENDING', 'CONFIRMED', 'guide')).toBe(true);
    expect(canTransition('PENDING', 'CONFIRMED', 'tourist')).toBe(false);
    expect(canTransition('CONFIRMED', 'DECLINED', 'guide')).toBe(false);
    expect(canTransition('CONFIRMED', 'CANCELLED', 'tourist')).toBe(true);
  });
});
