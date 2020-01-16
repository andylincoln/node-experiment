import 'reflect-metadata'
import { createConnection, Connection, getRepository } from 'typeorm'
import express from 'express'
import { TodoItem } from './entity/TodoItem'
import { validate } from 'class-validator'

const app = express()
app.use(express.json())

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

        res.json({
          status: 'success',
          data: todos,
        })
      })

      app.post('/todo/', async (req, res) => {
        const { body } = req
        const todoItem = new TodoItem()
        todoItem.completed = body.completed
        todoItem.text = body.text
        console.log('Before validation')
        const errors = await validate(todoItem)
        console.log('after validation')
        if (errors.length === 0) {
          await getRepository(TodoItem).save(todoItem)
          //
          res.status(200).json({
            status: 'success',
            data: todoItem,
          })
        } else {
          res.status(400).json({
            status: 'error',
            data: {
              message: 'Bad Request, Invalid data',
              errors,
            },
          })
        }
      })

      app.put('/todo/:id', async (req, res) => {
        const body = req.body
        const todoItem = await getRepository(TodoItem).save(body)
        res.json({
          status: 'success',
        })
      })

      app.delete('/todo/:id', async (req, res) => {
        res.json({
          status: 'success',
        })
      })
    }
  })
  .catch((e) => {
    console.error('Could not connect to database', e)
  })

export default app
