import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PORT } from '../config';
import ejsLayout from 'express-ejs-layouts';
import path from 'path';

export const app = express();
export const prisma = new PrismaClient();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(ejsLayout);

app.set('view engine', 'ejs');
app.set('views', path.join(`${__dirname}/views`));
app.set('layout', '../views/layout/main.ejs');

app.listen(PORT, () => {
   console.log('App is starting...');
});
