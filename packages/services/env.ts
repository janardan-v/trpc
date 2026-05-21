import { z } from "zod";

const envSchema = z.object({
  ACCESS_SECRET: z.string(),
  ACCESS_EXPIRES_IN: z.string(),

  REFRESH_SECRET: z.string(),
  REFRESH_EXPIRES_IN: z.string(),

  VERIFICATION_SECRET: z.string(),
  VERIFICATION_EXPIRES_IN: z.string(),
})

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) throw new Error(safeParseResult.error.message);
  return safeParseResult.data;
}

export const env = createEnv(process.env);
