import React from 'react'

const TodoItem = ({ id, text, completed, handleCheck }) => (
  <li>
    <input
      type="checkbox"
      onChange={handleCheck}
      defaultChecked={completed}
      data-id={id}
    ></input>
    {text}
  </li>
)

export default TodoItem
