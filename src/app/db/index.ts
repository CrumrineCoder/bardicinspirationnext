import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be a Neon postgres connection string')
}

export const getDBVersion = async() => {
    const sql = neon(process.env.DATABASE_URL!);
    const response = await sql`SELECT version()`;
    return { version: response[0].version }
}
