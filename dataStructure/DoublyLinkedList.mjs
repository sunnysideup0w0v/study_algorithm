/**
 * 리스트 자료구조의 특징
 * 1. 배열 기반 리스트
 *  => JS의 배열은 동작 구조가 일반적인 언어에서의 동작 구조와는 다름 (불연속적 할당)
 *  배열에 담길 원소의 갯수만큼 연속된 메모리 공간을 받아 값을 할당. (값이 없는 위치에는 쓰레기값이 저장되어 있음)
 *  시작값(헤드)의 위치를 알고있음
 *  장점: 참조에 있어 O(1)의 성능을 가짐.
 *  단점: 할당된 배열의 크기를 넘어가는 인덱스에 값을 할당할 경우 예상하지 못한 동작이 수행될 수 있고, 값을 수정/삭제가 비효율적임.
 * 2. 연결 리스트
 *  => 비연속적인 메모리에 값을 저장하고, 각 노드가 다음 원소의 값을 가지고 있음.
 *  각 노드가 값과 다음 노드 정보를 가지고 있음
 *  장점: 배열에서 초기 크기를 알아야하는 단점이 없음 / 데이터 수정/삭제 시 노드에 연결된 데이터만 수정하기 때문에 배열 기반 리스트에 비해 효율적으로 동작
 *  단점: 배열의 값을 확인 할 때, 각 노드를 전부 거쳐야하므로 O(n)의 성능을 가지게 됨.
 */

/**
 * 추상자료형: 어떠한 데이터와 그 데이터에 대한 연산
 */

import { Node } from './Node.mjs';

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  printAll() {
    let currentNode = this.head;
    let text = '[';

    while (currentNode !== null) {
      text += currentNode.data;
      currentNode = currentNode.next;

      if (currentNode !== null) {
        text += ', ';
      }
    }

    text += ']';
    console.log(text);
  }

  clear() {
    this.head = null;
    this.count = 0
  }

  insertAt(index, data) {
    if (index > this.count || index < 0) throw new Error('노드 할당 가능 범위를 벗어났습니다.')

    const newNode = new Node(data);

    if (index === 0) {
      newNode.next = this.head;

      if (this.head !== null) {
        this.head.prev = newNode;
      }
      this.head = newNode;
    } else if (index === this.count) {
      newNode.next = null;
      newNode.prev = this.tail;
      this.tail.next = newNode;
    } else {
      let currentNode = this.head;

      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }

      currentNode.next = newNode;
      currentNode.prev = newNode;
      newNode.next = currentNode.next;
      newNode.prev = currentNode;
    }


    if (newNode.next == null) {
      this.tail = newNode;
    }
    this.count++;
  }

  insertLast(data) {
    this.insertAt(this.count, data)
  }

  deleteAt(index) {
    if (index >= this.count || index < 0) throw new Error('삭제 가능한 범위가 아닙니다.');

    let currentNode = this.head;
    let deletedNode = this.head;

    if (index === 0) {
      if (this.head.next === null) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
    } else if (index == this.count - 1) {
      deletedNode = this.tail;
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else {
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }

      deletedNode = currentNode.next
      currentNode.next = deletedNode.next;
      currentNode.next.prev = currentNode;
    }
    this.count--;
    return deletedNode;
  }

  deleteLast() {
    this.deleteAt(this.count - 1);
  }

  getNodeAt(index) {
    if (index >= this.count || index < 0) throw new Error('출력 가능한 범위를 넘어갔습니다')

    let targetNode = this.head;


    for (let i = 0; i < index - 1; i++) {
      targetNode = targetNode.next;
    }

    return targetNode;
  }
}

export { DoublyLinkedList }