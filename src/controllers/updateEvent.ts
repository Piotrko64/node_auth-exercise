import { Request, Response } from 'express';
import { prisma } from '../app';

export async function updateEvent(req: Request, res: Response) {
   try {
      const { eventId, title, description, dataEvent } = req.body;

      const updateUser = await prisma.timerEvent.update({
         where: {
            eventId,
         },
         data: {
            title,
            description,
            dataEvent,
         },
      });

      res.json({ message: 'Event has been updated', data: updateUser });
   } catch (err) {
      res.status(401).json({ err: 'Try again later', details: err });
   }
}
