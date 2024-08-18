import { BinaryTree, RED, BLACK } from './BinaryTree.mjs';

// 이진탐색트리는 이미 작성한 이진트리 구조를 기반으로 확장
class RedBlackTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }


  // 탐색
  search(targetData) {
    let currentNode = this.root;

    while (currentNode != null) {
      if (currentNode.getData() == targetData) {
        return currentNode;
      } else if (currentNode.getData() > targetData) {
        currentNode = currentNode.getLeftSubTree();
      } else {
        currentNode = currentNode.getRightSubTree();
      }
    }

    return null;
  }

  // 자식 노드 교체
  replaceParentsChild(parent, oldChild, newChild) {
    if (parent == null) {
      this.root = newChild;
    } else if (parent.getLeftSubTree() == oldChild) {
      parent.setLeftSubTree(newChild);
    } else if (parent.getRightSubTree() == oldChild) {
      parent.setRightSubTree(newChild);
    }

    if (newChild != null) {
      newChild.setParent(parent);
    }
  }


  // 부모, 자식노드가 오른쪽으로 쭉 뻗어져있는 경우 사용
  rotateLeft(node) {
    let parent = node.getParent();
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
    let parent = node.getParent();
    let leftChild = node.getLeftSubTree();

    node.setLeftSubTree(leftChild.getRightSubTree());

    if (leftChild.getRightSubTree() != null) {
      leftChild.getRightSubTree().setParent(node);
    }

    leftChild.setRightSubTree(node);
    node.setParent(leftChild);

    this.replaceParentsChild(parent, node, leftChild);
  }


  getUncle(parent) {
    let grandParent = parent.getParent();

    if (grandParent.getLeftSubTree() == parent) return grandParent.getRightSubTree();
    else if (grandParent.getRightSubTree() == parent) return grandParent.getLeftSubTree();

    return null;
  }

  isBlack(node) {
    return node === null || node.color === BLACK;
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
  rebalanceAfterInsertion(node) {
    // #1 새로 삽입된 노드가 루트 노드인 경우    
    if (node == this.root) {
      node.color = BLACK;
      return;
    }

    // #2~#4 조건 모두 부모 노드가 붉은색인 경우이므로 부모 노드가 검은색인 경우는 함수를 종료한다.
    if (node.getParent().color === BLACK) return;

    let parent = node.getParent();
    let grandParent = parent.getParent();
    let uncle = this.getUncle(parent);

    // #2 부모 노드와 삼촌 노드가 빨간색인 경우
    if (uncle !== null && uncle.color === RED) {
      parent.color = BLACK;
      uncle.color = BLACK;
      grandParent.color = RED;

      this.rebalanceAfterInsertion(grandParent);
    } else if (this.isBlack(uncle)) {
      if (grandParent.getRightSubTree() == parent && parent.getLeftSubTree() == node) {
        // #3. 부모 노드는 빨간색이고 삼촌 노드는 검은색, 새로운 노드는 안쪽 손자인 경우 1
        this.rotateRight(parent);
        this.rotateLeft(grandParent);
        node.color = BLACK;
      } else if (grandParent.getLeftSubTree() == parent && parent.getRightSubTree() == node) {
        // #3. 부모 노드는 빨간색이고 삼촌 노드는 검은색, 새로운 노드는 안쪽 손자인 경우 2
        this.rotateLeft(parent);
        this.rotateRight(grandParent);
        node.color = BLACK;
      } else if (grandParent.getRightSubTree() == parent && parent.getRightSubTree() == node) {
        // #4. 부모 노드는 빨간색이고 삼촌 노드는 검은색, 새로운 노드는 바깥쪽 손자인 경우 1
        this.rotateLeft(grandParent);
        parent.color = BLACK;
        grandParent.color = RED;
      } else if (grandParent.getLeftSubTree() == parent && parent.getLeftSubTree() == node) {
        this.rotateRight(grandParent);
        parent.color = BLACK;
        grandParent.color = RED;
      }
    }
  }

  // 삽입
  insert(data) {
    let current = this.root;
    let parent = null;

    while (current != null) {
      parent = current;
      if (data < current.getData()) {
        current = current.getLeftSubTree();
      } else if (data > current.getData()) {
        current = current.getRightSubTree();
      } else {
        return;
      }
    }

    let newNode = new BinaryTree(data);
    if (parent == null) {
      this.root = newNode;
    } else if (data < parent.getData()) {
      parent.setLeftSubTree(newNode);
    } else {
      parent.setRightSubTree(newNode);
    }

    newNode.setParent(parent);
    this.rebalanceAfterInsertion(newNode);
  }

}


// 모든 NIL 노드의 색은 검은색이다.
class NILNode extends BinaryTree {
  constructor() {
    super(0);
    this.color = BLACK;
  }
}

let rbTree = new RedBlackTree();

rbTree.insert(17);
rbTree.insert(9);
rbTree.insert(19);
rbTree.insert(75);
rbTree.insert(85);

console.log('root >>> ', rbTree.root);

if (rbTree.root) rbTree.root.inOrderTraversal(rbTree.root)