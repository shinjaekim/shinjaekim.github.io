---
layout: single
title:  "Section 1 Effective - Enum, Annotation"

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
- enum
    - 공통범주로 묶이는 상수들
    - 중복, 타입안정성 문제 해결
    - 메서드 이용 간편한 사용 가능
- annotaion
    - 컴퓨터를 위한 주석
    - 기본, 메타, 사용자 정의

<br> 

## 느낀점

enum을 공부해보면서 인터페이스의 타입안정성 부분에 대한 이해를 좀 더 심화해 볼 필요가 있다고 느꼈다. 아무래도 기본형으로 선언했을 경우 전혀 관계없는 상수임에도 같은 타입이기에 비교가 가능해서?? 이지 않나 싶다. 하지만 참조형으로 선언하면?? 이부분은 따로 공부해서 정리해봐야겠다.

<br>

## 스스로 답해보기

- enum은 왜 생겼겠나???
- 사용 메서드들 생각해보기
- 애너테이션의 대상은?
- 표준 애너테이션, 메타 애너테이션, 사용자 정의 애너테이션??

<br>

## 정리

### 1. 열거형 enum
    enumerated type

    상수들을 보다 편하게 선언해보자.

상수와 변수부터 다시 되짚어보면 변수는 선언 이후 몇번이고 재할당 할 수 있다. 하지만 상수는 선언과 동시에 할당하고 재할당이 불가하다. 상수를 고치고 싶다면 선언한 뿐에 가서 리터럴을 변경해야 한다.
```java
int a = 100; // 변수
final int b = 200; // 상수는 선언과 동시에 초기화
a = 50; // 변수의 재할당
a = b;  // 변수의 리터럴로 상수의 리터럴을 대입

b = 300; // 상수의 재할당 불가능
```

그렇다면 enum은 왜 필요한가???  
적절한 동음이의어를 가져와보자.
    bear - 1번의미 곰 / 2번의미 견디다.

그리고 밑의 코드를 천천히 따라가며 enum의 필요성을 이해해보자. 분명 다시 와서 보게될 거니까 좀 이해하기 편하게 해보자.

```java
public static final int LION; = 1;    // 어디서나 접근 가능한, 전역, 상수
public static final int DOG; = 2;
public static final int ELEGATOR = 3;
public static final int BEAR = 4
// 동물들 우리를 지정할때 번호로 쓰기위해서 열거했다.

public static final int BEAR = 1; // 2 (견디다.)
public static final int ENDURE; = 2;
public static final int GO; = 3;
public static final int PASS; = 4;
// 사람의 행동을 설명하는 프로그램 작성을 위해 번호로 열거했다.

```
위의 예시는 상수의 이름이 중복되어 컴파일 에러가 발생한다.  -> ***중복상수문제***

이 문제를 해결하기 위해서 인터페이스를 사용한다면 
- 인터페이는 상수와 추상메서드만을 가진다.
- 공통된 기능끼리 묶인다.

```java
//중복상수 문제는 제거 되었다.
interface Safari {
    int lion = 1, int dog = 2, int elegator = 3, int bear = 4;
}

interface behavior{
    int bear = 1 int endure = 2 , int go = 3 , int pass = 4;
}

//하지만 타입 안정성이 떨어지게된다.

Safari.bear == behavior.bear 과 같이 비교가 가능해지는데 의미적으로나 아무 관련이 없음에도 비교가 가능하다.
```

위의 예시는 타입 안정성 문제를 유발한다.

이러한 타입 안정성 문제는 객체생성을 해주면 해결된다. 인터페이스에서의 상수의 타입은 '기본형'이다. 값 자체의 비교가 가능하다. 하지만 class로 객체를 생성하면 상수의 타입이 사용자 정의의'참조형'이 된다. (이것이 타입 안정성을 지켜주는것??)

```java
//객체로 생성해준다.
class Animal{
    public static final Animal bear = new Animal();
}

class Behavior{
    public static final Behavior bear = new Behavior();
}
```

위의 예시 또한 문제점은 있다.
- 코드가 길어진다.
- switch문 사용 불가. - 굉장히 중요한듯

***따라서 enum을 활용하면 이렇게 된다.***

