import { Response } from 'express';

export function validation(login: string, password: string, res: Response) {
   if (login.length < 4 || password.length < 4) {
      return res.status(406).json({ err: 'password or login is too short' });
   }
}
