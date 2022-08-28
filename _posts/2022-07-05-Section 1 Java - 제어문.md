---
layout: single
title:  "Section 1 Java - 제어문"

categories:
    - 코드스테이츠

tags:
    - Java
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---
[week3]
## 간단정리

- 제어문은 코드의 흐름을 관리하기 위한 것
- 조건문
    - if 는 조건(참 거짓)을 통해 흐름 제어
        - if(){}
        - else if{}
        - else
    - switch는 리터럴을 바탕으로 흐름 제어
        - switch()
        - case:
        - default:
        - break;
- 반복문
    - for 은 반복횟수를 특정 가능하다면
        - for(초기화 ; 범위 ; 증감)
    - while은 무한루프도 가능
        - while()
    - do-while은 일단 한번 실행 후
        - do{~~}while()
    - continue - 해당 반복만 탈출
    - break - 해당 반복문 탈출

<br>

## 느낀점

- 확실히 코드의 흐름을 생각하면서 작성하니 크게 어렵지 않았다. 일단은 조건문 if,switch와 반복문 for,while do-while에 익숙해 지자. 그 다음 코드의 효율성을 꾀하는 방법들을 알아보도록 하자.

<br>

## 스스로 답해보기 (사전질문)

- 조건문과 반복문은 왜 쓰이는가?
- If문과 switch는 왜 나뉘어져있는가?
- for와 while은 어떻게 다른가?

<br>

## 정리 

### 1.조건문
실생활에서 우리가 하는 약속을 하나 가정해보자. 음.. 누구나 다 한번쯤은 들어봤을 약속이라면

    이번에 성적을 ~~이상 달성하면 ~~사줄게

이 문장을 프로그래밍 관점에서 본다면 어떻게 코드화 할 수 있을까??

분명한건 **앞의 조건에 따라서 결과가 달라진다**는 것이다.

#### a. if문
조건문 하면 2대장이 있다. if문과 switch문이다. 그 중에 먼저 if문을 알아보자.

if문의 기본 구조는 다음과 같다.

```java
// 조건이 하나일 경우

if(조건식){
    // 조건이 참일경우
}
``` 
<br>

그러면 이번에는 앞선 문장을 구체화보고 적용해보자.

    이번에 평균 90점을 넘으면 아이패드 사줄게

는

```java
if(average > 90){
    System.out.println("아이패드사준다.") 
}

// 엄밀히 말하면 아이패드 사주는 행동도 굉장히 많이 쪼갤 수 있겠지만 단순화 했다.
``` 
<br>

하지만 인생은 녹록치 않아왔다. 조건은 반대의 경우도 상정하기 마련인다.

    90점 넘으면 아이패드 사주는데 못 넘으면 용돈 동결이야.

는

```java
if(average > 90){
    System.out.println("아이패드사준다.") 
}
else {
    System.out.println("용돈동결이야")
}
``` 

이렇게 else로 조건이 거짓을 경우도 코딩이 가능하다.


그렇다면   
조건이 여러개라면????

    90점 넘으면 아이패드, 80점 넘으면 음.. 용돈 인상, 이거도 못하면 용돈 동결이야

```java
if(average > 90){
    System.out.println("아이패드사준다.") 
}
else if(average>80){                // 90점 넘으면 여기서도 해당되는거 아닌가요?? 할 수 있는데
    System.out.println("용돈인상이야") // 어쨌든 코드는 한줄 한줄 실행된다
}                                   // 즉 90점 넘는 애들은 위 if문에서 이미 다 걸러졌다.
else{
    System.out.println("용돈동결이야")
}
``` 

이렇게 else if로 조건을 세분화 해줄 수 있다.

이렇게 조건이 세분화되어서 분기되는 경우는 switch문으로도 작성이 가능하다.

#### b. switch문
switch문의 기본 구조는 다음과 같다.

```java

switch(변수){
    case ~ :
        // 이 케이스에 해당될 경우 실행될 코드
        break; // 다음 케이스 실행하지 않고 탈출
    case ~ :
        // 이 케이스에 해당될 경우 실행될 코드
        break; // 다음 케이스 실행하지 않고 탈출
    case ~ :
        // 이 케이스에 해당될 경우 실행될 코드
        break; // 다음 케이스 실행하지 않고 탈출
    .
    .
    .
    default: //괄호 다 해당 안되면
        // 실행될 코드
        break;
}
``` 

이를 이용해서 else if문과 똑같은 결과를 내는 코드를 작성하면

```java
int average = ~~ ; // 계산식이 들어가도 되겠고 뭐든 할당된다고 가정하자

switch(average/10){  // 10으로 나누 몫만 가져오게 한 이유는 case는 범위가 아니라 해당되는 수만 지칭하기 때문이다.
    case 10,9 :
        System.out.println("아이패드사준다");
        break;
    case 8 : // 실행문이 하나일 경우 case 8 -> ~~ 이렇게 작성이 가능하다 (람다식 스타일)
        System.out.println("용돈인상이야");
        break;
    default :
        system.out.println("용돈동결이야");
        break;
}
```

이렇게 작성되겠다.

---

### 2.반복문
반복문도 2대장이 있다. 하나는 for문 하나는 while문이다.

이번에도 추상적인 가정을 하나 하자

    할당량 채우면 끝내도 돼

#### a. for
for문은 반복 횟수를 특정할 수 있을 경우에 쓴다.

```java
for(초기화 ; 범위 ; 변화){
    //실행코드
}
```
<br>

사장님이 할당량 채우면 집에 가라한다. 그리고 나는 숙련공이라서 100번 반복하면 완료할 수 있는지 알 수 있다.

이런 경우

```java
for(int i = 0 ; i < 100 ; i++){
    System.out.println("작업한다");
}
System.out.println("집에간다");
```

위와 같이 작성하게 되겠다.

#### b. while
근데 사실 나는 미숙련공이라 몇번만에 끝날지 모른다. 이 경우는 반복을 어떻게 처리할까??

```java
while(조건식){
    //실행코드
}
```

while문을 이용하면 된다. 괄호에는 if문처럼 조건식이 들어가게된다.

그러면

```java
boolean working = true;
while(working){
    System.out.println("작업한다");
    if(작업이 끝나면){
        working = false;
    }
}
System.out.println("집에간다");
```java

물론 작업횟수를 아는 경우에도 while문은 사용 가능하다. 

다음과 같이

```java
int assignment = 0;

while(assignment < 100){
    System.out.println("작업한다.");
    assignment++;
}
```

while문은 엄밀히 따지면 
1. 조건을 따진 후
2. 실행문을 실행한다.

하지만 때에 따라서는
1. 실행문을 실행한다.
2. 조건을 따진다.

의 경우가 필요할 때도 있을 것이다. 무슨 차이냐고?? 순서가 다르잖아 ㅎㅎ  

그런게 아니고 실행문을 실행하고 반복문에 돌입한다 라는 차이가 생긴다

이 경우에는 do while문을 사용한다.

```java
do{
    //실행문
}while(조건식)
```