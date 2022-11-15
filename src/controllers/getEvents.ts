import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { prisma } from '../app';
import { getUserIdBySessionId } from '../helpers/getUserIdbySessionId';

export async function getEvents(req: Request, res: Response) {
   try {
      const sessionId = req.cookies.sessionId;

      const userId = await getUserIdBySessionId(sessionId);

      if (!userId) {
         return res.status(400).json({ err: 'Something is wrong' });
      }

      const allEvents = await prisma.timerEvent.findMany({
         where: {
            userId,
         },
      });
      res.json({ allEvents });
   } catch (err) {
      res.status(400).json({ err });
   }
}
