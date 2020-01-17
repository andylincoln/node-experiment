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
        const errors = await validate(todoItem)
        if (errors.length === 0) {
          await getRepository(TodoItem).save(todoItem)
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
        const { completed = null, text = null } = req.body
        const todoId = req.params.id
        const todoRepo = getRepository(TodoItem)
        const todoItem = await todoRepo.findOne({
          where: [{ id: todoId }],
        })
        todoItem.completed = completed ? completed : todoItem.completed
        todoItem.text = text ? text : todoItem.text
        todoRepo.save(todoItem)
        res.json({
          status: 'success',
          data: todoItem,
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
