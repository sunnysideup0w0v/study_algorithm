import { BinaryTree, RED, BLACK } from './BinaryTree.mjs';

// 이진탐색트리는 이미 작성한 이진트리 구조를 기반으로 확장
class RedBlackTree {
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

  getUncle(parent) {
    let grandParent = parent.getParentTree();

    if (grandParent.getLeftSubTree() == parent) return grandParent.getRightSubTree();
    else if (grandParent.getRightSubTree() == parent) return grandParent.getLeftSubTree();

    return null;
  }

  /**
   * 
   * @param {BinaryTree} node 
   * @returns 
   * 
   * 삽입 후 균형을 맞추기 위한 함수로 아래 조건들을 해결해야 한다.
   * 
   * #1. 새로 삽입된 노드가 루트 노드인 경우
   * #2. 부모 노드와 삼촌 노드가 빨간색인 경우
   * #3. 부모 노드는 빨간색이고 삼촌 노드는 검은색, 새로운 노드는 안쪽 손자인 경우
   * #4. 부모 노드는 빨간색이고 삼촌 노드는 검은색, 새로운 노드는 바깥쪽 손자인 경우
   */
  rebalanceAfterInsert(node) {
    // #1 새로 삽입된 노드가 루트 노드인 경우    
    if (node == this.root) {
      node.color = BLACK;
      return;
    }

    // #2~#4 조건 모두 부모 노드가 붉은색인 경우이므로 부모 노드가 검은색인 경우는 함수를 종료한다.
    if (node.getParentTree().color === BLACK) return;

    let parent = node.getParentTree();
    let grandParent = parent.getParentTree();
    let uncle = this.getUncle(parent);

    // #2 부모 노드와 삼촌 노드가 빨간색인 경우
    if (uncle.color === RED) { }
  }

  // 삽입
  insert(data) {
    let current = this.root;
    let parent = null;

    while (current !== null) {
      parent = current;

      if (data < current.getData()) {
        current = current.getLeftSubTree();
      }
      else if (data > current.getData()) {
        current = current.getRightSubTree();
      }
      else {
        // 동일한 값이 있을 경우 데이터를 삽입하지 않는다.
        return;
      }
    }

    const newNode = new BinaryTree(data);

    if (parent == null) this.root = newNode;
    else if (parent < data) parent.setRightSubTree(newNode);
    else parent.setLeftSubTree(newNode);

    newNode.setParent(parent);

    this.rebalanceAfterInsert(newNode);
  }
}


// 모든 NIL 노드의 색은 검은색이다.
class NILNode extends BinaryTree {
  constructor() {
    super(0);
    this.color = BLACK;
  }
}