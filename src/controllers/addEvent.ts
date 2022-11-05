import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { prisma } from '../app';
import { getUserIdBySessionId } from '../helpers/getUserIdbySessionId';

export async function addEvent(req: Request, res: Response) {
   try {
      const sessionId = req.cookies.sessionID;
      const { title, description, dataEvent } = req.body;

      if (!sessionId) {
         return res.status(401).json({ err: 'You are not login' });
      }

      const idUser = await getUserIdBySessionId(sessionId);

      if (!idUser) {
         return res.status(400).json({ err: 'Something wrong' });
      }

      const addNewEvent = await prisma.timerEvent.create({
         data: {
            userId: idUser,
            eventId: v4(),
            title,
            description,
            dataEvent,
         },
      });
      res.json({ addNewEvent });
   } catch (err) {
      res.json({ err });
   }
}
