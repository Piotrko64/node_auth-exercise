import express from 'express';
import { pages } from '../data/pages';
import { createUser } from '../controllers/createUser';
import { loginUser } from '../controllers/loginUser';
import { getStatus } from '../controllers/getStatus';
const router = express.Router();

pages.forEach((name) => {
   router.get(`/${name}`, (_req, res) => {
      res.render(name);
   });
});

router.post('/api/createUser', createUser);

router.post('/api/login', loginUser);

router.get('/api/status', getStatus);

router.delete('/api/logout');

export default router;
