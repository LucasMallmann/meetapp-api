import Router from 'express';

import UserController from './app/controllers/UserController';
import authMiddleware from './middlewares/auth';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', UserController.index);

/**
 * Session Controller
 */
routes.post('/sessions', SessionController.store);

/**
 * User Routes
 */
routes.post('/users', authMiddleware, UserController.store);

export default routes;
