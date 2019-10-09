import Router from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import authMiddleware from './middlewares/auth';
import SessionController from './app/controllers/SessionController';

/** Configurations */
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OrganizingController from './app/controllers/OrganizingController';
import SubscriptionController from './app/controllers/SubscriptionController';

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
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

/**
 * Organizing
 */
routes.get('/organizing', OrganizingController.list);

/**
 * Subscription
 */
routes.post('/subscription/:meetupId', SubscriptionController.store);

export default routes;
