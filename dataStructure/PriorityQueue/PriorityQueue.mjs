import { Heap } from '../Heap/Heap.mjs';

class MonsterHeap extends Heap {
  constructor() {
    super();
  }

  // 최대힙
  isBigPriority(first, second) {
    return first.priority > second.priority;
  }
}

class PriorityQueue {
  constructor() {
    this.heap = new MonsterHeap();
  }

  enqueue(data) {
    this.heap.insert(data);
  }

  dequeue() {
    return this.heap.remove();
  }
}

class Monster {
  constructor(name, health) {
    this.name = name;
    this.health = health;
    this.priority = health;
  }
}

const priorityQueue = new PriorityQueue();

priorityQueue.enqueue(new Monster('슬라임', 100));
priorityQueue.enqueue(new Monster('슬라임', 50));
priorityQueue.enqueue(new Monster('슬라임', 200));
priorityQueue.enqueue(new Monster('파란달팽이', 120));
priorityQueue.enqueue(new Monster('주황버섯', 10));

console.log(priorityQueue.dequeue());
