import { PersonalizedPriorityHeap } from '../../dataStructure/Heap/example.mjs';

class UserData {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.priority = age;
  }
}

// 최소힙
const heap = new PersonalizedPriorityHeap();

heap.insert(new UserData('홍길동', 30));
heap.insert(new UserData('김철수', 20));
heap.insert(new UserData('이영희', 40));
heap.insert(new UserData('박영수', 10));
heap.insert(new UserData('최영자', 50));

const sorted = [];

// sorted.push(heap.remove());
// sorted.push(heap.remove());
// sorted.push(heap.remove());
// sorted.push(heap.remove());
// sorted.push(heap.remove());

// console.log(sorted)


while (heap.root !== null) {
  console.log(heap.remove());
}

/**
 * 힙 정렬의 시간 복잡도는 O(nlogn)으로 퀵 정렬과 유사하지만
 * 피봇이라는 변수가 없으므로 안정적인 O(nlogn)의 성능을 보장한다.
 */