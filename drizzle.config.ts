import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/db/schema.ts',
  driver: 'turso',
  out: './src/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_CONNECTION_STRING as string,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  verbose: true,
} satisfies Config;
