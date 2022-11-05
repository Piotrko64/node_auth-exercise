import { app, prisma } from './app';
import { getPathToView } from './utils/getPathToView';
import sha3 from 'crypto-js/sha3';
import { v4 } from 'uuid';
import { getExpires } from './utils/getExpires';

app.get('/register', (req, res) => {
   res.render('register');
});
app.get('/login', (req, res) => {
   res.render('login');
});
app.get('/status', (req, res) => {
   res.render('status');
});
app.get('/logout', (req, res) => {
   res.render('logout');
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

      if (!idUser) {
         res.json({
            message: 'Użytkownik nie jest zalogowany',
         });
      }

      const findUser = await prisma.user.findUnique({
         where: { id: idUser },
         include: { TimerEvents: true },
      });

      res.json({
         message: 'JESTEŚ ZALOGOWANY',
         login: findUser,
      });
   } catch (err) {
      res.json({
         err,
      });
   }
});

app.delete('/api/logout', async (req, res) => {
   try {
      const sessionId = req.cookies.sessionID;

      const findSession = await prisma.session.findUnique({
         where: { sessionId },
      });

      await prisma.session.deleteMany({
         where: { userId: findSession?.userId },
      });
      res.clearCookie('sessionID').json({ message: 'Zostałeś wylogowany' });
   } catch (err) {
      res.json({ err });
   }
});
