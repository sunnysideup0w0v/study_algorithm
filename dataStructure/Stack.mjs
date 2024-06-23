/**
 * 스택의 특징
 * FILO -> First In Last Out
 */

import { LinkedList } from './LinkedList.mjs'

class Stack {
  constructor() {
    this.list = new LinkedList();
  }

  push(data) {
    return this.list.insertAt(0, data);
  }

  pop() {
    try {
      return this.list.deleteAt(0)
    } catch {
      return null;
    }
  }

  peek() {
    return this.list.getNodeAt(0)
  }

  isEmpty() {
    return this.list.count === 0
  }
}

export { Stack }