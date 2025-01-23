import Bull from 'bull';

// Initialize a queue
type QueueOptions = {
  redis: Bull.QueueOptions['redis'];
  prefix?: string;
};

const createQueue = (queueName: string, options: QueueOptions) => {
  return new Bull(queueName, options);
};


// Adapter class for Bull Queue
export class BullAdapter {
  private queue: Bull.Queue;

  constructor(queueName: string, options: QueueOptions) {
    this.queue = createQueue(queueName, options);
  }

  addJob(data: any, options?: Bull.JobOptions) {
    return this.queue.add(data, options);
  }

  getJobs(jobTypes: Bull.JobStatus[]): Promise<Bull.Job[]> {
    return this.queue.getJobs(jobTypes);
  }

  async process(concurrency: number, processor: Bull.ProcessCallbackFunction<void>) {
    this.queue.process(concurrency, processor);
  }

  onComplete(listener: (job: Bull.Job, result: any) => void) {
    this.queue.on('completed', listener);
  }

  onFailed(listener: (job: Bull.Job, error: Error) => void) {
    this.queue.on('failed', listener);
  }

  pauseQueue() {
    return this.queue.pause();
  }

  resumeQueue() {
    return this.queue.resume();
  }

  closeQueue() {
    return this.queue.close();
  }
}