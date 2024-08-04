import { BinaryTree } from '../BinaryTree/BinaryTree.mjs';

// 이진탐색트리는 이미 작성한 이진트리 구조를 기반으로 확장
class BinarySearchTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }


  // 탐색
  search(data) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (data < currentNode.getData()) {
        currentNode = currentNode.getLeftSubTree();
      } else if (data > currentNode.getData()) {
        currentNode = currentNode.getRightSubTree();
      } else {
        break;
      }
    }

    return currentNode;
  }
}


// 모든 NIL 노드의 색은 검은색이다.
class NILNode extends BinaryTree {
  constructor() {
    super(0);
    this.color = BLACK;
  }
}