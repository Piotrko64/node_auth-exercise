import express from 'express'
import { getPathToView } from './utils/getPathToView'

const app = express()

app.get('/', (req, res) => {
   res.sendFile(getPathToView('register.html'))
})

app.listen(3100, () => {
   console.log('App is starting...')
})
