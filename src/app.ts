import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PORT } from '../config';

export const app = express();
export const prisma = new PrismaClient();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
   console.log('App is starting...');
});
