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
      if (this.isBigPriority(newNode.getData(), newNode.getParent().getData())) {
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

  isBigPriority(first, second) {
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

  remove() {
    // 우선순위 Heap에서 제거는 우선순위가 가장 높은 데이터(=루트 노드)를 제거하는 것을 의미한다.
    let deletedNode = null;

    // 삽입된 노드가 한 개(=루트 노드)인 경우
    if (this.lastInsertedNode == this.root) {
      deletedNode = this.root;
      this.root = null;
      this.lastInsertedNode = null;
      return deletedNode;
    }

    // 1. 루트 노드와 가장 마지막에 삽입된 노드의 데이터를 스왑한다
    let prevLastInsertedNode = this.getNewLastInsertedNode();
    let tempData = this.root.getData();
    this.root.setData(this.lastInsertedNode.getData());
    this.lastInsertedNode.setData(tempData);

    // 2. 마지막으로 삽입된 노드의 부모노드에서 해당 자식 노드를 초기화한다..
    if (this.lastInsertedNode.getParent().getLeftSubTree() == this.lastInsertedNode) {
      this.lastInsertedNode.getParent().setLeftSubTree(null);
    } else {
      this.lastInsertedNode.getParent().setRightSubTree(null);
    }

    // 3. 마지막으로 삽입된 노드의 부모 노드를 초기화한다.
    this.lastInsertedNode.setParent(null);
    deletedNode = this.lastInsertedNode;

    // 4. 마지막으로 삽입된 노드 프로퍼티에 새로운 마지막 노드를 할당한다.
    this.lastInsertedNode = prevLastInsertedNode;

    // 5. 루트 노드와 자식 노드의 우선순위를 비교하여 알맞은 위치로 이동
    let current = this.root;

    // 일단 한 번 실행해야 하기 때문에 do-while문을 사용
    do {
      let higherChild = this.getHigherPriorityChild(current.getLeftSubTree(), current.getRightSubTree());

      if (higherChild === null) {
        // 자식 노드가 없는 경우이므로 while문을 탈출
        break;
      } else if (!this.isBigPriority(current.getData(), higherChild.getData())) {
        let tempData = current.getData();
        current.setData(higherChild.getData());
        higherChild.setData(tempData);
        current = higherChild;
      } else {
        break;
      }

    } while (current.getLeftSubTree() !== null || current.getRightSubTree() !== null);
    // 자식 노드가 없을때까지 반복

    return deletedNode;
  }

  getHigherPriorityChild(left, right) {
    if (left == null) return right;
    if (right == null) return left;
    if (this.isBigPriority(left.getData(), right.getData())) {
      return left;
    }

    return right;
  }

  // 마지막으로 삽입된 노드의 이전 노드를 반환하는 함수로
  // 총 3가지 경우에 대한 구현을 진행해야 한다.
  getNewLastInsertedNode() {
    let prevLastInsertedNode = null;

    if (this.lastInsertedNode === this.lastInsertedNode.getParent().getLeftSubTree()) {
      // #1. 마지막에 삽입된 노드가 부모 노드의 왼쪽 자식 노드인 경우
      let current = this.lastInsertedNode;
      let firstLeftSibling = null;

      while (current.getParent().getParent() !== null) {
        current = current.getParent();

        firstLeftSibling = this.getLeftSibling(current);
        if (firstLeftSibling !== null) break;
      }

      if (firstLeftSibling !== null) {
        // #1-a. 부모 노드 중에 왼쪽 형제 노드가 존재하는 경우
        // 마지막으로 삽입된 노드의 첫 번째 왼쪽 형제 노드에서 가장 오른쪽 끝에 있는 자식 노드를 반환한다.
        while (firstLeftSibling.getRightSubTree() !== null) {
          firstLeftSibling = firstLeftSibling.getRightSubTree();
        }

        prevLastInsertedNode = firstLeftSibling;
      } else {
        // #1-b. 부모 노드 중에 왼쪽 형제 노드가 존재하지 않는 경우
        // 루트 노드에서 가장 오른쪽 자식 노드를 반환한다.
        current = this.root;

        while (current.getRightSubTree() !== null) {
          current = current.getRightSubTree();
        }

        prevLastInsertedNode = current;
      }
    } else {
      // #2. 마지막에 삽입된 노드가 부모 노드의 오른쪽 자식 노드인 경우
      prevLastInsertedNode = this.lastInsertedNode.getParent().getLeftSubTree();
    }

    return prevLastInsertedNode;
  }
}

export { Heap };

// const heap = new Heap();

// heap.insert(4)
// heap.insert(2)
// heap.insert(5)
// heap.insert(7)
// heap.insert(1)

// heap.root.inOrderTraversal(heap.root);
// console.log(heap.root);

// console.log("===== remove =====")
// console.log(heap.remove());
// console.log(heap.remove());
// console.log(heap.remove());
// console.log(heap.remove());
// console.log(heap.remove());