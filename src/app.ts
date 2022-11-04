import bodyParser from 'body-parser'
import express from 'express'
import { getPathToView } from './utils/getPathToView'
import bcrypt from 'bcryptjs'

const app = express()

app.use(bodyParser.json())
bodyParser.urlencoded({ extended: true })

app.get('/', (req, res) => {
   res.sendFile(getPathToView('register.html'))
})
app.post('/api/user', (req, res) => {
   const { login, password } = req.body
   if (!login || !password) {
      return res.send({ error: 'Something is wrong' })
   }
   console.log(bcrypt.hashSync(password, 8))
   res.json(req.body)
})

app.listen(3100, () => {
   console.log('App is starting...')
})
