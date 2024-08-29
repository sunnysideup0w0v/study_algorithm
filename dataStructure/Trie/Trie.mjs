import { PersonalizedPriorityHeap } from '../Heap/example.mjs';

class TrieNode {
  constructor() {
    this.children = {};
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode(); // 루트 노드에 빈 해시테이블을 생성하며 시작
  }

  /**
   * 
   * @param {string} word 삽입하고자 하는 단어
   * @returns {void}
   */
  insert(word) {
    let currentNode = this.root;

    for (let char of word) { // 문자열의 각 문자를 순회
      if (currentNode.children[char]) { // currentNode.children에 key값이 char인 데이터가 존재하는 경우
        currentNode = currentNode.children[char]; // 존재하면 해당 노드로 이동
      } else { // currentNode의 children에 char가 존재하지 않는 경우, 새롭게 key-value를 생성한다.
        let newNode = new TrieNode();
        currentNode.children[char] = newNode;
        currentNode = newNode;
      }
    }

    currentNode.children['*'] = 0; // 문자열의 끝에 도착하면 key: '*', value: 0인 데이터를 생성하고 함수를 종료한다.
  }

  /**
   * 
   * @param {string} word 조회하고자 하는 단어
   * @returns {TrieNode} 조회하고자 하는 단어가 존재할 경우 해당 단어의 끝에 도달한 노드를 반환, 존재하지 않을 경우 null을 반환
   */
  search(word) {
    let currentNode = this.root;

    for (let char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else { // 조회하고자 하는 단어가 존재하지 않음 
        return null;
      }
    }

    // 애스터리스크의 value를 검색 빈도수로 설정하고, 애스터리스크 노드의 검색 빈도수를 증가시킨다.
    currentNode.children['*']++;
    return currentNode;
  }

  /**
   * 
   * @param {TrieNode} startNode 순회를 시작하는 노드
   * @param {string} word 현재 노드까지 탐색한 문자열
   * @param {Word[]} words 모든 단어를 저장하는 배열
   * @returns {Word[]} 모든 단어를 저장한 배열
   */
  getAllWords(startNode = null, word = "", words = []) {
    let currentNode = startNode ?? this.root; // startNode가 존재할 경우 startNode를 시작점으로, 그렇지 않을 경우 rootNode을 시작점으로 하여 순회를 시작한다.

    for (let key in currentNode.children) {
      let childNode = currentNode.children[key];

      if (key === '*') { // 문자열의 끝에 도달했다면
        words.push(new Word(word, childNode)); // 애스터리스크 키 값의 value = number (검색빈도수)
      } else {
        this.getAllWords(childNode, `${word}${key}`, words);
      }
    }

    return words;
  }

  /**
   * 
   * @param {string} word 입력된 단어
   * @returns {Word[]} 자동완성된 단어 배열
   */
  autoComplete(word) {
    let currentNode = this.search(word);

    if (!currentNode) return []; // 자동완성될 단어가 없음.
    return this.getAllWords(currentNode, word); // 자동완성된 단어 배열을 반환
  }

  /**
   * 검색 빈도수에 따라 나열된 자동완성 단어 배열을 반환
   * @param {string} word 
   * @returns {Word[]} 검색 빈도수에 따라 나열된 자동완성 단어 배열
   */
  autoCompleteByCount(word) {
    let words = this.autoComplete(word);
    let heap = new PersonalizedPriorityHeap();
    heap.isBigPriority = (first, second) => first.priority > second.priority;

    for (let word of words) {
      heap.insert(word);
    }

    const sortedByPriority = [];

    do {
      let removed = heap.remove();

      if (removed !== null) {
        sortedByPriority.push(removed);
      } else {
        break;
      }
    } while (true)

    return sortedByPriority;
  }
}

class Word {
  constructor(word, count) {
    this.word = word;
    this.count = count;
    this.priority = count;
  }
}

const trie = new Trie();

trie.insert('고등어');
trie.insert('김치');
trie.insert('김치찜');
trie.insert('김치찌개');

console.log("===== 존재하지 않는 단어(사과) 조회 =====");
console.log(trie.search('사과'));

console.log("===== 존재하는 단어(고등어) 조회 =====");
console.log(trie.search('고등어'));
console.log(trie.search('고등어'));
console.log(trie.search('김치'));
console.log(trie.search('김치'));
console.log(trie.search('김치'));
console.log(trie.search('김치'));
console.log(trie.search('김치찜'));
console.log(trie.search('김치찜'));
console.log(trie.search('김치찌개'));
console.log(trie.search('김치찌개'));
console.log(trie.search('김치찌개'));

console.log("===== 모든 단어 조회 =====");
console.log(trie.getAllWords());

console.log("===== 자동완성 =====");
console.log(trie.autoComplete('김치'));

console.log("===== 검색 빈도수에 따라 자동완성 =====");
console.log(trie.autoCompleteByCount('김치'));
