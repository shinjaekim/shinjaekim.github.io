---
layout: single
title:  "Section 2 Spring Framework - DI"

categories:
    - 코드스테이츠

tags:
    - Spring
    
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---
[week8]
## 간단정리

<br> 

## 느낀점


<br>

## 스스로 답해보기
- 컨테이너란 무엇인가
- 빈이란 무엇인가
- DI이제 다시 설명해봐라
- component 스캔은 무엇을 뜻하는가?

<br>

## 정리
스프링 프레임워크는 POJO라는 특징을 DI, AOP, PSA의 방식들을 통해서 달성했다. 아무래도 낯설은 개념이라서 음 이런거군 하고 이해는 했지만 돌아서면 제대로 기억이 나지 않는 것도 사실이다. 그런데 중요하긴 한가보다. 다음 챕터에 다시 DI와 AOP가 등장했다.

DI와 AOP에 들어가기에 앞서 기본 개념부터 알고 들어가야겠다. 다행히도 이전에 정리했던 글 덕분에 큰 틀을 바탕으로 접근하는데 도움이 된다고 느낀다.

[Spring Framework 아키텍쳐에 관하여](https://shinjaekim.github.io/%EA%B0%9C%EC%9D%B8%ED%83%90%EA%B5%AC/Spring-framework-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90%EC%97%90-%EA%B4%80%ED%95%98%EC%97%AC/)


### 1. container

컨테이너라 하면 커다란 수출선에 쌓인 형형색색의 물체들이 떠오르는데... 왜 스프링에서 컨테이너라는 단어가 쓰일까??

일단 수출선의 컨테이너 안에는 여러가지 물건들이
- 저장되었다가
- 수출선이 움직이는 동안 보관되었다가
- 목적지에 도착하면 하역된다.

자바에서의 컨테이너 또한 현실세계에서의 컨테이너와 비슷한 역할을 한다.

***담는 물체는 빈(bean)이라 불리는 객체이고 Bean을 생성하고, 관리하고, 제거하는 등의 역할을 담당한다.***

#### a. ApplicaitionContext

컨테이너의 의미를 알았다면 정확히 무엇이 컨테이너의 역할을 할까??

바로 ***ApplicationContext***이다.   
그리고 ApplicaitionContext는 xml 혹은 애너테이션 기반의 자바 클래스로 설정 가능하다. 당연히 후자를 기반으로 사용할 것이다. 

방법이 두개라는 것은 둘을 비교할 수 있다는 뜻이 된다. 하나의 원문을 가져와보도록 하자

>the introduction of annotation-based configuration raised the question of whether this approach is “better” than XML. The short answer is “it depends.” The long answer is that each approach has its pros and cons, and, usually, it is up to the developer to decide which strategy suits them better. Due to the way they are defined, annotations provide a lot of context in their declaration, leading to shorter and more concise configuration. However, XML excels at wiring up components without touching their source code or recompiling them. Some developers prefer having the wiring close to the source while others argue that annotated classes are no longer POJOs and, furthermore, that the configuration becomes decentralized and harder to control.
>> 요약하면 무엇이 뛰어난 지는 개발자의 상황에 달려있다는 것이다. 애너테이션을 활용하면 더 짧고 간결한 구성을 설계할 수 있다. 그리고 XML은 코드를 건드리지 않고 컴포넌츠들을 관계시키는데 더 뛰어나다고 한다.

##### BeanFactory

그런데 말입니다... 
여기서 궁금한 점이 하나 생겼습니다. 앞서 정리한 스프링 프레임워크에서 beanfactory라는 것을 슬쩍 본 기억이 나는데, beanfactory는 그럼 또 뭘까요??

    ApplicaitonContext 는 BeanFacotry의 하위 인터페이스

찾아보니 기능은 같다고 한다.(엄밀히 말하면 아닐수도) 다만, ApplicationContext가 BeanFactory의 하위 인터페이스이기에 부가적인 기능을 더 가지고 있다. 이 소리는 굳이 BeanFactory를 쓸 필요는 없다는 말로 해석해도 될 것 같다. 부가기능까지 가진 더 좋은놈을 냅두고 굳이??

- BeanFactory
    - 스프링 컨테이너의 최상위 인터페이스
    - getBean() : 빈을 인스턴스화
    - @Bean이 붙은 메서드의 명을 스프링 빈의 이름으로 사용해 등록함

- ApplicaitonContext
    - 위 기능들은 당연히 가지고 있고
    - MessageSource: 메세지 다국화를 위한 인터페이스
    - EnvironmentCapable: 개발, 운영 등 환경변수 등으로 나눠 처리하고, 애플리케이션 구동 시 필요한 정보들을 관리하기 위한 인터페이스
    - ApplicationEventPublisher: 이벤트 관련 기능을 제공하는 인터페이스
    - ResourceLoader: 파일, 클래스 패스, 외부 등 리소스를 편리하게 조회

#### b. 역할

일단 위에서 말했듯 역할을 간단하게 표현하면

    Bean을 생성하고, 관리하고, 제거하는 등의 역할을 담당한다

가 된다.
이를 자세히 표현하면 Spring container는
1.빈을 인스턴스화 시킨다.
2.빈의 구성, 주기를 관리한다.

1,2를 통해서 이를 통해서 개발자가 원하는 만큰의 객체를 가질 수가 있다.

3.의존성 주입을 통해 애플리케이션의 컴포넌트를 관리한다.
    - 서로 다른 빈을 연결해서 애플리케이션의 빈을 연결하며
    - 이를 통해 의존성으로 인해 발생하는 문제로부터 자유로울 수 있다.
    - 메서드가 언제, 어디서 호출되어야 하는지, 메서드를 호출하기 위해 필요한 매개변수를 준비해서 전달하지 않는다??

3번의 3번째 이유를 제외하고는 이해가 간다.

먼저 지금까지 객체를 인스턴스화 할때는 'new'를 사용했다. 

하지만 여러 인스턴스들을 만들어 사용하는 경우 이런경우 문제가 생길 수 있다. 

    객체를 인스턴스화 하여 여러 관계가 설정되어있는데 하나의 인스턴스를 수정한다면??

방대해진 코드를 어디서부터 수정해야할지 감이 잡히는가??

***이런 이유로 스프링 컨테이너를 사용하며, 스프링 컨테이너는 구현클래스에 있는 의존을 제거하고 인터페이스에만 의존하여 설계할 수 있도록 해준다.***

#### C. 방법론 (컨테이너 인스턴스화)

```java
// Annotation
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

// XML
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
```
ApplicationContext 생성자에(괄호안에) 제공된 위치경로의 다양한 외부 리소스로부터 구성 메타데이터를 로드함

<br>

### 2. Bean

    스프링 컨테이너가 관리하는 자바 객체

앞서 의존성을 낮추기 위해 컨테이너를 통해서 빈을 생성하고, 주기를 관리하고, 제거한다고 했다. 이때 관리하는 대상이 바로 빈이다.

(추후에 정리할 것)

    Spring 컨테이너가 관리하는 자바 객체를 의미하며, 하나 이상의 빈을 관리합니다.

    빈(bean)은 인스턴스화된 객체를 의미합니다.

    스프링 컨테이너에 등록된 객체를 스프링 빈이라고 합니다.

    @Bean이 적힌 메서드를 모두 호출해서 반환된 객체를 스프링 컨테이너에 등록합니다.

    빈은 클래스의 등록정보, 게터/세터 메서드를 포함합니다.

    빈은 컨테이너에 사용되는 설정 메타데이터로 생성됩니다.

    설정 메타데이터

    XML 또는 자바 애너테이션, 자바 코드로 표현합니다.
    컨테이너의 명령과 인스턴스화, 설정, 조립할 객체를 정의합니다.

    @Configuration : 구성정보를 담당하는것을 설정할때 @Configuration 을 붙여줍니다.
    @Bean : 각 메서드에 @Bean을 붙이면 스프링 컨테이너에 자동으로 등록이 됩니다.