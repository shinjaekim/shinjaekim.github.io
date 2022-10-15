---
layout: single
title:  "Section 3 Spring MVC - DTO, 유효성 검사"

categories:
    - 코드스테이츠

tags:
    - Spring
    
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---
[week10]
## 간단정리
컨트롤러의 핸들러 메서드는 클라이언트와의 데이터 전송을 담당하는 계층으로써의 역할을 다해야 한다. 때문에 dto를 만들고, 유효성 검사를 진행하게 한다면 그 기능에 충실하게 해줄 수 있다.

<br> 

## 느낀점
점점 느낀점 적는 것이 무의미해지고 있다. 매일 새롭고 매주 '엥??' 이러는데, 그냥 정말 이게 다라서 뭐 추가할 말이 있나 싶다 라는 생각이 나를 지배한다. 느낀점 파트에 다가오면?? 말도 한국식 어순으로 안쓰고 있는 뭔가 그렇다고 영어도 아닌, 생각이 매우 혼재되어 있다.

<br>

## 스스로 답해보기
- dto는 무엇의 약자인가??
- dto는 왜 사용하는가??
- dto 적용 흐름
- @requestbody와 @responsebody 애너테이션

<br>

## 정리 - 들어가며

DTO는 왜 사용할까??
현재 리소스의 개별 데이터들의 개수가 적기 때문에, 바인딩을 하는데에 있어 @Requestparam을 이용해도 커버가 가능하다.
하지만 리소스에 포함되는 데이터의 개수들이 많아진다묜?? 코드가 복잡해지고 이는 즉 유지보수의 어려움으로 직결될 것이다.

따라서 DTO로 받아서 해결하자

### DTO

    DTO - Data Transfer Object
    
        데이터를 전송하기 위해 사용하는 객체


잠시 흐름을 짚고 가도록 하겠다.

이 전 컨트롤러에서 Http message의 ResponseBody의 데이터들을 하나하나 @RequestParam으로 받아왔었다.

이 경우 핸들러 메서드에서는 ***'클라이언트와의 통신만은 담당한다'*** 라는 설계원칙을 달성하기 힘들어진다.

핸들러 메서드 안에서 데이터들로 Map을 채워준 후 ResponseEntity에 전달해주어야 하기 때문이다.

하지만 ***DTO***를 이용하면 이 문제점을 해결할 수 있다.

### 적용

DTO 객체를 이용하는 방법은 간단하다.

DTO 클래스를 따로 설계한 후 ***멤버 변수로 @RequestParam 애너테이션으로 받아오던 변수들을 선언한다.***

만약 컨트롤러의 post핸들러 메서드가 다음과 같았다면

*(수정전)*
```java
@RestController
@RequestMapping("/mylist/practice")
public class ControllerExample{
    
    @PostMapping
    public ResponseEntity post(@RequestParam("this") String this,
                               @RequestParam("name") String name,
                               @RequestParam("age") int age){
        Map<Object, Object> list = new HashMap<>();

        map.put("this", this);
        map.put("name", name);
        map.put("age", age);

        return ResponseEntity<Map>(list, HttpStatus.CREATED);
    }
    
}
```

이렇게 DTO 클래스를 만들어주자.

*(DTO 클래스 설계)*
```java
public class PostDto{
    private String this;
    private String name;
    private int age;

    public String getThis(){
        return this;
    }
    
    public String name(){
        return name;
    }

    public int age(){
        return age;
    }
}
```

그리고 이제 Dto 클래스를 넣어주자.

*(적용)*
```java
@RestController
@RequestMapping("/mylist/practice")
public class ControllerExample{
    
    @PostMapping
    public ResponseEntity post(@RequestBody PostDto postDto){
        

        return ResponseEntity<>(postDto, HttpStatus.CREATED);
    }
    
}
```

한결 간단해졌다.

여기서 중요한 점은 @RequestBody를 추가했다는 것이다.

이렇게하면 클라이언트쪽에서 http메시지가 JSON형식으로 전송될때 자동으로 지정한 DTO객체로 변환해준다.

### 유효성 검사

간결함에 더하여 DTO에 유효성 검사를 추가함으로써 잘못된 형식의 입력들을 방지할 수 있다.

프론트엔드쪽에서도 유효성검사를 진행하지만 breakpoint후 데이터를 바꾸는 것이 가능하기때문에 한번 더 해주어야 하는 것이다.

방법은 간단하게 DTO클래스의 멤버변수에 애너테이션을 적용해주는 것인데,

애너테이션들과 정규식표현, 그리고 커스텀 애너테이션을 설정하는 것은 따로 정리를 해서 링크를 걸도록 하겠다.(0822)
