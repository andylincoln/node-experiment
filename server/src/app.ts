import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'
import express from 'express'
import { TodoItem } from './entity/TodoItem'

const app = express()
createConnection()
  .then((connection) => {
    if (connection) {
      app.get('/', (req, res) => {
        res.send('I love it when a plan comes together!')
      })

      app.get('/todo/', async (req, res) => {
        const todos = await connection
          .getRepository(TodoItem)
          .createQueryBuilder('ti')
          .orderBy('ti.id', 'ASC')
          .getMany()
        console.log(todos)

        res.json({
          status: 'success',
          data: todos,
        })
      })
    }
  })
  .catch((e) => {
    console.error('Could not connect to database', e)
  })

export default app
