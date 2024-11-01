# 외판원 문제

## 비트 마스킹

### 비트란?

비트란 컴퓨터가 다루는 가장 최소 단위의 데이터를 의미하고, 하나의 비트는 0이나 1의 값을 가질 수 있다. 프로그래머가 작성한 프로그램과 모든 데이터는 최종적으로 0과 1로 바뀌게 되고, 컴퓨터는 해당 비트들을 해석하며 계산을 진행합니다.

### 비트 연산(논리 연산)

**AND 연산 (A & B)**
A와 B가 모두 1일 때 1을 나타냄.

```
A | B | A & B
0 | 0 |   0
0 | 1 |   0
1 | 0 |   0
1 | 1 |   1
```

**OR 연산 (A | B)**
A 또는 B가 1일 때 1을 나타냄.

```
A | B | A | B
0 | 0 | 0
0 | 1 | 1
1 | 0 | 1
1 | 1 | 1
```

**XOR 연산 (A ^ B)**
두 입력이 다른 경우(입력에서 1의 갯수가 홀수인 경우) 1을 나타낸다.

```
A | B | A ^ B
0 | 0 | 0
0 | 1 | 1
1 | 0 | 1
1 | 1 | 0
```

### 비트 연산(시프트 연산)

**<<**
레스댄 사인 두 개(<<)로 왼쪽 시프트 연산을 할 수 있습니다. `0110 << 1`과 같이 표현할 경우 모든 비트가 왼쪽으로 한 칸 이동되고, 자릿수를 넘어가면 버려지며 오른쪽은 0으로 채워집니다.
`0110<<1`의 값은 `1100`이 되며, 왼쪽으로 한 칸 이동할 때마다 10진수로 2배 곱한 효과가 나타납니다.

**>>**
그레이터댄 사인 두 개(>>)로 오른쪽 시프트 연산을 할 수 있습니다.`0110 >> 1`과 같이 표현할 경우 모든 비트가 오른쪽으로 한 칸 이동되고, 한 칸 이동될 때마다 10진수로 2를 나눈 효과가 나타납니다.

### 비트 마스크

비트 마스크란 비트 연산을 이용해서 본인이 원하는 비트를 컨트롤 할 수 있는 방법입니다.
비트 마스크를 이용하면 더 빠른 수행시간, 더 간결한 코드, 더 적은 메모리 사용이라는 효과를 얻을 수 있습니다.

## 외판원 문제 설명 및 풀이

### 설명

외판원 외판원이 각각 연결되어있는 도시들을 전부 방문하려고 합니다. 연결된 경로엔 각 도시로 이동하는 이동 비용이 적혀 있습니다.
외판원이 있는 도시 A에서 모든 도시를 한 번씩만 방문하고 다시 출발 도시(A)로 돌아오는 최소 비용의 경로를 구하는 문제입니다.

지금까지 누구도 다항 시간 내 답을 구할 수도, 답을 확인할 방법을 구하지 못한 NP-hard에 속하는 문제입니다.
최소 비용의 경로를 구하려면 모든 경로를 전부 구해서, 그 중에 최소 비용인 것을 선택해야 합니다.
연결되어있는 도시의 갯수가 n이라고 할 때, 도시를 방문하며 만들 수 있는 경로는 `n!`개 입니다.
경우의 수가 팩토리얼로 늘어나기 때문에 모든 경우의 수를 찾는 방식을 시도한다면 다항 시간 내에 해결하기 어렵습니다.
팩토리얼을 빅오로 정의하면 `O(n^n)`의 지수 시간을 가집니다.

따라서, 동적 프로그래밍(DP)를 사용하여 이보다 조금 '개선된 지수 시간'에 해결하는 것을 지향합니다. (단, 실제 알고리즘으로 사용하기 어려운 부분이 있음. 하지만 이보다 더 성능이 좋은 알고리즘을 확인하지 못했기 떄문에 사용.)

### 풀이

각 도시의 연결을 그래프가 아닌, 이중 배열을 통해 나타냅니다.

```
   1  2  3  4
1  0  4  1  3
2  4  0  2  1
3  1  2  0  5
4  3  1  5  0
```

문제 풀이를 위해 식을 하나 작성해보겠습니다.

```
T(1, {2, 3, 4})
```

위 식은 출발 도시(예: 1)에서 방문하지 않은 도시(예: 2, 3, 4)를 방문하는 최소 비용을 의미합니다.
이 식은 다음과 같이 재귀적으로 표현할 수 있습니다.

```
T(1, {2, 3, 4})
     (1, 2) + T(2, {3, 4}) // 1에서 2로 가는 비용 + 출발 도시2에서 3, 4를 방문하는 최소 비용
     (1, 3) + T(3, {2, 4}) // ...
     (1, 4) + T(4, {2, 3}) // ...
```

그리고 이 재귀적으로 표현된 식들은 다시 재귀적으로 표현할 수 있습니다.
문제를 쪼갤 수 없을 만큼 쪼갠 후, 최종적으로 최소 비용을 여행할 수 있는 경로를 찾아내는 방식으로 문제를 해결합니다.

이 과정에서 메모이제이션을 사용하여 시간 복잡도를 `O(n^2 * 2^n)`으로 개선할 수 있습니다.
