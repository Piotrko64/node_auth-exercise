import sha3 from 'crypto-js/sha3';
import { Request, Response } from 'express';
import { prisma } from '../app';
import { isValidation } from '../utils/validation';

export async function createUser(req: Request, res: Response) {
   let { login, password } = req.body;

   if (!login || !password) {
      return res.status(406).json({ err: 'Something is bad with request' });
   }

   if (!isValidation(login, password)) {
      return res.status(406).json({ err: 'Password or login is too short' });
   }

   password = sha3(password).toString();

   try {
      await prisma.user.create({
         data: { login, password },
      });
   } catch (err) {
      return res.status(406).json({ err: 'User already exist' });
   }

   res.json(`User ${login} is created`);
}
