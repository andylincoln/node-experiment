import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'
import express from 'express'

const app = express()
createConnection().then((connection) => {
  if (connection) {
    app.get('/', (req, res) => {
      res.send('I love it when a plan comes together!')
    })
  }
})

export default app
