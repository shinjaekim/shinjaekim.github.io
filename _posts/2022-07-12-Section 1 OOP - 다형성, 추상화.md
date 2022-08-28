---
layout: single
title:  "Section 1 OOP - 다형성, 추상화"

categories:
    - 코드스테이츠

tags:
    - Java
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---
[week4]
## 간단정리

- 다형성
    - 하나의 클래스로 다양한 인스턴스들 참조
        - 상속의 경우에 가능
    - 하위 = 상위 -> 하위를 상위로 변환 = 업캐스팅 -> ()생략 가능
    - 상위 = 하위 -> 상위를 하위로 변환 = 다운캐스팅 ->()생략 불가능
    - 많이 가진자는 적게 가진자를 커버할 수 있다

<br>

## 느낀점

꼬이는 느낌이 든다. 상황을 비유하면 군부대에서 눈치우는 상황이 맞는거같다. 배에다 대고 눈을 밀면서 가다가 돌뿌리라도 만나면 뒤쳐지게 된다. 지금이 그렇다. 다형성을 이해하는 과정에서 업캐스팅과 다운캐스팅을 이해하는데 꼬임이 있었고, 때문에 그 이후 과정인 추상화 마저도 망처버린 느낌이다. 앞이 안되면 뒤를 보고와서 해도 되는 공부인데 좀 고치도록 해야겠다. 직렬식 공부 말고 병렬식 공부에도 적응하자.

<br>

## 스스로 답해보기 (사전질문)

- 다형성은 왜 존재해야 하는가?
- 참조변수의 타입 변환에 대해 자유롭게 말해보자
    - 업캐스팅 and 다운캐스팅
- 추상화는 무엇인가?
- abstract / final
- 추상클래스와 인터페이스

<br>

## 정리


### 1. 다형성
    Polymorphism - 하나의 객체가 여러가지 형태를 가진다.

자바에서는 한 타입의 참조변수를 통해서 여러 타입의 객체를 참조할 수 있다. 이것이 가능한 이유는 상속때문이다. 클래스는 인스턴스 생성을 위한 자료형이된다. 
기본형에서 그러했듯 참조형에서 또한 서로 변환이 되는 것이라 이해했다.

<br>

#### a. 코드
```java
public class PolymorphismTest {
    public static void main(String[] args) {
        Bottle b = new Bottle(35, "삼다수");
        CokeBottle cb = new CokeBottle(3, "코카콜라", 100);

        Bottle cbb = new CokeBottle(5, "펩시콜라", 200);  // 다형성예시.
        CokeBottle bd = new Bottle();  // 하위클래스로 상위클래스 다형성사용 불가능


        b.gram = 32;   // 하위클래스의 멤버는 사용하지 못함

        cb.gram = 150;
        cb.size = 20;  // 상위 클래스의 멤버 사용 가능

        cbb.gram = 35; // -> 다형성을 이용해서 참조했다면 하위 클래스의 멤버는 사용 불가능
    }
}
class Bottle{
    int size;
    String brand;

    public Bottle(){};

    public Bottle(int size, String brand){
        this.size = size;
        this.brand = brand;
    }

    public void inner(){
        System.out.println("물이 들어있습니다.");
    }
    public void inner(int i){
        System.out.println("i그람을 주입합니다.");
    }
}

class CokeBottle extends Bottle{
    int gram;

    public CokeBottle(){};
    public CokeBottle(int size, String brand, int gram){
        super(size, brand);
        this.gram = gram;
    }

    public void inner(){
        System.out.println("콜라가 들어있습니다.");  //오버라이딩
    }
}
```

#### b. 코드 분석
상속관계를 보면 Bottle이 상위, CokeBottle이 하위 클래스이다. 이를 파악하고 main메서드의 흐름을 보자.
지금까지 공부한 바로는 하나의 인스턴스는 인스턴스를 설계한 클래스를 참조변수로 선언한다.

```java
Bottle b = new Bottle(35, "삼다수");
CokeBottle cb = new CokeBottle(3, "코카콜라", 100);
```

하지만 이 코드를 보자

```java
Bottle cbb = new CokeBottle(5, "펩시콜라", 200);
```

Bottle이라는 자료형으로 CokeBottle인스턴스를 생성했다. 이것이 가능한 이유는 CokeBottle이 Bottle을 상속받았기 때문이다. 이 때 이 점을 고려해보자
    하위클래스는 상위클래스보다 같거나 많은 멤버수를 가지게 된다.

