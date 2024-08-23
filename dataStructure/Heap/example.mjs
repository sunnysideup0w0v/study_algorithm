import { Heap } from './Heap.mjs';

class PersonalizedPriorityHeap extends Heap {
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

// let personalizedHeap = new PersonalizedPriorityHeap();

// personalizedHeap.insert(new Person('A', 26));
// personalizedHeap.insert(new Person('B', 20));
// personalizedHeap.insert(new Person('C', 16));
// personalizedHeap.insert(new Person('D', 40));

// console.log(personalizedHeap.root);

export { PersonalizedPriorityHeap }