import express from 'express'
import { Model } from 'objection'
import Knex from 'knex'
import knexConfig from './knexfile'

const app = express()

app.get('/', (req, res) => {
  res.send('I love it when a plan comes together!')
})

// Initialize knex.
const knex = Knex(knexConfig.development)

// Give the knex instance to objection.
Model.knex(knex)

export default app
