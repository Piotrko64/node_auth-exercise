import express from 'express';
import { pages } from '../data/pages';
import { createUser } from '../controllers/createUser';
import { loginUser } from '../controllers/loginUser';
import { getStatus } from '../controllers/getStatus';
import { logoutUser } from '../controllers/logoutUser';
import { addEvent } from '../controllers/addEvent';
import { getEvents } from '../controllers/getEvents';
const router = express.Router();

pages.forEach((name) => {
   router.get(`/${name}`, (_req, res) => {
      res.render(name);
   });
});

router.post('/api/createUser', createUser);

router.post('/api/login', loginUser);

router.get('/api/status', getStatus);

router.delete('/api/logout', logoutUser);

router.post('/api/addEvent', addEvent);

router.post('/api/getEvents', getEvents);

export default router;
