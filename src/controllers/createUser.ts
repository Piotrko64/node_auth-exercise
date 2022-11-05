import sha3 from 'crypto-js/sha3';
import { Request, Response } from 'express';
import { prisma } from '../app';
import { validation } from '../utils/validation';

export async function createUser(req: Request, res: Response) {
   let { login, password } = req.body;

   validation(login, password, res);

   password = sha3(password).toString();

   try {
      await prisma.user.create({
         data: { login, password },
      });
   } catch (err) {
      return res.json({ err: 'user already exist' });
   }

   res.json(`User ${login} is created`);
}
