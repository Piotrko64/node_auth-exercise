import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { prisma } from '../app';
import { getUserIdBySessionId } from '../helpers/getUserIdbySessionId';

export async function addEventById(req: Request, res: Response) {
   try {
      const sessionId = req.cookies.sessionId;
      const { eventId } = req.body;

      const userId = await getUserIdBySessionId(sessionId);

      if (!userId) {
         return res.status(400).json({ err: 'Something wrong' });
      }

      const findEvent = await prisma.timerEvent.findUnique({
         where: {
            eventId,
         },
      });

      if (!findEvent) {
         return res.json({ err: 'This event don"t exist' });
      }

      const { title, description, dataEvent } = findEvent;
      const createOwnEvent = await prisma.timerEvent.create({
         data: {
            userId,
            eventId: v4(),
            title,
            description,
            dataEvent,
         },
      });

      res.json({ createOwnEvent });
   } catch (err) {
      res.status(401).json({ err: 'Something went wrong...' });
   }
}
