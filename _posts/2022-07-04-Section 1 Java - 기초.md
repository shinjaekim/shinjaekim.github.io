---
layout: single
title:  "Section 1 Java - 기초"

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

- Java는 객체지향언어이다. 따라서 운영체제 독립적이며, 메모리를 자동관리하고, 이식성이 뛰어나다.
- 변수는 리터럴의 임시저장 공간이다.
- 상수는 final을 사용하며 유지 보수 용이, 가독성의 이점이 있다.
- 타입별로 8가지의 변수들이 있다.
- 문자열은 String클래스와 그의 메서드들을 이용한다.

## 느낀점

- 과거 복수전공으로 듣던 기억들이 새록새록하다. 그때는 엄청 어려웠는데 지금은 덕분에 이해하는 속도가 빨라진 느낌이다. 변수 선언의 구조와, 그 내용들이 어떻게 메모리에 저장되며 어떠한 방식으로 계산이 실행되는가에 대한 추상적인 틀이 박혀있는듯 하다. 자바의 정석을 사서 더 심도있게 파보도록 하자.

---

## 스스로 답해보기 (사전질문)

- JVM, JDK
- main 메서드
    - 메서드란??
- 의사코드는 왜 작성하는가?
- 변수에 값을 저장한다는 것에 대해 생각의 가지를 펼쳐보자
- 타입은 왜 존재하는가?
- 반복문, 조건문은 어떻게 쓰이겠는가?

---

## 정리


### 1. Java

    - Object Oriented Programming - 객체지향 프로그래밍
        - 레고블록을 만들어서 합친다 생각하자
    - 뛰어난 이식성 - JVM - 운영체제 독립적
    - 함수형
    - 자동 메모리 관리
        - 가비지 컬렉터


#### a. 특징

    1.운영체제에 독립적이다.
        - 다른 언어들은 운영체제에 직접 작동 ↔ JVM을 통해 운영체제에 관여
            - 언어는 운영체제 독립적, JVM은 운영체제 종속적
                - 자바 (컴파일) → 바이트 코드 → JVM (해석)
                - JVM + 표준 클래스 라이브러리 = JRE + 각종 도구들 = JDK

    2.객체지향 프로그래밍
        - 레고 블록을 생각하자. 필요한 부품들을 만들어서 합친다.

    3.함수형
        - 람다형, 스트림, 함수형 프로그래밍 → 더 알아보도록 하자

    4.자동 메모리 관리
        - 사용자가 직접 메모리 관리를 할 필요 없음
            - 가비지 컬렉터

    5.Class 안에 method
        - Class Main → 클래스 Main을 만들고
        - public static void main(string[] args) → main 메서드를 만들어서 이 안에 코드 작성
            - 진입점 함수
            - A main ( B C )
            - A의 타입을 가진 main 메서드를 만드는데, B타입의 C라는 이름을 가진 변수를 매개변수로 둔다.
                - 매개변수는 외부의 값들을 메서드 내부로 ‘매개'해준다.
                - A 메서드와 B 메서드는 같은 이름의 매개변수를 가질 수 있겠지
                - 전역변수 지역변수 heap stack 따로 공부해보자.
    
(7.27일)   
다시 돌아와서 나만의 언어로 적어보면 자바를 레스토랑에 비유할 수 있을 것 같다. 
    프로그램을 만드는 것 = 잘 운영되는 레스토랑을 만드는 것

효율적이고 효과적으로 운영되는 레스토랑 체계 자체를 만들기 상황에 맞는 경영전략, 그리고 생산관리 등 여러가지의 기본 원리들을 적용하게 될 것이다. 예를들어 어쩔때는 고급화전략, 어쩔때는 원가절감 등 상황에 맞는 전략을 택하게 된다. 마찬가지로 프로그램을 만들기 위해서 (jdk)표준 클래스 라이브러리와 각종 도구들을 이용하여 상황에 적합한 코드작성을 꾀할 수 있을 것이다.

    클래스 = 레스토랑의 모든 객체
앞서 설명한 봐와 비슷하게 느껴질 수 있겠지만 분명 다르다. JDK는 사전 준비 단계에서 선택권을 넓혀주는 역할을 했다. 표줄 클래스 라이브러리 같은 것이 보편적으로 알려진 경영전략일 것이다. 이제는 레스토랑을 나만의 특징을 가진 레스토랑으로 만들어야 한다. 클래스가 그런 역할을 할 것이다. 직원 수, 주방 도구들, 요리 방법, 손님 응대 방법 등 여러가지의 기능과 속성들을 정의하게 된다.

    메서드 = 주방
