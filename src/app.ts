import bodyParser from 'body-parser';
import express from 'express';
import { getPathToView } from './utils/getPathToView';
import { PrismaClient } from '@prisma/client';
import sha3 from 'crypto-js/sha3';
import { v4 } from 'uuid';
import { getExpires } from './utils/getExpires';

const secretPhrase = '326bsahkasjk:9|%$2wq29DSFH';

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true });

app.get('/register', (req, res) => {
   res.sendFile(getPathToView('register.html'));
});
app.get('/login', (req, res) => {
   res.sendFile(getPathToView('login.html'));
});

app.post('/api/createUser', async (req, res) => {
   let { login, password } = req.body;

   if (!login || !password) {
      return res.send({ error: 'Something is wrong' });
   }

   password = sha3(password).toString();

   try {
      await prisma.user.create({
         data: { login, password },
      });
   } catch (err) {
      return res.json({ err });
   }

   res.json(`User ${login} is created`);
});

app.post('/api/login', async (req, res) => {
   let { login, password } = req.body;

   if (!login || !password) {
      return res.send({ error: 'Something is wrong' });
   }

   try {
      const user = await prisma.user.findUnique({
         where: { login },
      });

      if (user?.password !== sha3(password).toString()) {
         return res.json({ err: 'Wrong password or login' });
      }
      const sessionId = v4();

      res.cookie('sessionID', sessionId, getExpires()).json('User is login');

      const session = await prisma.session.create({
         data: { userId: user.id, sessionId },
      });
   } catch (err) {
      return res.json({ err });
   }
});

app.listen(3100, () => {
   console.log('App is starting...');
});
