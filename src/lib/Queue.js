import Bee from 'bee-queue';
import redisConfig from '../config/redis';

import SubscriptionMail from '../app/jobs/SubscriptionMail';

const jobs = [SubscriptionMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(job => {
      const { key, handle } = job;

      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /**
   * Ads a new job to the queue
   * @param {string} key Unique key of the job
   * @param {any} job Data (parameters) that it's going to pass to the handle function
   */
  add(key, job) {
    return this.queues[key].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failure', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
