const express = require('express')
const path = require('path')

const PORT = 3000
var number = Math.floor(Math.random() * 100)

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') })
})

app.get('/assets/:fileName', (req, res) => {
  res.sendFile(req.params.fileName, { root: path.join(__dirname, 'public') })
})

app.post('/guess', (req, res) => {
  const guess = req.body.guess

  console.log(`guess: ${guess}, number: ${number}`)

  if (guess === number) {
    number = Math.floor(Math.random() * 100)
    res.json({ correct: true })
  } else {
    let hint = ''

    if (guess < number) hint = 'higher'
    else hint = 'lower'
    
    res.json({ correct: false, hint: hint })
  }
})

console.log(number)
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
