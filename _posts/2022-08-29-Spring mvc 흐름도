---
layout: single
title:  "[개인] Sring MVC 흐름에 관하여"

categories:
    - 개인탐구

tags:
    - Spring 

toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---

## 간단정리
-

<br> 

## 느낀점


<br>

## 스스로 답해보기

<br>

## 정리
 
controller부터 jdbc까지 공부를 했지만 전체적인 흐름으로 다가오지 않아서 정리를 하고 넘어가려고 한다.

### 1. http message요청

클라이언트에서 http message를 요청한다

    POST PATCH GET DELETE

<br>

### 2. Controller

클라이언트에서 요청한 http message가 JSON형식으로 엔드포인트인(클라이언트 입장에서) 서버의 controller에 도착한다.

#### 2-1 DTO

POST와 PATCH의 경우 responsebody를 포함하고 있다. 

따라서 각각의 요청 데이터들을 @Requestparam 애너테이션을 이용하여 받게 되는데, 

이 경우 responsebody의 요청데이터가 많아질수록 @Requestparam의 갯수가 늘어나 코드가 복잡해지게된다. 

따라서 DTO(Data Transfer Objet)를 따로 만들어 컨트롤러의 핸들러 메서드의 파라미터로 받는다.

    POST의 경우 멤버변수로 responsebody의 모든 데이터들을,
    PATCH의 경우 멤버변수로 변환하고자 하는 데이터들을 설정한다.

#### 2-2 유효성 검사

responsebody를 받는 DTO객체에서 유효성검사를 시행한다.

기본 제공되는 애너테이션(@Notblank, @Email 등)을 이용하거나

커스텀 애너테이션을 만들어 사용한다.

<br>

### 3. Service

비즈니스 로직을 설계한다.

Controller는 클라이언트와의 데이터공유만을 담당해야 한다.

따라서 Service객체를 따로 만들고, DI(생성자 이용)를 이용하여 Controller 에서 호출한다.

### 3-1 Entity

DTO가 클라이언트-Controller 사이의 정보공유를 위한 객체라면

Entity는 Controller 이후 Service를 거쳐 model을 생성하기 위한 객체이다.

따라서, DTO를 Entity로 변환하여 사용하도록 하자.

### 3-2 Mapper

위에서 말한 DTO를 Entity로 어떻게 바꾸는가? 에 대한 답이다.

Mapper를 따로 생성하여 DTO->Entity의 작업만 담당하게 하고

DI(생성자 주입)을 통하여 Controller에서 호출한다

### 3-3 여기까지의 흐름

http message -> DTO -> Controller -> Mapper(DTO->Entity) -> Servcie

### 3-4 예외 처리

예외 처리는 3가지의 경우가 있다.

1. 클라이언트의 requestbody가 유효성검사를 통과하지 못한 경우
2. 서비스 계층의 비즈니스로직에서 의도적으로 던지진 예외의 경우
3. 런타임 과정에서 발생하는(실행 과정에서 발생하는) 예외

1번.
@ExceptionHandler를 이용하고,

클라이언트에게 보여주고 싶은 에러메시지들만을 모은 클래스를 따로 작성하여

리스트에 담아 반환해준다.

다만, 컨트롤러 레벨에서 @ExceptionHandler를 이용하면 코드의 중복이 발생한다.

