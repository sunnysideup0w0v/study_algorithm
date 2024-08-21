import { BinaryTree } from './BinaryTree.mjs';

class Heap {
  constructor() {
    this.root = null;
    this.lastInsertedNode = null;
  }

  insert(data) {
    let newNode = new BinaryTree(data);

    if (this.root === null && this.lastInsertedNode === null) {
      this.root = newNode;
      this.lastInsertedNode = newNode;

      return;
    }

    let insertingParent = this.getInsertingParentNode();

    if (insertingParent.getLeftSubTree() === null) {
      insertingParent.setLeftSubTree(newNode);
    } else if (insertingParent.getRightSubTree() === null) {
      insertingParent.setRightSubTree(newNode);
    } else {
      throw new Error('부모 노드에 자식 노드를 삽입할 수 없습니다.');
    }

    newNode.parentTree = insertingParent;
    this.lastInsertedNode = newNode;

    // 삽입된 노드와 부모 노드의 우선순위를 비교하여 알맞은 위치로 이동
    while (newNode.getParent() !== null) {
      // 구현 예정
      if (this.getBigPriority(newNode.getData(), newNode.getParent().getData())) {
        let tempData = newNode.getParent().getData();
        newNode.getParent().setData(newNode.getData());
        newNode.setData(tempData);
        newNode = newNode.getParent();
      } else {
        break;
      }
    }
  }

  getInsertingParentNode() {
    // #1. lastInsertedNode가 rootNode인 경우
    if (this.lastInsertedNode.getParent() === null) {
      return this.lastInsertedNode;
    }

    // #2. lastInsertedNode가 부모 노드의 왼쪽 자식 노드인 경우
    if (this.lastInsertedNode === this.lastInsertedNode.getParent().getLeftSubTree()) {
      return this.lastInsertedNode.getParent();
    }

    // #3. lastInsertedNode가 부모 노드의 오른쪽 자식인 경우
    let current = this.lastInsertedNode;
    let firstRightSibling = null;

    while (current.getParent().getParent() !== null) {
      current = current.getParent();

      firstRightSibling = this.getRightSibling(current);
      if (firstRightSibling !== null) break;
    }

    // #3-1. 부모 노드 중에서 오른쪽 형제 노드를 가지는 노드가 존재하는 경우
    if (firstRightSibling !== null) {
      while (firstRightSibling.getLeftSubTree() !== null) {
        firstRightSibling = firstRightSibling.getLeftSubTree();
      }

      return firstRightSibling;
    }
    // #3-2. 부모 노드 중에서 오른쪽 형제 노드를 가지는 노드가 존재하지 않는 경우
    current = this.root;
    while (current.getLeftSubTree() !== null) {
      current = current.getLeftSubTree();
    }
    return current;

  }

  getBigPriority(first, second) {
    // 현재 구현하고자 하는 Heap 자료구조는 최소 Heap으로 그에 맞춰 우선순위를 리턴
    return first < second;
  }

  getRightSibling(node) {
    if (node.getParent().getRightSubTree() !== node) {
      return node.getParent().getRightSubTree();
    }
    return null;
  }

  getLeftSibling(node) {
    if (node.getParent().getLeftSubTree() !== node) {
      return node.getParent().getLeftSubTree();
    }
    return null;
  }
}

const heap = new Heap();

heap.insert(4)
heap.insert(2)
heap.insert(5)
heap.insert(7)
heap.insert(1)

heap.root.inOrderTraversal(heap.root);
console.log(heap.root);