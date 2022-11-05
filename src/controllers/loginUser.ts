import { Request, Response } from 'express';
import { prisma } from '../app';
import { v4 } from 'uuid';
import sha3 from 'crypto-js/sha3';
import { getExpires } from '../utils/getExpires';
import { isValidation } from '../utils/validation';

export async function loginUser(req: Request, res: Response) {
   let { login, password } = req.body;

   try {
      if (!isValidation(login, password)) {
         return res.status(406).json({ err: 'password or login is too short' });
      }

      const user = await prisma.user.findUnique({
         where: { login },
      });

      if (user?.password !== sha3(password).toString()) {
         return res.json({ err: 'Wrong password or login' });
      }
      const sessionId = v4();

      await prisma.session.create({
         data: { userId: user.id, sessionId },
      });

      return res
         .cookie('sessionID', sessionId, getExpires())
         .json('User is login');
   } catch (err) {
      return res.json({ err });
   }
}
