---
layout: single
title:  "REST API, Postman에 관하여"

categories:
    - 개인탐구

tags:
    - 네트워크
 
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---
## 이 글에 담긴 것
- API를 이해하려는 몸부림
- REST API
- postman 사용

## 공부하던 부분
- postman을 이용한 실습

## 의문점
1. 나는 왜 실습을 하고도 체계가 잡히지 않았는가??

## 탐구
언제나 모르는게 있으면 위키를 참고하고 시작한다. 친절하신 위키 선생님께서는 이렇게 말씀하셨다.

> An application programming interface (API) is a way for two or more computer programs to communicate with each other.

두개 이상의 컴퓨터 프로그램이 상호작용을 하는 방법론이다.

> It is a type of software interface, offering a service to other pieces of software

다른 소프트웨어로 서비스를 제공하는 소프트웨어 인터페이스다.

> In contrast to a user interface, which connects a computer to a person, an application programming interface connects computers or pieces of software to each other.

유저 인터페이스는 사람과 컴퓨터를 연결하지만 api는 컴퓨터와 컴퓨터 소프트웨어를 연결한다.

---

### 들어가기에 앞서

    to 다시 돌아온 나에게..

    http와 tcp,ip 흐름을 나름대로 정리했는데 먼저 읽고 들어가면 좋을 것 같다.

    best regards..!

[HTTP, TCP/IP 흐름](https://shinjaekim.github.io/%EA%B0%9C%EC%9D%B8%ED%83%90%EA%B5%AC/HTTP%EC%99%80-TCP-IP-%ED%9D%90%EB%A6%84%EC%97%90-%EA%B4%80%ED%95%98%EC%97%AC/)

우선은 마지막에 도식화한 정리만 가져와봤다.

    [정리]
                      (2) 
    client <--(1)--> server <--(3)--> database

    ----------------------------------------------------------------------------

    (1) : HTTP관점에서 본다면 request/response
        네트워크 관점에서 이러한 HTTP 메시지가 전달되는 과정은 TCP/IP 4계층으로 바라보자.

    (2) : presentation layer / applicatioㄴn layer / data access layer
        + CrossCutting, third party integrations(API)

    (3) : query

---

### 본론
다시, 위키 선생님의 말을 따르면 API는 다음과 같이 말할 수 있다.

    API - Application Programming Interface

    두 애플리케이션이 서로 통신할 수 있게 하는 메커니즘

<br>

-interface-           
먼저 interface는 gui에서 본적이 있다. 그래픽요소로 컴퓨터를 이용하게 해줌으로서 컴퓨터와 사람을 연결한다. 그러니까 사람이 컴퓨터의 기능들을 사용할 수 있도록 한다. 이런 인터페이스의 개념을 어플리케이션으로 가져온다면, 한 어플리케이션이 다른 어플리케이션의 기능,데이터를 사용할 수 있게 하는 것이라 하겠다.

-application-        
그리고 여기서 Application이라 함은 '고유한 기능을 가진 소프트웨어'를 나타내고, 인터페이스는 Application 간의 서비스 계약이라고 할 수 있겠다. 이 서비스 계약은 ***요청, 응답***으로 구체화된다.

애플리케이션들끼리 통신하는 과정이 요청과 응답으로 나누어져있다는 뜻은 애플리케이션이 담당하는 역할이 다르다는 것이 되겠다. 그리고 그 역할은 '클라이언트'와 '서버'로 나뉘어진다.

보통 서버를 구축하면 서버에서 자신의 데이터에 접근하고 제어할 수 있는 API를 만들고, 다른 프로그램이 이 API를 통해서 서버의 데이터에 접근하게 된다.

    http        -----------> 게임 데이터 API            
        Client               전적 API        --------------> SERVER
        클라이언트              아이템 API       <--------------  서버
    application -----------> 직업 API

이런 API는 

    SOAP API
    RPC API
    Websocket API
    REST API

이렇게 4개의 작동방식으로 설명가능한데 내가 심화학습 하고자하는 것은 REST API이다.

#### 1. REST API

    Representational State Transfer

웹 구성 아키텍쳐에서 본 HTTP방식의 통신과 같이 '서버가 클라이언트에 요청을 데이터로 전송하고, 서버는 비즈니스 로직에 맞게 실행 한 후 응답한다.' 라는 것이 기본 구조이다. 그리고 이 개념은 HTTP공동 저자의 중 한명인 로이 필딩에 의해 제시되었다.

즉, 정리하면 REST API는

> HTTP를 잘 활용하기 위한 원칙이고, REST API는 이 원칙을 준수해서 만든 API이다.

그리고 원칙을 구체화하면 다음과 같다.

    URI로 자원(리소스)를 표현한다.
    자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현한다.

그리고 또 구체화 한 원칙을 방법론적으로 구조화 하면

    0단계 - HTTP사용
    1단계 - 개별 리소스와의 통신 준수
    2단계 - HTTP메소드 원칙 준수
    3단계 = HATEOAS 원칙 준수

이렇게 하면 좋은 REST API가 디자인된다.

'의사와의 진료 예약하기'를 예시로 구조화한것을 적용해보자

    0단계 - POST /appointment HTTP/1.1

        일단은 HTTP프로토콜을 사용만 하면 된다.

    1단계 - POST /doctors/허준 HTTP/1.1

        개별 리소스와의 통신이 준수되어야 한다
        = 모든 데이터나 자원은 HTTP URI로 표현한다.
        = 개별소스에 맞는 endpoint를 사용해야한다
        = appointment -> doctors/허준

        그리고 엔드포인트에서는 행위에 대한 단어사용은 지양하고
        리소스에만 집중하자. .. 행위는 method로 표현했다 이미

    2단계 - GET /doctors/허준/slots?date=2022-08-01 HTTP/1.1

        CRUD에 맞는 메소드를 사용하자. 이 경우 POST보다는 GET이 더 적합하다.
        CRUD = Create, Read, Update, Delete
        HTTP에선 POST,  GET,  PUT,    DELETE 

    3단계 - 응답에 리소스의 URI를 포함한 링크 요소를 삽입하여 작성한다.


#### 2. postman
브라우저는 주로 GET요청을 보내기 때문에, 다른 요청들을 테스트해보기 위한 
    
    API 테스트 도구
    
라고 생각하면 된다.
    
![postman](/assets/images/postman.png)

1. 새로운 탭을 오픈한다.
2. HTTP메서드를 선택한다.
3. URL과 Endpoint를 입력한다.
    API의 URL, 구체적인 경로
4. REQUEST
5. BODY 추가
6. 응답화면