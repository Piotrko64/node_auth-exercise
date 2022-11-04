import bodyParser from 'body-parser';
import express from 'express';
import { getPathToView } from './utils/getPathToView';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true });

app.get('/register', (req, res) => {
   res.sendFile(getPathToView('register.html'));
});

app.post('/api/user', async (req, res) => {
   let { login, password } = req.body;

   if (!login || !password) {
      return res.send({ error: 'Something is wrong' });
   }

   password = bcrypt.hashSync(password, 8);

   try {
      await prisma.user.create({
         data: { login, password },
      });
   } catch (err) {
      return res.json({ err });
   }

   res.json(`User ${login} is created`);
});

app.listen(3100, () => {
   console.log('App is starting...');
});
