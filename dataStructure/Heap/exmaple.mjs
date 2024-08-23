import { Heap } from './Heap.mjs';

class ExampleHeap extends Heap {
  constructor() {
    super();
  }

  isBigPriority(first, second) {
    return first.priority < second.priority;
  }
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.priority = age;
  }
}

let heap = new ExampleHeap();

heap.insert(new Person('A', 26));
heap.insert(new Person('B', 20));
heap.insert(new Person('C', 16));
heap.insert(new Person('D', 40));

console.log(heap.root);