import React from 'react'
import ReactDOM from 'react-dom'

window.todoApp = (elementId) => {
  const container = document.getElementById(elementId)
  ReactDOM.render(<div>I love it when an app comes together!</div>, container)
}
