---
layout: single
title:  "Section 1 Effective - Lamda, Stream"

categories:
    - 코드스테이츠

tags:
    - Java
    
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---
[week5]

## 간단정리

<br> 

## 느낀점


<br>

## 스스로 답해보기

<br>

## 정리

### 1. 람다식 (Lamda)
    함수형 프로그래밍 기법을 지원하는 자바의 문법요소
    =
    익명 객체를 더욱더 간단하게 사용하고 싶은 개발자의 니즈가 반영된 산물

자바를 맨 처음 접했을때 봤던 구문이 생각난다. 정확히 읊을 수는 없지만 자바가 객체지향을 기반으로 한 프로그래밍이고, 다른 방식으로 함수형 프로그래밍이 있다??? 이런 기억이 난다. 그러니까 객체지향에서 부족했던 함수형을 더한게 아닐까??

    메서드를 하나의 식으로 표현한다.

코드가 매우 간결해 지겠다.

#### a. 특징
    반환타입과 이름을 생략한다.
    반환타입이 있는 경우 return문과 문장 뒤의 ; 생략 가능
    바디에 실행문이 하나만 있으면 중괄호 생략 가능
    매개변수의 타입 유추 가능할 경우 타입 생략 가능


first of all, let's see the code. A picture is worth 1000 words.

```java
1.

void sayMyName(){
    System.out.print("내 이름이 뭐라고?");
}  

() -> {System.out.println("내 이름이 뭐라고?");}
// 애초에 반환타입이 없어도 명시해야 했던 void 와 sayMyName이라는 메서드 이름이 생력되었다.

2. in case of parameter

String getMyName(String name){
    return name;
}

(String name) -> {return name;}

// 선언부의 매개변수와 바디만 '->' 로 연결해주자
```

#### b. 람다식도 객체다.
    사실은 익명 객체. 익명 클래스
        선언과 생성을 동시에 하여 단 한번만 사용되는 일회용 클래스

이런식으로
```java
new Object() {
    void sayMyName(){
    System.out.print("내 애름이 뭐라고?");
    }  
}
```

근데 선언과 동시에 생성하여 ***단 한번만 사용***되니까.. 저걸 참조변수에 담아줘도, 다음에 어떻게 메서드를 불러올껀데?? 이거로는 직관적인 이해가 힘드니까 더 풀어서 다시,
- 이부분은 다시 공부하고 풀어쓰도록 할 것이다. 0731

```java
1 Object obj = new Object() {
2    void sayMyName(){
3    System.out.print("내 애름이 뭐라고?");
4    }  
5 }
6
```
1번 obj에 담아줬다 하다라도 1회용 클래스라서 다시 sayMyName을 어떻게 불러올건데?? -> 이게 맞나?? 

그래서 람다가 등장한다. 위 코드를

```java

interface SaySomeonesName{
    public abstract void sayMyName();
}

public Class LamdaTest{
    public static void main(String[] args){

        SaySomeonesName SMN = () -> {System.out.println("내 이름이 뭐라고?")};

        or

        SaySomeonesName SMN = () -> {
            String str = "내 이름이 뭐라고?");
            System.out.println(str);
        }

        or

        SaySomeonesName SMN = () -> {};  // 선언과 대입을 따로 해준다면

        SMN = ()-> 위 두가지 써주면 된다.
    }
}
```

결국 자바는 객체지향 방식의 프로그래밍 언어 아니던가. 예외는 없다. 따라서 람다 또한 '함수형 인터페이스'를 통해 구현된다.

구현을 위한 재료들을 생각해보자
    인터페이스, 익명클래스

익명클래스로 인터페이스에 정의된 추상메서드를 구현한다. 

#### c. 메서드 참조

---

#### 2. 스트림 (Stream)
    배열, 컬렉션, 맵에 람다식 사용
    ->
    데이터 소스를 다루는데 용이