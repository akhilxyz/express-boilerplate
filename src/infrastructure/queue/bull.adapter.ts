// // src/infrastructure/queue/bull.adapter.ts
// import Bull, { Queue } from 'bull';
// import { config } from '@/config';

// export class BullAdapter {
//   private static queues: Map<string, Queue> = new Map();

//   static getQueue(name: string): Queue {
//     if (!this.queues.has(name)) {
//       const queue = new Bull(name, {
//         redis: config.redis,
//       });
//       this.queues.set(name, queue);
//     }
//     return this.queues.get(name)!;
//   }
// }