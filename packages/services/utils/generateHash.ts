import crypto from "crypto";

export default function generateHash(salt: string | null, password: string | undefined) {
  const hash = crypto
    .createHmac("sha256", salt as string)
    .update(password as string)
    .digest("hex");
  return hash;
}
