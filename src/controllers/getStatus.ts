import { Request, Response } from 'express';
import { prisma } from '../app';
import { getUserIdBySessionId } from '../helpers/getUserIdbySessionId';

export async function getStatus(req: Request, res: Response) {
   const sessionId = req.cookies.sessionId;

   try {
      const idUser = await getUserIdBySessionId(sessionId);

      const findUser = await prisma.user.findUnique({
         where: { id: idUser },
         include: { TimerEvents: true },
      });

      res.json({
         message: 'User is Login',
         login: findUser,
      });
   } catch (err) {
      res.json({
         err,
      });
   }
}
