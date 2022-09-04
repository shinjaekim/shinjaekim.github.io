---
layout : single
title : "[개인] Spring Framework 아키텍쳐에 관하여"

categories : 
    - 개인탐구

tags : 
    - Spring

toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"
---
## 이 글에 담긴 것
- 프레임워크 아키텍쳐에 대한 이해
- 왜 스프링을 사용하는지
- IoC와 DI 존재의 이유

## 공부하던 부분
- 스프링 프레임워크 아키텍쳐

## 의문점
1. 스프링 프레임워크부터 좀 제대로 이해하고 넘어가야 하지 않겠는가?

## 따로 정리하는 이유와 글의 방향
스프링 프레임워크의 POJO, IoC/DI, AOP, PSA가 왜 있는지는 알고 써야지 추후 더 빠른 레벨업을 할 수 있을 것 같다고 생각했다. 그리고 아키텍쳐를 분석한다면 위의 목적을 달성할 수 있지 않을까 라는 막연한 희망이 있다. 따라서 이번 블로깅은 번역의 방법으로 진행하며 이해해보려한다. 

꽤 길어질 것 같다.

[원문 - 2. Introduction to the Spring Framework](https://docs.spring.io/spring-framework/docs/5.0.0.M5/spring-framework-reference/html/overview.html)

### 1. 스프링의 정의

> The Spring Framework is a Java platform that provides comprehensive infrastructure support for developing Java applications. Spring handles the infrastructure so you can focus on your application.
>>***"스프링 프레임워크는 자바 어플리케이션을 개발을 돕는 (포괄적인 인프라구조를 제공하는)플랫폼이다.***      
그래서 개발자는 구조가 아닌 제작하고자 하는 애플리케이션에만 집중 할 수 있다."

어떻게??   

> Spring enables you to build applications from "plain old Java objects" (POJOs) and to apply enterprise services non-invasively to POJOs. This capability applies to the Java SE programming model and to full and partial Java EE.
>>***"스프링은 POJO에 집중해서 애플리케이션을 만드는걸 가능하게 해준다."***

- *앞서 공부한바로 POJO는 순수한 자바객체를 말하니까, 지금까지의 원문을 통합하면 순수한 자바언어에만 집중해서 애플리케이션을 개발할 수 있는 구조를 제공해준다. 라고 생각하면 되겠다.*

그 구체적 예시로 4가지를 말하는데

    1.트랜잭션 API를 통하지 않고 자바 메소드가 직접 데이터베이스 트랜잭션을 싱행하고
    2.로컬 자바 메소드를 remote API 없이 remote procedure의 역할을 하게하고     
    3.로컬 자바 메소드를 JMX API 없이 management operation의 역할을 하게하고
    4.로컬 자바 메소드를 JMS API없이 message handlerd의 역할을 하게한다.

- *어느정도 이해는 가지만 용어 자체를 아직 확실히는 모르겠으니까 따로 정리하든지 하자*

#### 1-1. 자바 어플리케이션이 뭔데??

잠시 한쪽으로 빠져서, 스프링이 만든다는 자바 어플리케이션이 뭔지 궁금했는데 고맙게도 바로 밑에 나와있었다.
 
> A Java application — a loose term that runs the gamut from constrained, embedded applications to n-tier, server-side enterprise applications — typically consists of objects that collaborate to form the application proper. Thus the objects in an application have dependencies on each other.
>>"느슨하게 말하면 제약된, 임베디드 어플리케이션부터 n티어, 서버측면 기업어플리케이션까지의 전반을 말하는데,    
***일반적으로 적절한 어플리케이션을 형성하기 위해 협력하는 객체들을 포함한다. 그래서 서로간에 의존성이 있다."***

- *그러니까 스프링 프레임워크의 아키텍쳐는 여러가지 객체들을 포함하고 있을 것 같다는 생각이 든다.*

#### 1-2. 요약
    스프링은 개발자가 객체에만 집중하게 해준다.

"스프링의 정의"를 모아서 정리해보자면, 하나의 애플리케이션을 만드는 데에는 객체들이 협력하는데, 각 객체들이 협력할때의 관계와 과정, 구조를 설정해줘야 할 것이다. 하지만 스프링은 이런 단계를 자동으로 해줌으로서 개발자의 피로를 덜어준다. 개발자는 POJO의 원칙에 집중해서 순수한 java로 객체들을 만드는데 집중하기만 하면 된다.

---

### 2. IoC / DI

학습에서도 짚고 넘어갔듯 IoC는 **'제어의 역전'**을 뜻한다. 일반적인 자바 언어로 작성할때는 제어의 흐름이 개발자에게 있게 되지만 프레임워크로 작성하면 제어의 흐름은 프레임워크에게 있다. 이것은 앞서 정리했듯이 자바 어플리케이션의 구조는 여러 객체로 이루어져있고 프레임워크가 이 객체들간의 관계를 형성하는 전체적인 구조를 제공하여 개발을 돕기 때문이다. 여러 객체들끼리 관계가 있기 때문에 제어의 역전이라는 측면은 **'의존성 주입'**이라는 개념까지 이어질 수 있는 것이다.

원문을 통해서 더 파고들어보자

> Although the Java platform provides a wealth of application development functionality, it lacks the means to organize the basic building blocks into a coherent whole, leaving that task to architects and developers. 
>>물론 자바에도 어플개발을 위한 기능들이 있다고 한다.    
***"하지만 이 기능들은 기초블록들을 하나의 일관성 있는 전체로 조직하는 수단으로써는 부족하다고 한다".***

- *이 문단의 마지막에 '자바의 디자인 패턴'에 대해 말하던데 나중에 찾아보자 0812*

>The Spring Framework Inversion of Control (IoC) component addresses this concern by providing a formalized means of composing disparate components into a fully working application ready for use. The Spring Framework codifies formalized design patterns as first-class objects that you can integrate into your own application(s). Numerous organizations and institutions use the Spring Framework in this manner to engineer robust, maintainable applications.
>>***"이에 반해 프레임워크는 이질적인 요소들을 하나의 어플리케이션으로서 작동되도록 하는 형식화된 수단을 제공한다"***    
더 읽어보면 디자인 패턴들을 first class 객체에 성문화했고, 그래서 어플리케이션 제작을 할때 바로바로 사용할 수 있는데 이런 이유로 탄탄하고 유지보수 가능한 어플리케이션을 만들때 여러 기관들이 스프링을 사용한다.

#### 2-1 요약.

자바 어플리케이션은 여러 이질적인 객체들이 협력하여 작동하기 때문에 의존성이 발생하게 된다. 이런 관계 설정은 자바가 제공하는 수단들로만 하기에는 부족하다. 하지만 스프링은 이런 걸 대신 해주는 구조를 제공하는데 이런 이유로 제어의 역전이 발생한다.

---

### 3. 모듈

>The Spring Framework consists of features organized into about 20 modules. These modules are grouped into Core Container, Data Access/Integration, Web, AOP (Aspect Oriented Programming), Instrumentation, Messaging, and Test, as shown in the following diagram.
>> ***"스프링은 약 20개의 모듈로 구성되는데, 모듈들은 Core Contaienr, Data Acess/Integration, Web, AOP, Instrumentation, Messaging, Test로(8개) 그룹화된다."***

- 모듈마다 역할이 있는데 뭐 이게 더 큰틀에서 기능별로 그룹화 되는구나 로 이해했다.

![아키텍쳐](/assets/images/framework%20architecture.png)

#### 3-1 Core Container

>The Core Container consists of the spring-core, spring-beans, spring-context, spring-context-support, and spring-expression (Spring Expression Language) modules.
>> 코어 컨테이너는 spring-core, spring-beans, spring-context, spring-context-support, and spring-expression 총 네가지의 모듈로 구성된다.

(1). spring-core, spring-context 모듈

>The spring-core and spring-beans modules provide the fundamental parts of the framework, including the IoC and Dependency Injection features. The BeanFactory is a sophisticated implementation of the factory pattern. It removes the need for programmatic singletons and allows you to decouple the configuration and specification of dependencies from your actual program logic.
>> ***"프레임워크의 근본적인 부분들을 제공한다."*** 그리고 BeanFactory라는 것이 있는데 이것은 팩토리 패턴을 정교하게 구현한 것이라고 한다. 이후 내용은 실질적인 프로그램 로직으로부터 의존성의 구성과 사양을 분리할 수 있고, 프로그래밍방식의 싱글톤이 필요하지 않다.

일단 앞서 말한 의존성 주입과 제어의 역전과 같은 근본적인 부분을 제공한다라는 것은 직역만해도 알겠다. 하지만 BeanFactory와 이후 문장들은 따로 찾아봐야 할 것 같다.

    BeanFactory 
        bean -> 스프링이 제어권을 가져서 직접 생성하고 의존관계를 부여하는 객체
        그러니까 빈팩토리는 이러한 빈들을 생성하는 클래스를 말한다.

    singleton pattern
        객체 생성 측면에서 자원을 효율적으로 소모하기 위해 등장한 디자인 패턴
        "필요한 객체를 한번 생성해두면 어플리케이션이 종료될때까지 추가적인 생성을 하지 않음"
        
        why?

            하나의 요청 - 하나의 로직
        이렇게 대응관계가 있다고 했을때 이 서버에서 로직을 담당하는 객체가 매번의 요청마다 새롭게 생성된다면
        자원 관리측면에서 비효율적일 것이다.

        (이후 더 파고들어볼 것)

- *이쯤 와서 너무 얕봤다는 생각이 들긴 했다. 이해를 하려면 하나하나의 정의들이 무엇인지 알아야 할텐데, 걷기도 전에 뛰는 느낌?? 하이퍼링크식으로 엮여 있어서 할게 기하급수적으로 늘어난다. 따라서 모듈을 정리하고 관련 키워드들을 적어둔 후 학습이 진행될때마다 돌아오자.*

(2) spring-context, spring-context-support 모듈

>The Context (spring-context) module builds on the solid base provided by the Core and Beans modules: it is a means to access objects in a framework-style manner that is similar to a JNDI registry
>> (1)번 모듈에서 제공하는 경고한 기반을 바탕으로 한다. 이것은 JNDI registry와 유사한 프레임워크 스타일로 객체에 접근하는 수단이다.??

    keyword
        JNDI registry
        resource bundle
        event propagation
        Java EE features such as EJB, JMX
        ApplicationContext

>spring-context-support provides support for integrating common third-party libraries into a Spring application context, in particular for caching (EhCache, JCache) and scheduling (CommonJ, Quartz).
>> ***"spring-context-support 모듈은 caching과 scheduling과 같은 외부 라이브러리를 스프링 applicationcontext로 통합한다."***

(3) spring-expression 모듈 

>The spring-expression module provides a powerful Expression Language for querying and manipulating an object graph at runtime.
>> ***"런타임시에 쿼리와 객체 그래프 조작을 위한 강력한 언어표현을 제공한다"***

- *(점점 읽어도 이해가 안되니까 번역기 식으로 변역하고 있다)*

#### 3-2 AOP and Instrumentation

(1) spring-aop 모듈

>The spring-aop module provides an AOP Alliance-compliant aspect-oriented programming implementation allowing you to define, for example, method interceptors and pointcuts to cleanly decouple code that implements functionality that should be separated. Using source-level metadata functionality, you can also incorporate behavioral information into your code, in a manner similar to that of .NET attributes.
>> ***"분리되어 구현되어야 하는 코드들을 포인트컷이나 메서드 인터셉터를 정의하는 관심지향 프로그래밍 구현 제공한다."***

- *(여기서 분리되어야 하는 코드들이라 함은 앞서 AOP학습에서 공부했던 공통기능을 담당하는 코드가 아닐까 생각해본다.)*

(2) spring-aspects 모듈
>The separate spring-aspects module provides integration with AspectJ.

    keword
        Aspect J

(3) spring-instrument 모듈
>The spring-instrument module provides class instrumentation support and classloader implementations to be used in certain application servers. The spring-instrument-tomcat module contains Spring’s instrumentation agent for Tomcat.
>> spring-instrumnet는 특정 어플리케이션 서버에서 사용될 class instrumnetaion support and classloader implemntations를 제공한다?? 톰캣 모듈은 스프링의 ~ 여기서 instrumentation을 어떻게 이해해야할지..

#### 3-3 Messaging

>Spring Framework 4 includes a spring-messaging module with key abstractions from the Spring Integration project such as Message, MessageChannel, MessageHandler, and others to serve as a foundation for messaging-based applications. The module also includes a set of annotations for mapping messages to methods, similar to the Spring MVC annotation based programming model.
>> spring Integration 프로젝트의 추상화를 포함하는 Message, MessageChannel, MessageHandler가 있는데, 이것들이 메시지 기반 애플리케이션을 위해 기능하면서, 또 메시지를 메소드에 매핑하기위한 주석을 포함한다.

#### 3-4 Data Access / Integration

    keyword
        JDBC
        JPA
        Hibernate
    
#### 3-5 Web


#### 3-6 test

독해는 되는데 뭘 이야기하는지 몰라서 멈추기로 했다.

이 기능들을 다 이해하고 쓴다면 이런식의 가상시나리오 아키텍쳐를 그릴 수 있다.

![시나리오](/assets/images/spring%20scenarios.png)