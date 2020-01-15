import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TodoItem from '../TodoItem'

const App = function() {
  const [todoItems, setTodoItems] = useState([])
  useEffect(() => {
    axios
      .get('/todo')
      .then((response) => {
        setTodoItems(response.data.data)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div>
      <h1>TODO</h1>
      <ul>
        {todoItems.map((todoItem) => (
          <TodoItem key={`todoitem-${todoItem}`} {...todoItem} />
        ))}
      </ul>
    </div>
  )
}

export default App
