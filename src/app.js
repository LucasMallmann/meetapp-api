import express from 'express';

class App {
  constructor() {
    this.server = express();
  }

  middlewares() {
    this.server.use(express.json());
  }
}

export default new App().server;
