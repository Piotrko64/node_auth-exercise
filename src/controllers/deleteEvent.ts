import { Request, Response } from 'express';
import { prisma } from '../app';

export async function deleteEvent(req: Request, res: Response) {
   console.log(req.body);
   try {
      const { eventId } = req.body;

      const event = await prisma.timerEvent.delete({
         where: { eventId },
      });
      res.json({
         message: `event ${event.title} has been removed`,
      });
   } catch (err) {
      res.status(401).json({ err });
   }
}