때문에 이것은 불가능하다.
    1. 하위클래스로 상위클래스 인스턴스 참조
    2. 다형성을 이용하여 상위클래스로 하위클래스 인스턴스를 참조했더라도 상위클래스에 없는 멤버는 사용 불가

따라서 위 코드 상 이것은 불가능하다.

```java
1. CokeBottle bd = new Bottle();
2. b.gram = 32;
```

이유는 생각해보면 쉽다.
    있는 것은 안쓰면 되는데, 없는 것은 만들어야 한다.

멤버의 수로 있는 것을 치환하면, 상위 클래스보다 하위 클래스가 '있는 것'이 많다. 따라서 상위클래스로 하위클래스를 참조하게 되는 경우는 하위 클래스에만 '있는 것'을 안쓰면 된다. 다시 한번 말하면, 다형성을 이용하여 상위클래스로 하위클래스 인스턴스를 참조하게 되는 경우, 하위 클래스에만 존재하는 기능은 사용하지 않으면 그만이다. 반대의 경우는 인스턴스를 생성해도 구현된 기능이 없어서 사용이 불가능하다.
    

    상위클래스 -> 하위클래스
        멤버 숫자로 비교하면 상위 <= 하위.
        즉 상위클래스의 설계도로 하위클래스의 인스턴스를 참조하면 넘치는 기능은 안쓰면 된다.
        설계 객체
         A   A 
         B   B
             C   -> C는 안쓰면 된다.

    하위클래스 -> 상위클래스
        멤버 숫자로 비교하면 상위 <=하위.
        즉 하위클래스의 설계도에는 있지만 상위클래스의 인스턴스에는 구현되지 않은 기능이 있다.
        설계 객체
         A   A    
         B   B
         C      -> C를 쓰고 싶은데 구현된게 없다. 따라서 이 경우의 다형성은 불가능하다.

#### c. 타입 변환
기본형의 타입변환을 떠올려보자. int형을 long형에 대입하는 경우 그냥 쓰면 된다. 하지만 long형을 int형에 대입해야 하는 경우는 (int)로 명시해준다.

```java
long A = 100L
int B = 200
A = B      // 자동 형변환
B = (int)A
```

이제 참조변수의 타입변환으로 바꾸어 생각해보자.
    상위 = 하위 - 업캐스팅 - 괄호 생략 가능
    하위 = 상위 - 다운캐스팅 - 괄호 무조건

하위클래스는 표현할 수 있는 것이 많다. 때문에 하위클래스로 상위클래스를 지정하는 경우는 그냥 추가적인 기능들을 안쓰면 그만이다. 반대는?

지금까지의 내용을 보면 다 이 점때문에 발생하는 것 같다.
    하위클래스의 멤버 숫자가 많기 때문이다.

정리하면 다형성 하에서 **하위클래스로 상위클래스 인스턴스를 참조하는것은 불가능**하고, **하위클래스를 상위클래스로 형변환하는 업캐스팅**에 괄호를 안 붙여도 되는 이유는 하위클래스가 가진게 더 많기 때문이다. = **구현된 기능이 더 많기 때문이다.**


#### d. instanceof
상속을 생각해보면 최정점에는 Object클래스가 위치한다. 그리고 그 하에 직접 작성한 클래스부터, 래퍼 클래스등 여러 클래스들이 존재할 것이다. 이 때에 모든 계층을 한눈에 파악하지 않았다면 언제 다운캐스팅 업캐스팅의 여부를 파악하기 힘들 것이다.
    참조변수 instanceof 타입

instanceof는 이때 사용한다. 캐스팅 여부를 boolean 값으로 반환한다.

#### e. 매개변수를 이용한 다형성
코드 복붙이 아닌 작성해보기

---

### 2. 추상화
    공통성과 본질을 모아 추출한다.

지금까지 본 상속과 다형성은 상위클래스로부터 하위클래스로 내려가며 설계했다. 하지만 이런 경우를 생각해보자. 무수히 많은 자동차 객체를 만들어야하고 이 객체들이 가진 공통속성을 뽑을 수 있다. 즉 밑에서부터 생각해서 위로 올라가는 상향식 설계도 가능하지 않을까??

