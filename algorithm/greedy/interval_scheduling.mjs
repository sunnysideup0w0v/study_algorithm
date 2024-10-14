/**
 * 개발자 컨퍼런스에 왔다고 가정해보자.
 * 컨퍼런스에서 가장 많은 세션을 들을 수 있는 방법은 무엇일까?
 * 
 * 바로, 각 세션의 시작 시간과 종료 시간을 알고 있다면, 종료 시간이 가장 빠른 세션을 선택하는 것이다.
 * 
 * 이것이 바로 Interval Scheduling Algorithm이다.
 * 알고리즘 구현을 위해 탐욕 알고리즘을 사용하여 최적의 해를 찾아보자.
 */

// 세션 클래스
class Session {
  constructor(name, startTime, endTime) {
    this.sessionName = name;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

// 인터벌 스케쥴러 클래스
class IntervalScheduler {
  constructor() {
    // 세션들을 저장할 배열
    this.sessions = [];
  }

  // 세션 추가
  addSession(session) {
    this.sessions.push(session);
  }

  // 인터벌 스케쥴링
  intervalScheduling() {
    // 종료 시간을 기준으로 오름차순 정렬
    this.sessions.sort((a, b) => a.endTime - b.endTime);

    // 결과 배열
    let result = [];

    // 세션들을 순회하며 최적의 해를 찾는다.
    for (let currentSession of this.sessions) {
      if (result.length == 0) {
        // 결과 배열이 비어있으면 가장 먼저 끝나는 세션을 추가한다.
        result.push(currentSession);
      } else if (currentSession.startTime >= result[result.length - 1].endTime) {
        // 결과 배열의 마지막 세션의 종료 시간보다 다음 세션의 시작 시간이 크거나 같다면
        result.push(currentSession);
      }
    }

    // 결과 출력
    console.log(result.map(session => session.sessionName).join(", "));
  }
}


let intervalScheduler = new IntervalScheduler();
let a = new Session("A", 0, 6);
let b = new Session("B", 1, 4);
let c = new Session("C", 3, 6);
let d = new Session("D", 3, 8);
let e = new Session("E", 4, 7);
let f = new Session("F", 5, 9);
let g = new Session("G", 6, 10);
let h = new Session("H", 8, 11);

intervalScheduler.addSession(a);
intervalScheduler.addSession(b);
intervalScheduler.addSession(c);
intervalScheduler.addSession(d);
intervalScheduler.addSession(e);
intervalScheduler.addSession(f);
intervalScheduler.addSession(g);
intervalScheduler.addSession(h);

intervalScheduler.intervalScheduling();