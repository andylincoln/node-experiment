import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

window.todoApp = (elementId) => {
  const container = document.getElementById(elementId)
  ReactDOM.render(<App />, container)
}
