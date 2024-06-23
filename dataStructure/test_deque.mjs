import { Deque } from './Deque.mjs';

let dequeue = new Deque();

console.log('>>> addFirst() 실행')
console.log('isEmpty ? : ', dequeue.isEmpty())
dequeue.addFirst(1)
dequeue.addFirst(2)
dequeue.addFirst(3)
dequeue.addFirst(4)
dequeue.addFirst(5)
dequeue.printAll();

console.log('>>> removeLast() 실행');
dequeue.removeLast();
dequeue.printAll();

console.log('>>> removeFirst() 실행');
dequeue.removeFirst();
dequeue.printAll();

console.log('>>> addLast() 실행');
dequeue.addLast(10);
dequeue.printAll();

console.log('isEmpty? : ', dequeue.isEmpty())
