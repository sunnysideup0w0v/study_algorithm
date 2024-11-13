/**
 * Link: https://school.programmers.co.kr/learn/courses/30/lessons/12951
 *
 * 알파벳 + 숫자
 * 숫자만 이루어져있지는 않음
 * 공백 여러개일 수 있음
 *
 * LinkedList??
 * 이전 문자가 공백이면 대문자로 변환
 */

class WordNode {
  data: string;
  next: WordNode | null;
  prev: WordNode | null;

  constructor(data: string) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  head: WordNode | null;
  tail: WordNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(data: string) {
    const newNode = new WordNode(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let current = this.tail;
      current.next = newNode;
      newNode.prev = current;

      this.tail = newNode;
    }
  }

  print() {
    let current = this.head;
    const words = [];

    while (current) {
      const { data, prev } = current;

      if (!current.prev) {
        words.push(isNaN(Number(data)) ? data.toUpperCase() : data);
      } else if (prev.data === ' ' && isNaN(Number(data))) {
        words.push(data.toUpperCase());
      } else {
        words.push(isNaN(Number(data)) ? data.toLowerCase() : data);
      }

      current = current.next;
    }

    return words.join('');
  }
}

const solution_12951 = (s: string) => {
  const linkedList = new LinkedList();
  for (let i = 0; i < s.length; i++) {
    linkedList.add(s[i]);
  }

  return linkedList.print();
};

console.log(
  solution_12951('3people unFollowed me') === '3people Unfollowed Me'
);
console.log(solution_12951('for the last week') === 'For The Last Week');