```java
enum Aniaml { LION, DOG, ELEGATOR, BEAR}
enum Behavior { BEAR, ENDURE, GO, PASS}
```

***하나하나의 상수들은 객체이며, 0부터 시작하는 정수값이 할당되게 된다.***

#### a. 예제코드

```java
import java.util.*;
enum Cage { BEAR, LION, TIGER, COYOTE }

public class EnumTest {
    public static void main(String[] args) {
        Cage bear = Cage.BEAR;
        System.out.println(bear.ordinal());  // 베어의 번호 리턴
        System.out.println(" ");

        Cage[] arr = Cage.values();    // enums.value() -> 모든 상수들을 배열로 반환
        System.out.println(Arrays.toString(arr));
        System.out.println(" ");

        for (Cage a : arr) {
            System.out.println(a.ordinal() + " 번 우리입니다.");
            System.out.println(a.compareTo(Cage.BEAR)); // 베어와의 순번차이
        }
        System.out.println(" ");
        
        // bear 참조 변수를 타고 내려가서 처음 값이 나올 것.
        switch (bear) {
            case BEAR:
                System.out.println("1번 우리");
                break;
            case LION:
                System.out.println("2번 우리");
                break;
            case TIGER:
                System.out.println("3번 우리");
                break;
            case COYOTE:
                System.out.println("4번 우리");
                break;

        }
    }
}
// ordinal -> 순번 리턴
// name() -> 이름을 문자열로 리턴
// compareTo(비교값) -> 순번 차이 구해서 리턴
// values -> 모든 열거 객체들을 배열로 리턴
```

---

### 2. 애너테이션(Annotation)
    컴퓨터를 위한 주석(정보전달)

바로 위의 Enum의 예시 코드도 마찬가지고, 개발자 마다의 코드 구성이 상이할 수 있기 때문에 협업의 과정에서 상대방이 이해를 도울 수 있는 주석을 작성하는 것은 너무나도 필요하다. 지금까지는 다른 개발자들을 위해서 주석을 작성했다면 애너테이션은 다른 프로그램을 위한 주석이라고 한다. *이게 무슨 말?*
 
일단은 다음과 같은 기능을 한다고 한다

    컴파일러가 문법 에러를 체크할 수 있도록 정보 제공
    프로그램 빌드시 코드 자동 생성
    런타임에 특정 기능 실행하도록

*****테스트 코드 작성에 관하여 공부해볼 것***

### a. 애너테이션의 종류
    익숙해지면 지울 것. <- 아직임. 더 해야함

- 표준 애너테이션 -> 자바 기본 제공
    @Override
        이 메서드를 오버라이딩한다.
            오버라이딩을 했는데 오타가 발생했다면? -> 새로운 메서드로 인식
            애너테이션 달아주면 오류 발생으로 알려줄 것이다.

    @Deprecated
        앞으로 안 쓸거다.
            하위버전에서 상위버전으로 넘어가면서 안쓰는 코드가 생길 경우
            그냥 안쓰면 지워버려!! 라고 해도 되지만 하위버전과의 호환성을 위해 남겨둔다.
        
    @Functionallnterface
        이건 함수형 인터페이스다
            함수형 인터페이스의 올바른 선언여부
                함수형 인터페이스는 단 하나의 추상메서드를 가져야 함.
            
    @SuppressWarning
        경고메세지 보내지 마라
            all
            deprecation
            fallthrough -> switch문에서 break가 없을 때
            finally
            null
            unchecked -> 검증되지 않은 연산자 관련
            unused -> 사용하지 않는 코드 관련

            위와 같은 상황의 경고메세지를 충분히 예측가능할때 무시하기 위해서

- 메타 애너테이션 -> 애너테이션을 위한 애너테이션
    @Target
        적용 대상을 지정한다.
        java.lang.annotation.ElementType 에 있다 그러니까
            import java.lang.annotation.ElementType 하면 편하겠지?

    @Documented
        애너테이션 정보를 javadoc 문서에 포함

    @Inherited
        애너테이션을 하위클래스에 상속되도록
        
    @Retention
        애너테이션이 유지되는 기간

    @Repeatable
        애너테이션 반복 사용

- 사용자 정의 애너테이션 -> 객체 만들듯이 애너테이션도 만들어 쓸 수 있나보다.
    java custom annotation 검색해보기