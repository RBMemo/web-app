const { Job } = require('node-schedule');
const { logger } = require('../lib/logger');

class BaseJob extends Job {
  constructor(name, job) {
    super(name, async () => {
      try {
        await job;
      } catch (e) {
        logger.error(e);
      }
    });
    
    this.on('scheduled', this.onScheduled);
    this.on('success', this.onSuccess);
  }

  onScheduled() {
    logger.info(`[${this.name}][JobStart]`);
  }

  onSuccess() {
    logger.info(`[${this.name}][JobRun]`);
  }  
}

module.exports = BaseJob;
