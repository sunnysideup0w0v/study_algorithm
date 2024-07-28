// 문제: https://school.programmers.co.kr/learn/courses/30/lessons/176963

// 접근
/**
 * name 과 yearning이 서로 1:1로 상응한다는 부분을 힌트로 삼았고, 해시테이블을 떠올릴 수 있었다.
 * 이름을 키로 가지고, 그리움 점수를 값으로 가지는 해시테이블(객체)를 생성하고, 그 객체를 통해 각 점수를 얻어올 수 있도록 로직을 구성했다.
 */

const solve = (name: string[], yearning: number[], photo: Array<string[]>) => {
  let hash = {};

  for (let i = 0; i < name.length; i++) {
    const person = name[i];

    hash[person] = yearning[i];
  }

  return photo.reduce((acc, key) => {
    const score = key.reduce((acc, key) => acc + (hash[key] || 0), 0);

    return [...acc, score];
  }, []);
};

/**
 * 해시 맵 생성 단계:

여전히 name 배열의 길이 n에 대해 한 번 순회합니다.
시간 복잡도는 **O(n)**입니다.
사진 배열 순회 및 스코어 계산 단계:

외부 루프는 photo 배열의 길이 m에 대해 한 번 순회합니다.
내부 루프는 각 사진 배열의 길이 k에 대해 한 번 순회합니다.
해시 맵 조회는 여전히 상수 시간입니다.
시간 복잡도는 **O(m * k)**입니다.
최종 시간 복잡도는 **O(n + m * k)**로, 이전 코드와 동일합니다. 그러나, 이 개선된 코드는 메모리 사용과 내부 작업이 약간 더 효율적이며 가독성이 더 좋습니다.
 */
const improvedByGPT = (
  name: string[],
  yearning: number[],
  photo: Array<string[]>
) => {
  let hash = {};

  for (let i = 0; i < name.length; i++) {
    hash[name[i]] = yearning[i];
  }

  let result = new Array(photo.length).fill(0);

  for (let i = 0; i < photo.length; i++) {
    for (let j = 0; j < photo[i].length; j++) {
      result[i] += hash[photo[i][j]] || 0;
    }
  }

  return result;
};
