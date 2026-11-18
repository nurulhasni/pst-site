// Makes a password hash for one admin account.
// Usage: npm run hash-password -- someone@pst.co.id
// The password is asked for interactively so it never lands in shell history.
import { randomBytes, scryptSync } from "node:crypto";
import { createInterface } from "node:readline/promises";

const email = process.argv[2]?.trim().toLowerCase();
if (!email || !email.includes("@")) {
  console.error("Usage: npm run hash-password -- someone@pst.co.id");
  process.exit(1);
}

const prompt = createInterface({ input: process.stdin, output: process.stdout });
const password = await prompt.question("Password (min. 12 characters): ");
prompt.close();

if (password.length < 12) {
  console.error("Password must be at least 12 characters.");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, Buffer.from(salt, "hex"), 64).toString("hex");
console.log(`
For the Admin Users tab in the Sheet, paste this into the password_hash column
of ${email}'s row (status Active). The admin should change it under Settings > Security:

${salt}:${hash}

Or, for an emergency account in the server's .env, add this to ADMIN_USERS
(separate several accounts with commas):

${email}:${salt}:${hash}
`);
