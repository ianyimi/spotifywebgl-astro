import { createClient } from '@libsql/client/http';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({
  url: import.meta.env.DATABASE_CONNECTION_STRING,
  authToken: import.meta.env.DATABASE_AUTH_TOKEN,
});
export const db = drizzle(client);
