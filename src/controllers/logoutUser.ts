import { Request, Response } from 'express';
import { prisma } from '../app';

export async function logoutUser(req: Request, res: Response) {
   try {
      const sessionId = req.cookies.sessionId;

      const findSession = await prisma.session.findUnique({
         where: { sessionId },
      });

      await prisma.session.deleteMany({
         where: { userId: findSession?.userId },
      });
      res.clearCookie('sessionID').json({ message: 'You are logout' });
   } catch (err) {
      res.status(401).json({ err });
   }
}
