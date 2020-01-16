import request from 'supertest'
import app from './app'
import { getRepository } from 'typeorm'
import { TodoItem } from './entity/TodoItem'

jest.useFakeTimers()

describe('Test some APIs:', () => {
  // beforeEach(async () => {
  //   await getRepository(TodoItem)
  //     .createQueryBuilder()
  //     .delete()
  //     .execute()
  // })

  it('GET api works', async () => {
    // await getRepository(TodoItem).save([
    //   { id: 1, text: 'Do this', completed: false },
    //   { id: 2, text: 'Do something', completed: false },
    // ])
    const expected: { status: string; data: object[] } = {
      status: 'success',
      data: [
        { id: 1, text: 'Do this', completed: false },
        { id: 2, text: 'Do something', completed: false },
      ],
    }
    const response = await request(app).get('/todo/')

    expect(response).toEqual(expected)
  })
})
