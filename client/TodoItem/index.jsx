import React from 'react'
import classNames from 'classnames'

import styles from './styles.css'

const TodoItem = ({ id, text, completed, handleCheck }) => (
  <li
    className={classNames(styles.todoItem, { [styles.completed]: completed })}
  >
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
