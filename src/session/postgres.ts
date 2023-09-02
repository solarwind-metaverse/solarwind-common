import { getLog } from '../log'
const log = getLog('session/postgres')

import fs from 'fs'
import pg from 'pg'

export const getClientConfig = (): pg.ClientConfig => {

  const { AUTH_DB_HOST, AUTH_DB_USER, AUTH_DB_PASSWORD, PG_SSL_CERT_DIR } = process.env
  console.log(`Configuring PostgreSQL connection ${AUTH_DB_USER}@${AUTH_DB_HOST}`)
  if (!AUTH_DB_HOST) throw new Error('Host not provided for Cassandra connection')

  return {
    user: AUTH_DB_USER,
    host: AUTH_DB_HOST,
    database: 'solarwind',
    password: AUTH_DB_PASSWORD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync(`${PG_SSL_CERT_DIR}/ca-certificate.pem`),
      key: fs.readFileSync(`${PG_SSL_CERT_DIR}/client-key.pem`),
      cert: fs.readFileSync(`${PG_SSL_CERT_DIR}/client-cert.pem`)
    }
  }

}