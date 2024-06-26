if (process.env.NODE_ENV !== "production") {
  require("dotenv").config() 
}

const express = require('express')
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {
  res.send(`Example app listening on port ${port}`)
})

app.use(router)
app.use(errorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})