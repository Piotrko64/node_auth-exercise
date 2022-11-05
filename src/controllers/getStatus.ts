import { Request, Response } from 'express';
import { prisma } from '../app';

export async function getStatus(req: Request, res: Response) {
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
}
