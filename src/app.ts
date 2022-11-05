import bodyParser from 'body-parser';
import express from 'express';
import { getPathToView } from './utils/getPathToView';
import { PrismaClient } from '@prisma/client';
import sha3 from 'crypto-js/sha3';
import { v4 } from 'uuid';
import { getExpires } from './utils/getExpires';
import cookieParser from 'cookie-parser';

const prisma = new PrismaClient();
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true });

app.get('/register', (req, res) => {
   res.sendFile(getPathToView('register.html'));
});
app.get('/login', (req, res) => {
   res.sendFile(getPathToView('login.html'));
});
app.get('/status', (req, res) => {
   res.sendFile(getPathToView('status.html'));
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

      await prisma.session.create({
         data: { userId: user.id, sessionId },
      });

      return res
         .cookie('sessionID', sessionId, getExpires())
         .json('User is login');
   } catch (err) {
      return res.json({ err });
   }
});

app.get('/api/status', async (req, res) => {
   const sessionId = req.cookies.sessionID;
   if (!sessionId) {
      return res.json({
         err: 'Sesja wygasła',
      });
   }
   try {
      const findSession = await prisma.session.findUnique({
         where: { sessionId },
      });

      const idUser = findSession?.userId;
      const findUser = await prisma.user.findUnique({
         where: { id: idUser },
         include: { TimerEvents: true },
      });

      res.json({
         message: sessionId ? 'JESTEŚ ZALOGOWANY' : 'NIE JESTEŚ ZALOGOWANY',
         login: findUser,
      });
   } catch (err) {
      res.json({
         err,
      });
   }
});

app.listen(3100, () => {
   console.log('App is starting...');
});
