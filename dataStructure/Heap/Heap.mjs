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
    }
  }

  getInsertingParentNode() {
    // 구현 예정
  }

  getBigPriority() {
    // 구현 예정
  }
}