---
layout: single
title:  "Section 3 Spring MVC - Controller"

categories:
    - 코드스테이츠

tags:
    - Spring
    
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---
[week9]
## 간단정리
- MVC는 model, view, controller의 약자
- MVC는 Spring에서 웹 계층을 담당하는 프레임워크
- controller는 클라이언트의 엔드포인트

<br> 

## 느낀점
짧지만 가장 현 기분을 잘 표현한 한마디는 '정신 똑바로 차리자'

<br>

## 스스로 답해보기
- MVC는 무엇인가?
- MVC 동작 방식을 설명해보자
- Controller는 어떤 의미를 갖는가?

<br>

## 정리
본격적으로 클라이언트에 요청한 http message를 전달 받아 비즈니스 로직을 실행하여 클라이언트가 원하는 정보를 제공하기 위해서,

서버를 어떻게 구현해야 하는지 알아보는 시간이 다가왔다.

### Spring MVC

Spring MVC는 Spring에서 웹 계층을 담당하는 모듈이다.

    M - Model

        디자이너가 모델을 통해서 관객에게 완성된 작품을 보여주듯,
        서버가 비즈니스 로직을 통하여 클라이언트에게 돌려줄 데이터를 만들었다면
        그것이 모델이다.

    V - View

        클라이언트에게 리소스, 즉 model을 제공하는 역할을 한다.
        아예 HTML페이지 식으로 전달할수도 있겠고(SSR)
        XML이나 JSON 형식으로 전달하여 프론트에서 페이지를 랜더링 하게 할 수도 있겠다.(CSR)

    C - Controller

        내가 이해한 바로는
        엔드포인트로써 클라이언트의 요청을 받고,
        이를 통해 Model을 생성,
        생성된 Model을 View를 호출하여 다시 클라이언트에게 돌려주는 일을 한다.

위의 추상적으로 설명한것들을 구체화 시키면,


### MVC 동작방식

추후 이해를 심화시키고 사진 첨부할 것 (20220819)


### Controller

@RestController
-> 클래스 레벨의 애너테이션으로 ***앞으로 해당 클래스가 엔트포인트로 작동할 것이다*** 를 알려줌
-> 로딩시 spring bean에 등록됨

@RequestMapping("")
-> 클래스 레벨에 적용하면 baseURL을 설정함
-> 괄호 안에 "/mylist/practice"의 형식으로

적용 예시

```java
@RestController
@RequestMapping("/mylist/practice")
public class ControllerExample{
    ~~~~
}
```

#### HTTP MESSAGE MAPPING

@PostMapping

    -> CRUD상의 'C-CREATE'를 담당하는 post 요청을 처리하겠다.
    -> responsebody를 받기 때문에
        1. @RequsetParam
        2. DTO
        이용

@PatchMapping

    -> CRUD상의 'U-UPDATE'를 담당하는 patch 요청을 처리하겠다.
    -> responsebody를 받기 때문에
        1. @RequestParam
        2. DTO
        이용
    -> 이미 생성되어 있는 데이터의 id이용
        @PatchMapping("/{~~}")
        @PathVariable(~~)
        ~~은 같아야함    

@GetMapping

    -> CRUD상의 'R-READ'를 담당하는 get 요청을 처리하겠다.
    -> 하나의 정보만 조회할 경우
        @GetMapping("/{~~}")
        @PathVariabel(~~)
        ~~는 같아야함
    -> 모든 정보 조회는 list로

@DeleteMapping

    -> CRUD상의 'D-DELETE'를 담당하는 delete 요청을 처리하겠다.

#### ResponseEntity
 
클라이언트에게 JSON형식으로 직렬화 하여 보내줄 수 있는 객체


### 여기까지 적용해보면

```java
@RestController
@RequestMapping("/mylist/practice")
public class ControllerExample{
    
    @PostMapping
    public ResponseEntity post(@RequestParam("this") String this){
        ~~~
    }

    @PatchMapping("/{list-id}")
    public ResponseEntity patch(@PathVariable("list-id") long listId,
                               @RequestParam("this") String this){
        ~~~
    }
    
    @GetMapping
    public ResponseEntity get(@PathVariable("list-id") long listId){
        ~~~
    }

    @PostMapping
    public void delete(){
        ~~~
    }
}
```