---
layout: single
title:  "Section 3 Spring - 테스팅(단위테스트)"

categories:
    - 코드스테이츠

tags:
    - Spring
    
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---
[week12]
## 간단정리
- 테스트의 범위는 단위, 슬라이스, 통합, 기능 테스트로 나뉜다.
- 테스트를 작성할때는 given when then으로 나누어 작성해보자
- JUnit은 자바 애플리케이션을 테스트 하기 위한 오픈소스 프레임워크이다.
- Hamcrest의 매쳐를 이용하면 가독성이 향상된 assertion을 작성할 수 있다.

<br> 

## 느낀점
테스트 코드는 궁금했던 영역이긴 했다. 내가 작성한 코드를 내가 테스트 할 수 있도록 직접 테스트 코드를 작성한다 함은, 내가 코드를 구현함에 있어서 생각해내고 사용한 로직이 전부 내 것이라는 것을 방증하기 때문이다. 일단은 이번 글에서는 단위테스트만 다뤘다. 추후 사이드프로젝트를 진행할때 비즈니스로직을 설계한다면 테스트코드도 함께 구현해보도록 노력해보자.

<br>

## 스스로 답해보기
- 테스팅의 범위 나열해보기
- given when then??
- JUnit이란?
- Hamcrest는?

<br>

## 정리 - 들어가며

테스트 한다는 것은 무엇일까??

> 어떤 결과를 예상하고 부합하는지 확인한다.

웹 애플리케이션 코드를 구성했다 함은, 어떠한 결과를 예상했음을 내포하고 있다.

그러면,

내가 작성한 코드가 내 예상대로 작동하는지는 어떻게 알 수 있을까??

    1) 빌드 후 실행시켜본다
    2) postman과 같은 툴을 이용해서 테스트 한다.
    3) 테스트 코드를 짜서 확인해본다.

3번이 이번 글에서 다루고자 하는 주제이다.

### 1.테스트의 분류

    단위 테스트
    슬라이스 테스트
    통합 테스트
    기능 테스트

하위로 갈수록 테스트의 범위가 넓어진다.

단위테스트에서는 쉽게 말해 비즈니스 로직을 위하여 작성된 메서드를 테스트한다.

슬라이스 테스트는 웹 애플리케이션 서버를 구성하는 각 계층을 테스트하며

통합 테스트는 계층의 흐름을 전체적으로 테스트 한다.

그리고 기능 테스트는 사용자의 관점에서 의도한 기능이 제대로 작동하는지를 테스트 한다.

---

### 2. 단위 테스트

    원칙

        1. Fast - 테스트는 빠르게
        2. Independent - 테스트끼리는 독립적이며
        3. Repeatable - 여러번 실행 가능해야하고
        4. Self-validating - 자체적으로 검증결과를 보여주어야 하며
        5. Timely - 기능 구현 전에 작성해야 한다.

여기서 5번을 보면 '시기적절함'의 의미가 '기능 구현 전'이다. 이렇게 기능 구현 전에 먼저 테스트코드(테스트 케이스)를 작성하고 시작하는 것을 TDD(Test Driven Development) 테스트 주도 개발이라고 한다.

#### 2-1. given - when - then

    given - 테스트를 위한 사전 준비
    when - 테스트하고자 하는 메서드 호출
    then - 결과 도출

이해를 위해 짧막한 코드를 만들어 보자.

```java
    public class Calculator{

        public static int calSum(int first, int second){
            return first + second;
        }
    }
```
위 클래스의 calSum은 이번에 테스트하고자 하는 메서드이다.

```java
    public class CalculatorTest{
        public static void main(String[] args){

        }
    }

    private static void calSumTest(){
        //given
        int first = 3;
        int second = 10;

        // when

        int actual = Calculator.calSum(first, second);
        int expected = 13;

        //then
        System.out.println(expected == actual);
    }
```

given에 검사를 위한 임의의 값을 변수에 대입하고,
when에서 실제로 메서드에 설정 변수들을 파라미터로 전달한 후
then에서 예상 값과 비교한다.

---

### 3. JUnit 적용하기

위에서 단위테스트와 단위테스트에서의 given - when - then을 알아보았다.

하지만,

스프링 애플리케이션이라면 엔트리포인트 main은 이미 작성되어 있을 터인데, test를 위해 main 메서드를 포함한 클래스를 하나 더 작성해야했다. 

이는 JUnit을 적용함으로써 해결 가능하다.

> JUnit - 자바언어 기반 애플리케이션을 테스트하기위한 오픈 소스 프레임워크

#### 3-1. 기본구조

```java
import org.junit.jupiter.api.Test;

public class JunitDefaultStructure {
		// (1)
    @Test
    public void test1() {
        // 테스트 하고자 하는 대상에 대한 테스트 로직 작성
    }

		// (2)
    @Test
    public void test2() {
        // 테스트 하고자 하는 대상에 대한 테스트 로직 작성
    }

		// (3)
    @Test
    public void test3() {
        // 테스트 하고자 하는 대상에 대한 테스트 로직 작성
    }
}
```

#### 3-2. Assertion 메서드

> Assertion : 예상 결과 값이 참이길 바라는 논리적인 표현

JUnit에는 이 Assertion을 이용한 메서드가 존재한다. 그럼 이를 통해 2-1에서 작성한 테스트 코드를 수정해보자

```java
import org.junit.jupiter.api.Test;

public class JunitDefaultStructure {
    
    @DisplayName("CALSUM_TEST")
    @Test
    public void calSumTest() {
        
        //given

        int frist = 3;
        int second = 8;

        //when
        int actual = Calculator.calSum(first, second);
        int expected = 11;

        //then
        assertEquals(expected, actual);
    }

```
@DisplayName의 애트리뷰트에 이름을 지정하면 테스트 실행시 지정한 이름이 표시되며
@Test 애너테이션을 활용하여 테스트 코드임을 밝혔고
마지막, assetEquals 메서드를 이용하여 expected와 actual을 비교하였다.

    그 밖의 메서드

        assertNotNull(대상, "null일경우 메시지")
            Null 여부를 테스트한다.

        assertThrows(발생 예상 예외클래스, 테스트 메서드(람다식))
            예상되는 예외클래스가 발생하는지 테스트한다.

    
    @BeforeEach, @BeforeAll, @AfterEach, @AfterAll

        전처리와 후처리 메서드이다.
        each는 테스트메서드 하나가 실행되기전의 전/후처리
        all은 한번만 하는 전/후처리 

---

### 4. Hamcrest의 매쳐

Junit의 Assertion 메서드를 더욱 가독성있게, 세련되게 바꿀수 있다.

3-2의 코드를 수정하면 다음과 같다.

```java
import org.junit.jupiter.api.Test;

public class HamcrestTest {
    
    @DisplayName("CALSUM_TEST")
    @Test
    public void calSumTest() {
        
        //given

        int frist = 3;
        int second = 8;

        //when
        int actual = Calculator.calSum(first, second);
        int expected = 11;

        //then
        //assertEquals(expected, actual);
        assertThat(actual, is(equalTo(expected)));
    }
```

then에서의 변화를 보면 기존의 코드가

*** assert That actual is equal to expected ***

를 그대로 녹인 메서드로 변환되었다. 이것이 Hamcrest

    assertNotNull
        -> assertThat(대상, is(NotNullValue()))

    assertThrows
        -> assertThrows를 Throwable 타입 변수에 담고,
           assertThat(변수.getCause(), is(equalTo(null)))