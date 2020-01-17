import React from 'react'
import ReactDOM from 'react-dom'

import App from './src/App'

window.todoApp = (elementId) => {
  const container = document.getElementById(elementId)
  ReactDOM.render(<App />, container)
}
