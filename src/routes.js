import Router from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import authMiddleware from './middlewares/auth';
import SessionController from './app/controllers/SessionController';

/** Configurations */
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';

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

/**
 * File Upload
 */
routes.post('/files', upload.single('file'), FileController.store);

/**
 * User Routes
 */
routes.post('/users', authMiddleware, UserController.store);

export default routes;
