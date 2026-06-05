export function formatKES(amount: number): string {
  if (amount === 0) return "Contact for price";
  return `KES ${amount.toLocaleString("en-KE")}`;
}
