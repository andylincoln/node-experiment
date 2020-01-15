const express = require('express')

const port = 3000

const app = express()

app.get('/', (req, res) => {
  res.send('I love it when a plan comes together!')
})

app.listen(port, () => {
  console.log('Running!')
})