#### a. abstract
    추상 메서드와 클래스를 만드는 기타 제어자

자바에서 abstract을 쓰거나 본다면 '미완성'을 떠올리자. abstract이 붙은 메서드나 클래스는 추상 메서드, 추상 클래스가 된다. 추상 클래스는 추상 메서드를 포함하며 이 때 추상 메서드는 선언부만 있고 바디가 없는 상태다. 따라서 추상 클래스를 기반으로 한 객체 생성은 불가능하다.
    
그렇다면 왜???

상속받는 클래스에서 오버라이딩으로 구현한다.
    - 추상 클래스에서는 사용할 메서드에대한 언급을 한다 생각
    - 구체화는 상속받은 클래스에서
    - 이러면 유연한 대처가 가능해진다.

#### b. 코드 예시

```java
public class AbstractTest {
    public static void main(String[] args) {
        Flowerbox f = new Flowerbox();
        Honeybox h = new Honeybox();

        f.naming();
        h.naming();
    }
}

abstract class Box{
    String name;
    abstract void naming();
}

class Flowerbox extends Box{
    public Flowerbox(){
        this.name = "꽃박스";
    }
    public void naming(){
        System.out.println("꽃박스에요");
    }
}

class Honeybox extends Box{
    public Honeybox(){
        this.name = "꿀박스";
    }
    public void naming(){
        System.out.println("꿀박스에요");
    }
}
```
코드를 보면 일단 추상을 이해하기위해 굉장히 간단하게, 이상하게 작성을 했다. 어쨌든 들여다 보면 공통 기능인 naming을 Box라는 추상메서드를 가진 추상클래스를 작성하고, 이를 Flowerbox와 Honeybox에서 상속받게 해서 오버라이딩으로 구현하였다. 이 경우 main 메서드를 컴파일러가 읽으면 다음과 같은 결과가 나온다.
    "꽃박스에요"
    "꿀박스에요"

결국 추상 클래스는 왜 쓰는가에 대해 다시 한번 답을 한다면, 공통기능을 추상클래스로 작성하고 상속받은 클래스에서 구현함으로써 클래스간의 관계를 파악하고 또한 코드의 중복과 유지보수를 관리하는데 도움이 되기 때문이라 말 할 수 있겠다.


#### c. final
    변경이 불가능하다는 것을 선언

- final class -> 변경, 확장, 상속 불가
- final method -> 오버라이딩 불가
- final variable -> 변경 불가능한 상수값 선언

*abstract과 마찬가지로 자주 쓰이는 기타 제어자 이기 때문에 알고 넘어간 것 같다.*

---

### 3. 인터페이스
사실 추상화의 뼈대이기 때문에 추상화 안의 목록으로 작성하려 했으나 중요하다고 느껴져서 동일레벨로 뺐다. 나중에 복습할때마다 이유를 보고 들어가려고 굳이 설명한다.
    추상클래스보다 더 높은 추상성
    추상메서드의 집합

추상 클래스는 *추상 메서드를 하나 이상 가진* 이런 특성을 가진다. 결국 클래스인 것이다. 하지만 인터페이스는 *추상메서드와 상수*만을 멤버로 가진다.

#### a. 인터페이스의 사용

```java
public interface InterfaceEx {
    public static final int rock =  1; // 인터페이스 인스턴스 변수 정의
    final int scissors = 2; // public static 생략
    static int paper = 3; // public & final 생략

    public abstract String getPlayingNum();
		void call() //public abstract 생략 
}
```

#### b. 인터페이스의 구현
    class ~~ implements interface

상속과 비슷하지만 extends가 아닌 implements를 사용한다. 또한 인터페이스를 구현하는 경우 인터페이스에 정의된 모든 추상메서드를 구현해야한다.   
<br>

또한 인터페이스는 자바에서 확실한 이점이 있는데

<br>

**다중 상속의 효과를 가지게 해준다. 즉 여러 인터페이스를 구현할 수 있다.** 클래스에서 다중상속을 금지했던 이유는 부모 클래스와 자식클래스가 동일한 멤버를 가지게 되는 경우 충돌이 발생하기 때문이었다. 하지만 인터페이스는 미완성된 멤버를 가지고 있어서 충돌의 여지가 없다. 그리고 또한 장점은 **역할과 구현을 분리**한다는 것이다.