---
layout: single
title:  "Section 3 Spring MVC - Service, Mapper"

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
- DTO클래스와 mapper를 통해 Entity를 만든다.
- @Service 애너테이션은 해당 클래스가 서비스 계층임을 알려준다.
- Controller에 Service와 mapper를 DI한다.

<br> 

## 느낀점
이해가 잘 되지 않았던 DI의 개념이 쓰다보니 이해가 된다. 그리고 controller와 dto, entity와 service를 잘 다져놓아야 추후 진행할 data acess또한 이해가 잘 될 것 같다. 더 열심히 하자.

<br>

## 스스로 답해보기
- Entity는 무엇이며 왜 만드는가?
- Service 클래스를 만들 수 있는가?
- Controller에 적용 가능한가?

<br>

## 정리

WAS(Web Application Server)를 보면,

클라이언트로부터 도착한 요청이 어떤 흐름으로 진행되는가를 파악할 수 있다.

    API계층 -> Service계층 -> DataAccess계층

지금까지는 API계층이 무엇인지, 그리고 Controller의 역할과 Dto클래스에 대해서 알아보았다.

이제 Service로 넘어가자.

정리하기에 앞서 지금까지 만들었던 코드를 조금 다듬고 가야겠다는 생각이 든다.

*(컨트롤러)*
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


*(DTO)*
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

단순하게 this, name, age를 클라이언트로부터 전달받는 responsebody와 매치시켰는데,

지금부터 이 Post는 졸업생들의 직업을 조사하는 기능중의 일부로 판단하여

this를 job으로 바꾸어 생각하고 진행하겠다.

<br>

### 1. 엔티티

WAS상의 계층들은 각 계층의 '주'역할만을 담당하는 것이 코드분석, 유지보수에 유리하게 작용할 것이다.

이러한 이유로 Controller 클래스가 클라이언트와의 정보공유만을 위해 작동하도록 responsebody와의 변환을 담당하는 dto클래스를 따로 만들어 주었다.

이와 마찬가지의 이류로 서비스 클래스에서도 엔티티라는 것이 존재한다.

***엔티티는 비즈니스 로직을 처리하기 위한, 처리한 데이터를 전달하기 위핸 객체이다.***

*(Entity의 구현)*
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entity{
    private long Id;
    private String job;
    private String name;
    private int age;
}
```

바뀐점이라면 Lombok을 이용한 애너테이션으로 게터,세터(@Data) 메서드와 생성자 코드를 설정해주었다.

그리고 long형으로 Id를 선언하였다. 이는 auto increment식별자로서 추후 데이터액세스 계층에서 활약할 예정이다.

<br>

### 2. Mapper의 등장

앞선 DTO는 @RequestBody 애너테이션으로 JSON -> 객체 의 자동 변환이 되었다.

마찬가지로 DTO또한 엔티티로 변환해 주어야 할 것인데,

앞서 언급했듯 서비스계층에서는 비즈니스 로직만을 담당하는 것이 옳을 것이다.

따라서 DTO -> Entity의 역할을 담당하는 클래스를 따로 만들어 주어야 한다.

이 역할을 담당하는 것이 Mapper이다.

방법은 여러가지다.

1. 직접 하나하나 일치시킨다.

```java
public class Mapper{
    private long Id;
    private String job;
    private String name;
    private int age;

    public Entity postDtoToMapper(PostDto postDto){
        return new Entity(0L,
                        PostDto.getJob(), 
                        PostDto.getName(), 
                        PostDto.getAge());
    }

    public ResponseDto EntityToResponseDto(Entity entity){
        return new ResponseDto(Entity.getId(),
                            Entity.getJob(),
                            Entity.getName(),
                            Entity.getAge());
    }
}
```

2. MapStruct을 이용한다.

1의 경우처럼 하나하나 매핑해주는 것은 개발자의 몫일 것인데, 매핑할 것이 많아지면 일이 많아진다.

따라서 MapStruct 인터페이스를 이용할 수 있다.

일단

*(build.gradle에 의존성 라이브러리 추가)*
```java
dependencies {
	...
	...
	implementation 'org.mapstruct:mapstruct:1.4.2.Final'
	annotationProcessor 'org.mapstruct:mapstruct-processor:1.4.2.Final'
}
```
*(인터페이스 작성)*
```java
@Mapper(componentModel = "spring")
public interface Mapper{
    Entity postDtoToMapper(PostDto postDto);
    ResponseDto EntityToResponseDto(Entity entity);
}
```

그리고 responseDto클래스를 적성한다.


```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto{
    private long Id;
    private String job;
    private String name;
    private int age;
}
```

Mapper클래스에서는 각각의 핸들러 메서드에 맞게 사용 가능하도록

1) DTO -> Entity의 기능을 담다하는 메서드와

2) Entity -> DTO의 기능을 담당하는 메서드를 작성해주었다.

또한 2)를 위해서 ResponseDto클래스를 작성해주었다. 이 클래스의 존재는 필수적이다. 비즈니스로직을 거쳐 Entity클래스에 담긴 정보를 클라이언트에게 넘겨주기 위해서는 다시 DTO클래스로의 변환이 필요하기 때문이다.

<br>

### 3. Service 계층

일단 위의 재료들을 바탕으로 작성해보도록 하겠다.

```java
@Service
public class ServiceExample(){

    public Entity CreatePost(Entity entity){
        // Business logic
        Entity createEntity = entity

        return entity 
    }
}
```

일단 @Service라는 애너테이션은 해당 클래스가 '비즈니스로직을 실행함'을 알리고 'Bean'으로 등록해준다.

그리고 아직 비즈니스 로직은 작성이 안되어 파라미터로 받은 엔티티를 그대로 반환하지만 액세스 계층까지 만든다면 비즈니스 로직이 들어가게 될 것이다.

<br>

### 4. controller에 service DI

```java
@RestController
@RequestMapping("/mylist/practice")
public class ControllerExample{

    private final ServiceExample service;
    private final Mapper mapper;

    public ControllerExample(ServiceExample service, Mapper mapper){
        this.service = service;
        this.mapper = mapper;
    }
    
     @PostMapping
    public ResponseEntity post(@RequestBody PostDto postDto){
        
        Entity response = service.createPost(mapper.postDtoToEntity(postDto));

        return ResponseEntity<>(mapper.EntityToResponseDto(response), HttpStatus.CREATED);
    }
    
}
```

DI를 이용하여 service와 mapper를 선언해주고 post핸들러의 내용을 추가시켰다.