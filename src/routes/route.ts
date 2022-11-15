import express from 'express';
import { pages } from '../data/pages';
import { createUser } from '../controllers/createUser';
import { loginUser } from '../controllers/loginUser';
import { getStatus } from '../controllers/getStatus';
import { logoutUser } from '../controllers/logoutUser';
import { addEvent } from '../controllers/addEvent';
import { autoLogin } from '../controllers/autoLogin';
import { getEvents } from '../controllers/getEvents';
import { addEventById } from '../controllers/addEventById';
import { isAuth } from '../middlewares/isAuth';
const router = express.Router();

pages.forEach((name) => {
   router.get(`/${name}`, (_req, res) => {
      res.render(name);
   });
});

router.post('/api/createUser', createUser);

router.post('/api/login', loginUser);

router.post('/api/autoLogin', autoLogin);

router.get('/api/status', isAuth, getStatus);

router.delete('/api/logout', logoutUser);

router.post('/api/addEvent', isAuth, addEvent);

router.post('/api/getEvents', isAuth, getEvents);

router.post('/api/addEventById', isAuth, addEventById);

export default router;
