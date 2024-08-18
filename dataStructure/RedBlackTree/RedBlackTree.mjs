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

  remove(data) {
    let currentNode = this.root;

    while (currentNode !== null && data !== currentNode.getData()) {
      if (data > currentNode.getData()) currentNode = currentNode.getRightSubTree();
      else if (data < currentNode.getData()) currentNode = currentNode.getLeftSubTree();
    }

    if (currentNode === null) return null;

    let replaceNode = null;
    let deletedNodeColor = currentNode.color;

    if (currentNode.getLeftSubTree() == null || currentNode.getRightSubTree() == null) {
      // #1. 제거할 노드의 자식 노드가 없거나 한 개인 경우
      replaceNode = this.removeWithZeroOrOneChild(currentNode);
    } else {
      // #2. 제거할 노드의 자식 노드가 두 개인 경우
      let successor = this.getBiggestNode(currentNode.getLeftSubTree());
      currentNode.setData(successor.getData());
      replaceNode = this.removeWithZeroOrOneChild(successor);
    }

    // 제거한 노드의 색상이 RED라면 균형에 문제를 일으키지 않지만, BLACK이라면 문제를 일으킬 수 있기 때문에 rebalance 진행
    if (deletedNodeColor === BLACK) {
      this.rebalanceAfterDeletion(replaceNode);

      // 대체한 노드를 처리할 때, null 대신 NilNode를 만들어 임시로 연결해준 경우에 대해 다시 null로 바꾸어 처리
      if (replaceNode instanceof NILNode) {
        this.replaceParentsChild(replaceNode.getParent(), replaceNode, null)
      }
    }
  }

  removeWithZeroOrOneChild(node) {
    if (node.getLeftSubTree()) {
      this.replaceParentsChild(node.getParent(), node, node.getLeftSubTree());
      return node.getLeftSubTree();

    } else if (node.getRightSubTree()) {
      this.replaceParentsChild(node.getParent(), node, node.getRightSubTree());
      return node.getRightSubTree();

    } else {
      const newChild = node.color === BLACK ? new NILNode() : null;
      this.replaceParentsChild(node.getParent(), node, newChild);
      return newChild;
    }
  }

  getBiggestNode(node) {
    while (node.getRightSubTree() !== null) node = node.getRightSubTree();

    return node;
  }

  // 대체된 node를 params로 받음
  rebalanceAfterDeletion(node) {
    if (node == this.root) {
      node.color = BLACK;
      return;
    }

    // 형제노드 색상에 따라 5가지 상황으로 나눠 정리
    let sibling = this.getSibling(node);

    // #1. 형제 노드의 색상이 RED인 경우
    if (sibling.color === RED) {
      this.handleRedSibling(node, sibling);
      sibling = this.getSibling(node);
    }

    // #1 에서 handleRedSibling을 통해 처리를 해도, #2~#5까지의 규칙을 위반할 수 있으므로, 외부에 if문을 재선언 하여 #2~#5의 경우에도 rebalance를 진행할 수 있도록 해야함
    if (this.isBlack(sibling)) {
      if (this.isBlack(sibling.getLeftSubTree()) && this.isBlack(sibling.getRightSubTree())) {
        if (node.getParent().color === RED) {
          // #2. 형제 노드와 형제 노드의 두 자식 노드가 모두 검은색이고, 부모 노드가 붉은색인 경우
          sibling.color = RED;
          node.getParent().color = BLACK;
        } else {
          // #3. 형제 노드와 형제 노드의 두 자식 노드가 모두 검은색이고, 부모 노드가 검은색인 경우
          sibling.color = RED;
          // 5번 규칙 위반으로 부모 노드를 대상으로 재귀호출 진행
          this.rebalanceAfterDeletion(node.getParent());
        }
      } else {
        // #4, #5
        this.handleBlackSiblingWithAtLeastOneRedChild(node, sibling);
      }
    }
  }

  getSibling(node) {
    let parent = node.getParent();

    if (parent.getLeftSubTree() == node) return parent.getRightSubTree();
    else if (parent.getRightSubTree() == node) return parent.getLeftSubTree();
  }

  handleRedSibling(node, sibling) {
    sibling.color = BLACK;
    let parent = node.getParent();
    parent.color = RED;

    if (parent.getLeftSubTree() == node) this.rotateLeft(parent);
    else if (parent.getRightSubTree() == node) this.rotateRight(parent)
  }

  handleBlackSiblingWithAtLeastOneRedChild(node, sibling) {
    let nodeIsLeftChild = node.getParent().getLeftSubTree() == node;

    // #4. 형제 노드가 검은색이고 형제의 두 자식노드 중 하나라도 빨간색 노드가 있고 "바깥쪽 조카 노드"가 검은색인 경우
    if (nodeIsLeftChild && this.isBlack(sibling.getRightSubTree())) {
      sibling.getLeftSubTree().color = BLACK;
      sibling.color = RED;
      this.rotateRight(sibling);
      sibling = node.getParent().getRightSubTree();
    } else if (!nodeIsLeftChild && this.isBlack(sibling.getLeftSubTree())) {
      sibling.getRightSubTree().color = BLACK;
      sibling.color = RED;
      this.rotateLeft(sibling);
      sibling = node.getParent().getRightSubTree();
    }

    // #5. 형제 노드가 검은색이고 형제의 두 자식 노드 중 하나라도 빨간색 노드가 있고 "바깥쪽 조카 노드"가 빨간색인 경우
    sibling.color = node.getParent().color;
    node.getParent().color = BLACK;

    if (nodeIsLeftChild) {
      sibling.getRightSubTree().color = BLACK;
      this.rotateLeft(node.getParent());
    } else {
      sibling.getLeftSubTree().color = BLACK;
      this.rotateRight(node.getParent());
    }
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

rbTree.remove(19);
rbTree.remove(75);
rbTree.remove(85);

console.log('root >>> ', rbTree.root);

if (rbTree.root) rbTree.root.inOrderTraversal(rbTree.root)