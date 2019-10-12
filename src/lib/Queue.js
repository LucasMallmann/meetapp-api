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
    /**
     * All tasks inside queues are called jobs
     */
    jobs.forEach(job => {
      const { key, handle } = job;
      /**
       * Store the queue that has connection to Redis. Store also the handle, that is going to process the job
       */
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
   * @param {any} jobData Data (parameters) that it's going to pass to the handle function
   */
  add(key, jobData) {
    return this.queues[key].bee.createJob(jobData).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