주방은 여러 식재료와 노동력을 바탕으로 맛있는 요리를 만들어 낸다. 메서드는 매개변수라는 식자재를 바탕으로 여러 기능들을 수행하여 반환값으로 맛있는 요리를 내놓을 것이다.
<br>



#### b. 변수와 타입
    타입 변수 = 리터럴
타입을 통해 값의 크기를 **확인**하고, 메모리의 공간을 **확보**하고, 리터러를 **저장**한 후, 변수명을 **명명**한다.

- 변수
    - 변하는 값 임시 저장 수단
    - 타입 이름 → 선언
    - = 00 ; 할당 → 한줄에 선언과 할당 동시에 가능
    - 변수 선언시에 ‘=’ → 대입연산자
    - 타입으로 크기를 확인하고 → 확인한 만큼 메모리를 확보한 후 → 값을 임시 저장하고 → 너는 이제부터 ‘a’다
    - 학교에서 친한 친구 집을 ‘~~네 집’ 이라고 외우지 ‘~시 ~동 ~아파트 ~동 ~호’ 이러면 친구집 못 찾아간다.
    - 변수 이름은 camelCase 기억하자
    - 대 소문자는 구별하며 -, $ 사용 가능하다
- 상수
    - final ~
    - 유지보수도 편할 것이고, 가독성도 높힐 것이니라.
- 타입
    - 기본타입 - 값을 저장
        - int basic
    - 참조타입 - 값이 저장된 주소를 저장 - 객체
        - Object reference = new object();
- 리터럴
    - 값
- 정수 / 실수 / 논리 / 문자 타입
    - byte short int long
        - 오버플로우, 언더플로우 - 순환
    - float double
        - 오버플로우 - 무한대
        - 언더플로우 - 0
    - boolean
    - char
- 타입변환
    - 작 → 큰 : 자동
    - 큰 → 작 : () : 캐스팅
        - 문자 → 숫자 : - ‘0’ / - 48
        - 숫자 → 문자  : + ‘0’ / +48
- 문자열
    - 클래스로 사용됨 - 클래스는 타입으로 사용 가능 —— 거푸집 - 클래스 / 실제 사용 - 인스턴스
    - 또한 클래스 안에 유용한 메서드들이 있음
    - String.method()
    - 선언방법
        - String str = “”;
            - 문자열 리터럴을 할당
            - 하나의 저장공간을 차지하고 있는 하나의 리터럴의 주소를 여러 String에 할당. 즉 내용비교시 같음
        - String str = new String(””);
            - String클래스의 인스턴스를 생성
            - 별개의 인스턴스 주소를 값으로 가짐
            - 따라서 ‘==’으로 비교시 false
            - 내용을 비교해주는 ~~~.equals를 통한다면 true
        - 메서드들 (사용방법 생각해볼것)
            - compareTo()
            - charAt()
            - concat()
            - indexOf()
            - trim()
            - toLowerCase()
            - toUpperCase()
            - 참고 : [https://www.javatpoint.com/understanding-toString()-method](https://www.javatpoint.com/understanding-toString()-method)
    - StringTokenizer
        - java.util.StringTokenizer를 우선 import하고
        - 지정한 구분자로 문자열을 쪼갠다.
        - 쪼개진 문자열 - 토큰
        - *(더 이해하면 채워넣기)*
    - StringBuilder
        - StringBuilder st = new StringBuilder();
        - st = append(””).append(””);
        - String str = st.toString();
    - StringBuffer
        - append()
        - capacity()
        - delete
        - deleteCharAt
        - insert()
- 연산자는 우선순위만 더 집중하도록 하자.
    - 괄 - 부,증 - 곱,나 - 대소 - 앤 - 오 - 조건 - 대입,할당
- 콘솔 출력
    - System.out.print() println() printf()
    - %b %d %o %x %c %s %n
- 콘솔 입력
    - import java.util.Scanner;
    - Scanner scanner = new Scanner(System.in)
    - String input = scanner.nextline()

### 2.추가공부
    java.lang.Object@626b2d4a는 무엇인가???
---

문제발생 )

intellij → run configuration → main shift+enter

import 문제 해결

환경변수 설정

운동 - 팔