---
layout : single
title : "[개인] Arraylist.add & 재귀호출에 관하여 (얕은복사 / 깊은복사)"

categories : 개인탐구

tags : 
        - Java

toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"
---

## 이 글에 담긴 것
- 재귀호출의 흐름 파악
- 반복문에서의 Arraylist.add
- 얕은복사와 깊은복사

## 공부하던 부분
- 가위바위보 경우의 수를 도출하는 중복 순열 문제를 풀고 있었다.

## 의문점
1. 왜 원하는 값들이 배열에 담기는데 add를 호출하는 순간 값이 덮어지는가??
    - 왜 값들이 다 같은 값만 나오는가??

## 코드
실수하면서 시간을 투자했던 코드와 성공한 코드를 동시에 기록하였다. 먼저 분석에 들어가기 전에 스스로 코드를 보고 다시 복기해보자.

### 1. 실수한 코드
```java
if(index == rounds){                          // 재귀함수의 탈출부분(베이스)
            
    result.add(currentCase);                    //****핵심부분****
                                                // 의도 - 완성배열을 넣어주고
    return result;                              // 리스트를 반환한다.
}

for(int i = 0 ; i < rps.length ; i++){     // 경우의 수 배열의 생성

    currentCase[index] = rps[i];            //현재 인덱스(0)에 값을 넣어주고
    caseList(result, currentCase, rounds, index+1); // 다음 인덱스를 가리키면서 재귀호출을 하겠다.

}
```

### 2. 성공 코드
```java

if(index == rounds){                          // 재귀함수의 탈출부분(베이스)
    
    String[] input = new String[rounds];      //****이번 글의 핵심부분****//
    for(int i = 0 ; i < currentCase.length ; i++){
        input[i] = currentCase[i];
    }
    result.add(input);

    return result;                           // 리스트를 반환해주고
}

for(int i = 0 ; i < rps.length ; i++){

    currentCase[index] = rps[i];            //현재 인덱스(0)에 값을 넣어주고
    caseList(result, currentCase, rounds, index+1); // 다음 인덱스를 가리키면서 재귀호출을 하겠다.

}

    

```

정말 이해하고나니 쉬운 부분인데 늪에 빠졌을때는 도대체 뭐가 문제인가 싶었다. 일단 코드가 길기에 다시 돌아와서 볼 경우를 위하여 성공코드에 주석을 달아놓았다.

가장 문제가 되었던 부분은 ***'얕은복사'와 '깊은복사'의 개념***을 정확히 파악하지 못했던 것이다. 파악이라 한다면 이해를 못했다라기보다는 사용시에 미숙했다는 것이 맞겠다.


<br>


## 문제점 분석
    깊은 복사는 값을 복사한다.

    얕은 복사는 주소를 복사한다.

간만에 돌아와서 이게 무슨말인지 모르겠다면 깊게 생각해보고 들어가자


<br>


## 진행상황

문제가 되었던 부분은 이곳이다.

```java

if(index == rounds){                          // 재귀함수의 탈출부분(베이스)
            
    result.add(currentCase);   //****핵심부분****

    return result;                           // 리스트를 반환해주고
}

for(int i = 0 ; i < rps.length ; i++){

    currentCase[index] = rps[i];            //현재 인덱스(0)에 값을 넣어주고
    caseList(result, currentCase, rounds, index+1); // 다음 인덱스를 가리키면서 재귀호출을 하겠다.

}

```

분명 for문에서 경우의 수를 담는 currentCase 배열에 알맞은 값을 넣었다. 

확인한 바로도 한 반복마다 확인할 때는

    첫번째
    rock rock rock rock rock

    두번째
    rock rock rock rock paper

이런 식으로 잘 담겼다.

그런데.. 결과값은 항상 마지막 값만 주구장창 복사되었다.   
**이전에 넣은 값들도 마지막 값만 나온 것이다.**


    위의 예시에선
    rock rock rock rock paper
    rock rock rock rock paper 

    마지막 까지 돌리면  
    scissors scissors scissors scissors scissors
    scissors scissors scissors scissors scissors
    scissors scissors scissors scissors scissors
    .
    .
    .
    scissors scissors scissors scissors scissors
    scissors scissors scissors scissors scissors 


<br>


## 원인
    하나의 배열 currentCase에만 주구장창 값을 넣었기 때문이다. 즉 얕은복사를 했기 때문이다.

result 리스트에 값이 달라진 currentCase 배열을 계속 넣어주더라도??

***얕은 복사를 했기 때문에 결국 리스트 요소들이 참조하는 주소는 같다.***

    currentCase 참조 / currentCase 참조 / currentCase 참조 / currentCase 참조 ...

따라서 마지막에 값을 바꿔서 넣어주면 모든 currentCase 값들이 바뀔 것이다.

## 해결
    경우의 수마다 객체를 따로 생성해준다.

아래의 수정한 코드를 보자.

```java

if(index == rounds){                          // 재귀함수의 탈출부분(베이스)
    
    String[] input = new String[rounds];      //****이번 글의 핵심부분****//
    for(int i = 0 ; i < currentCase.length ; i++){
        input[i] = currentCase[i];
    }
    result.add(input);

    return result;                           // 리스트를 반환해주고
}

```

따라서 위와 같이 재귀의 베이스에 도착할때마다 그때의 값을 새로운 배열객체에 넣어준다. 그렇게되면

    input1 참조, input2 참조, input3 참조, input4 참조 ....

    (input옆 숫자는 주소가 다르다는 것을 표현하기 위함임)

이렇게 될 것이다. 따라서 값들을 의도한대로 넣을 수 있다.

-끝- 후련.



