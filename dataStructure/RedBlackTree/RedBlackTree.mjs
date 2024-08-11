import { BinaryTree, RED, BLACK } from './BinaryTree.mjs';

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

  // 자식 노드 교체
  replaceParentsChild(parent, oldChild, newChild) {
    if (parent === null) {
      // node가 rootNode일 경우
      this.root = newChild;
    } else if (parent.getLeftSubTree() === oldChild) {
      parent.setLeftSubTree(newChild);
    } else if (parent.getRightSubTree() === oldChild) {
      parent.setRightSubTree(newChild);
    }

    if (newChild !== null) newChild.setParent(parent)
  }

  // 부모, 자식노드가 오른쪽으로 쭉 뻗어져있는 경우 사용
  rotateLeft(node) {
    let parent = node.getParentTree();
    let rightChild = node.getRightSubTree();

    node.setRightSubTree(rightChild.getLeftSubTree());

    if (rightChild.getLeftSubTree() != null) {
      rightChild.getLeftSubTree().setParent(node);
    }

    rightChild.setLeftSubTree(node);
    node.setParent(rightChild);

    this.replaceParentsChild(parent, node, rightChild);
  }

  // 부모, 자식노드가 왼쪽으로 쭉 뻗어져있는 경우 사용
  rotateRight(node) {
    let parent = node.getParentTree();
    let leftChild = node.getLeftSubTree();

    node.setRightSubTree(leftChild.getRightSubTree());

    if (leftChild.getRightSubTree() != null) {
      leftChild.getRightSubTree().setParent(node);
    }

    leftChild.setRightSubTree(node);
    node.setParent(leftChild);

    this.replaceParentsChild(parent, node, leftChild);
  }
}


// 모든 NIL 노드의 색은 검은색이다.
class NILNode extends BinaryTree {
  constructor() {
    super(0);
    this.color = BLACK;
  }
}