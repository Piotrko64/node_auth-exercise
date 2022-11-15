import { NextFunction, Request, Response } from 'express';
import { getUserIdBySessionId } from '../helpers/getUserIdbySessionId';

export async function isAuth(req: Request, res: Response, next: NextFunction) {
   const sessionId = req.cookies.sessionId;

   if (!sessionId) {
      return res.status(401).json({
         err: 'Session is end',
      });
   }
   const idUser = await getUserIdBySessionId(sessionId);

   if (!idUser) {
      return res.json({
         message: 'User is not login',
      });
   }
   next();
}
