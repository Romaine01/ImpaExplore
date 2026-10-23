export function serviceDay(start: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit' }).format(start);
}
export function canTransition(from: string, to: string, actor: string): boolean {
  if (from === 'PENDING') return (actor === 'guide' && ['CONFIRMED','DECLINED'].includes(to)) || (actor === 'tourist' && to === 'CANCELLED');
  if (from === 'CONFIRMED') return (actor === 'tourist' || actor === 'guide') && to === 'CANCELLED';
  return false;
}
