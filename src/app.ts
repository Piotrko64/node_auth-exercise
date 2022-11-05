import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PORT } from '../config';
import ejsLayout from 'express-ejs-layouts';

export const app = express();
export const prisma = new PrismaClient();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(ejsLayout);
app.set('layout', '');

app.listen(PORT, () => {
   console.log('App is starting...');
});
