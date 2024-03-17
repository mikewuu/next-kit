import { Client } from 'pg'
import { getConnectionStringFromEnv } from 'pg-connection-from-env'
import migrate from 'node-pg-migrate'
import { join } from 'node:path'
import process from 'node:process'

const migrationDir = join(__dirname, '../migrations')

const database = process.env.POSTGRES_DB

;(async () => {
  const client = new Client(
    getConnectionStringFromEnv({
      fallbackDefaults: {
        database,
      },
    })
  )
  await client.connect()

  await migrate({
    dbClient: client,
    direction: 'up',
    schema: 'public',
    createSchema: true,
    createMigrationsSchema: true,
    migrationsSchema: 'migrations',
    migrationsTable: 'pgmigrations',
    verbose: false,
    dir: migrationDir,
  })

  console.log('Running migrations...')

  await client.end()

  console.log('Migrations completed')
})()
