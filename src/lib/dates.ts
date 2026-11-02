// Today in Jakarta as YYYY-MM-DD: the format dates are stored in the Sheet
export function jakartaToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });
}
