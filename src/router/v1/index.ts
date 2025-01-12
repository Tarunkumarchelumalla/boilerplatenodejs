import express from 'express';
import userRoute from './user.route';
import publicRoute from './public.route';
import utilRoute from './util.route';

const router = express.Router();


const defaultRoutes = [
  {
    path: '/user',
    route: userRoute
  },
  
  {
    path: '/utils',
    route: utilRoute
  },
  {
    path: '/public',
    route: publicRoute
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router