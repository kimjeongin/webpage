import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { env } from '../env'

const connectionString = env.DATABASE_URL

// For migrations
export const migrationClient = postgres(connectionString, { max: 1 })

type GlobalDb = {
  queryClient?: ReturnType<typeof postgres>
}

const globalForDb = globalThis as unknown as GlobalDb

const getQueryClient = () => postgres(connectionString)

const queryClient = globalForDb.queryClient ?? getQueryClient()

if (env.NODE_ENV !== 'production') {
  globalForDb.queryClient = queryClient
}

export const db = drizzle(queryClient, { schema })
