const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')

const checkout = require('./checkout')

const app = express()
let PORT = process.env.PORT || 5000

app.set('view engine', 'hbs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'Stripe Demo'
  })
})

app.post('/pay', async (req,res) => {
  const response = await checkout(req.body)
  res.json(response)
})

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`)
})