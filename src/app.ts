import bodyParser from 'body-parser';
import express from 'express';
import { getPathToView } from './utils/getPathToView';
import { PrismaClient } from '@prisma/client';
import sha3 from 'crypto-js/sha3';
import { uuid } from 'uuidv4';

const secretPhrase = '326bsahkasjk:9|%$2wq29DSFH';

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true });

app.get('/register', (req, res) => {
   res.sendFile(getPathToView('register.html'));
});

app.post('/api/createUser', async (req, res) => {
   let { login, password } = req.body;

   if (!login || !password) {
      return res.send({ error: 'Something is wrong' });
   }

   password = sha3(password).toString();
   console.log(password);
   try {
      await prisma.user.create({
         data: { login, password },
      });
   } catch (err) {
      return res.json({ err });
   }

   res.json(`User ${login} is created`);
});

// app.post('/api/login', async (req, res) => {
//    let { login, password } = req.body;

//    if (!login || !password) {
//       return res.send({ error: 'Something is wrong' });
//    }

//    try {
//       await prisma.user.findUnique({
//          where: { login, password },
//       });
//    } catch (err) {
//       return res.json({ err });
//    }

//    res.json(`User ${login} is login`);
// });

app.listen(3100, () => {
   console.log('App is starting...');
});
