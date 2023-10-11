import "dotenv/config";
import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["production", "developement", "test"])
    .default("developement"),
  PORT: z.coerce.number().default(5555),
});

const validationSchema = environmentSchema.safeParse(process.env);

if (!validationSchema.success) {
  console.error("Invalid environment", validationSchema.error.format());
  throw new Error("Invalid environment");
}

export const env = validationSchema.data;
