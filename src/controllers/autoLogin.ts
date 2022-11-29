import { Request, Response } from 'express';
import { getDateExpires, getExpires } from '../utils/getExpires';
import { getUserIdBySessionId } from '../helpers/getUserIdbySessionId';
import { prisma } from '../app';

export async function autoLogin(req: Request, res: Response) {
   const sessionId = req.cookies.sessionId;

   try {
      if (!sessionId) {
         return res.status(403).json({ message: 'Session expired' });
      }
      const userId = await getUserIdBySessionId(sessionId);

      const allEvents = await prisma.timerEvent.findMany({
         where: {
            userId,
         },
      });

      return res.cookie('sessionId', sessionId, getExpires()).json({
         message: 'User is login',
         dataUser: { allEvents },
         cookie: `sessionId=${sessionId};expires=${getDateExpires()}`,
      });
   } catch (err) {
      res.status(401).json({ err: 'Something went wrong...' });
   }
}
