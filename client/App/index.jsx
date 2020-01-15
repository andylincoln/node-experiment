import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TodoItem from '../TodoItem'
import NewItemForm from '../NewItemForm'

const App = function() {
  function getTodoItems() {
    axios
      .get('/todo/')
      .then((response) => {
        setTodoItems(response.data.data)
      })
      .catch((error) => console.error(error))
  }

  function handleSubmit(e) {
    const formData = {
      text: e.target.elements.text.value,
      completed: false,
    }
    axios.post('/todo/', formData).then((response) => {
      if (response.status == 200) {
        getTodoItems()
      }
    })
  }

  const [todoItems, setTodoItems] = useState([])
  useEffect(getTodoItems, [])

  return (
    <div>
      <h1>TODO</h1>
      <ul>
        {todoItems.map((todoItem) => (
          <TodoItem key={`todoitem-${todoItem.id}`} {...todoItem} />
        ))}
      </ul>
      <NewItemForm handleSubmit={handleSubmit} />
    </div>
  )
}

export default App
