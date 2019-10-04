import 'dotenv/config';
import Youch from 'youch';
import 'express-async-errors';
import express from 'express';
import routes from './routes';

/**
 * Loads database initialization
 */
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exception();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exception() {
    this.server.use(async (err, req, res, next) => {
      console.log('FUUUUUUUUUUUUUUARCK');
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    });
  }
}

export default new App().server;
