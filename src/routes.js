import Router from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import authMiddleware from './middlewares/auth';
import SessionController from './app/controllers/SessionController';

/** Configurations */
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';

/** Multer */
const upload = multer(multerConfig);

const routes = new Router();

/**
 * Home
 */
routes.get('/', UserController.index);

/**
 * Session
 */
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

/**
 * File Upload
 */
routes.post('/files', upload.single('file'), FileController.store);

/**
 * User Routes
 */
routes.post('/users', UserController.store);

/**
 * Meetups Routes
 */
routes.post('/meetups', MeetupController.store);

export default routes;
