import { Queue } from './Queue.mjs';

let queue = new Queue();

console.log('>>> enqueue() 호출');

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.front());

console.log('>>> dequeue() 호출')
queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue();

console.log('queue is Empty? : ', queue.isEmpty())