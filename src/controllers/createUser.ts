import sha3 from 'crypto-js/sha3';
import { Request, Response } from 'express';
import { prisma } from '../app';

export async function createUser(req: Request, res: Response) {
   let { login, password } = req.body;

   if (!login || !password) {
      return res.send({ error: 'Something is wrong' });
   }

   password = sha3(password).toString();

   try {
      await prisma.user.create({
         data: { login, password },
      });
   } catch (err) {
      return res.json({ err });
   }

   res.json(`User ${login} is created`);
}
