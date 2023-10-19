import { createClient } from '@libsql/client/http';
import { drizzle } from 'drizzle-orm/libsql';

import { env } from '~/env.mjs';

const client = createClient({
  url: env.DATABASE_CONNECTION_STRING,
  authToken: env.DATABASE_AUTH_TOKEN,
});
export const db = drizzle(client);
