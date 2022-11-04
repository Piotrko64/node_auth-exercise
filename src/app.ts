import bodyParser from 'body-parser'
import express from 'express'
import { getPathToView } from './utils/getPathToView'

const app = express()

app.use(bodyParser.json())
bodyParser.urlencoded({ extended: true })

app.get('/', (req, res) => {
   res.sendFile(getPathToView('register.html'))
})
app.post('/api/user', (req, res) => {
   console.log(req.body)
   res.json(req.body)
})

app.listen(3100, () => {
   console.log('App is starting...')
})
