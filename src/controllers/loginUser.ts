import { Request, Response } from 'express';
import { prisma } from '../app';
import { v4 } from 'uuid';
import sha3 from 'crypto-js/sha3';
import { getDateExpires, getExpires } from '../utils/getExpires';
import { isValidation } from '../utils/validation';
import { getUserIdBySessionId } from '../helpers/getUserIdbySessionId';

export async function loginUser(req: Request, res: Response) {
   let { login, password } = req.body;

   try {
      if (!isValidation(login, password)) {
         return res.status(406).json({ err: 'Password or login is too short' });
      }

      const user = await prisma.user.findUnique({
         where: { login },
      });

      if (user?.password !== sha3(password).toString()) {
         return res.status(401).json({ err: 'Wrong password or login' });
      }
      const sessionId = v4();

      await prisma.session.create({
         data: { userId: user.id, sessionId },
      });

      const userId = await getUserIdBySessionId(sessionId);

      const allEvents = await prisma.timerEvent.findMany({
         where: {
            userId,
         },
      });
      return res.cookie('sessionId', sessionId, getExpires()).json({
         message: 'User is login',
         dataUser: { login, allEvents },
         cookie: `sessionId=${sessionId};expires=${getDateExpires()}`,
      });
   } catch (err) {
      res.status(401).json({ err });
   }
}
