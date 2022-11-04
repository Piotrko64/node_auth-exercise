import bodyParser from 'body-parser'
import express from 'express'
import { getPathToView } from './utils/getPathToView'
import bcrypt from 'bcryptjs'

const app = express()

app.use(bodyParser.json())
bodyParser.urlencoded({ extended: true })

app.get('/register', (req, res) => {
   res.sendFile(getPathToView('register.html'))
})
app.post('/api/user', (req, res) => {
   let { login, password } = req.body
   if (!login || !password) {
      return res.send({ error: 'Something is wrong' })
   }
   password = bcrypt.hashSync(password, 8)
   res.json({ login, password })
})

app.listen(3100, () => {
   console.log('App is starting...')
})
