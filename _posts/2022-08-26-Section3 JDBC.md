---
layout: single
title:  "Section 3 Spring - JDBC"

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
- spring data jdbc는 jdbc api를 더 손 쉽게 사용할 수 있도록 편의성을 증진시켜주는 기술이다.
- table과 entity mapping시에 primary key에 @id 애너테이션을 추가하자
- entity와 table의 이름이 다를 시 클래스 레벨에 @table("이름") 애너테이션을 추가하자
- 관계설정을 위해서 scheme 파일에 테이블을 설계해주어야 한다.

<br> 

## 느낀점
단순히 지식을 구현하는 부분이 아니라는 것을 뼈저리게 느낀다. controller와 service의 경우보다 내가 직접 설계해보고 구현해보아야 더욱 더 내 것이 되는 영역인 것 같다.

<br>

## 스스로 답해보기
- JDBC는 무엇인가
- ORM은 무엇인가
- spring data JDBC는 무엇인가?

<br>

## 정리 - 들어가며

JDBC - Java Database Connectivity

이름을 직역해보자. - 자바와 데이터베이스의 연결 -

맞다. 우리가 자바언어의 코드레벨에서 데이터베이스를 사용 할 수 있게 해주는 것이다.

정확히 말하면 위 목적을 위한 표준 사양이다.

    표준사양

    pojo를 생각해보면 된다. 해당 사양을 구현하는 여러 벤더사들이 있을 것인데,
    표준사양이 아닌 벤더사의 기술을 그대로 코드에 적용한다면
    1. pojo가 아니게 될 것이며
    2. 그래서 유지 보수, 개선이 힘들 것이다.
    하지만 표준 사양을 구현한 벤더사의 기술들을 사용하면
    DI를 통해 framework의 자유로운 사용이 가능하다

    - 그냥 나만의 언어로 표현한 것

>이번에 학습하게 될 Srping data JDBC는 이런 jdbc api를 쉽게 사용하게 해주는 기술이다.

그러니,

JDBC api를 구체적으로 파고들어갈 당위성은 당장은 없지만, 어떤 흐름인지는 알면 좋겠다.

    1) JDBC API
    2) JDBC 드라이버
        데이터베이스와의 통신을 담당하는 인터페이스
        해당 벤더사에 맞는 jdbc 드라이버가 구현되어 제공될 것
    3) 데이터베이스

2)의 JDBC드라이버는 ***데이터베이스와의 통신을 담당한다고*** 했다.

그 통신 과정을 구체화해보면

    1) connection객체 생성  -  데이터베이스와의 연결 세션
    2) statement객체 생성  -  그 안에서 sql query문 작성
    3) resultset객체로부터 데이터 조회  -  query에 따른 결과
    4) 역순으로 close

이때 connection객체 생성은 비용이 많이 드는 작업이기 때문에, 애플리케이션 로딩 시점에 미리 생성하여 연결이 필요할때마다 제공한다.

    연결이 필요하네?? connection객체 만들어 -> x
    연결이 필요하네?? connection객체 있나요?? -> o

이렇게 connection을 제공하고 반환받는 일련의 과정을 담당하는 것을 connection pool이라고 한다.

---

### 1. Spring Data JDBC

> ORM - Object-Relational-Mapping

Spring Data JDBC는 ORM기술이며, ORM기술은 query를 코드상에서 직접적으로 작성하는 기술이 아닌, ***객체를 통해 데이터베이스에 접근*** 하는 기술이다.

객체는 내부적으로 SQL 쿼리문으로 자동 변환된다.

그리고

이 기술을 사용하기 위해서는 다음의 의존 라이브러리를 추가한다.

    implementation 'org.springframework.boot:spring-boot-starter-data-jdbc'

---

### 2. 데이터 액세스 계층 구현

우리가 동물의 정보를 담는 entity를 만들었다고 해보자. (컨트롤러와 Dto는 있다고 가정)

-Entity
```java

@Data
public class Animal{

    @Id // 식별자로 사용 -> 기본키
    private Long animalId;
    private String species;
    private String name;
}
```

-Service
```java

@Service
public class AnimalService{

    public Animal creatAnimal(Animal animal){

        return animal;
    }
}
```

그러면 Repository를 만들어보자!

```java
1)
public interface AnimalRepository extends CrudRepository<Animal, Long>{

    2)
    Optional<Animal> findByName(String name);
}

```

일단 1번에서 볼 수 있듯 repository는 class가 아닌 repository이다.

또한

CrudRepository를 상속함으로써, CrueRepository에의 save, findById등의 기본 메서드들을 사용할 수 있게 된다.

그리고

2번을 보면 찾은 Animal을 Optional로 감쌌다. 이렇게 함으로써 null(찾지 못함)이 발생했을 경우에도 nullpointerException없이 진행이 가능하다.

또한

메서드는 query처럼 작성해도 알아서 알아듣게 되는데, findBy~~ ->  By 다음에 기준이 되는 field의 이름을 적어주도록 하자.

---

### 3. 연동

이제 Service 계층으로 가서 연동을 해보자.

```java

@Service
public class AnimalService{

    1)
    private final AnimalRepository animalRepository;

    public AnimalService(AnimalRepository animalRepository){
        this.animalRepository = animalRepository
    }

    2)
    public Animal creatAnimal(Animal animal){
        
        verifyExist(animal.getName());

        return animalRepository.save(animal);
    }

    3)
    public void verifyExist(String name){
        Optional<Animal> animal = animalRepository.findByName(name);

        if(animal.isPresent())
            throw new BusinessLogicException(ExceptionCode.ANIMAL_EXISTS);
    }
}
```

1번을 보면 Controller에서 Service를 DI받았듯, respository의 기능을 이용하기 위해 animalRepository를 DI 받는다.

2번을 보면 갑자기 뜬금없이 verifyExist() 메서드가 보인다. 이것은 3번에서 설명하도록 하겠다.
그리고
반환값으로 animalRepository.save(animal) -> crudrepository를 상속받은 animalrepository의 메서드를 호출한다.

3번은 service계층에서 이용하기 위해 따로 작성한 메서드로, 논리적인 생각이 뒤따라야 이해하기 편하다
일단 가정을 곰곰히 생각해보고 가자 -> '동물의 이름은 중복 될 수 없다'
웃기긴 하지만 저렇게 가정을 했다고 해보자
그리고 클라이언트로부터 ***이미 있는 이름***의 동물을 등록하려고 한다면 가정과 모순되는 상황이 발생한다.
따라서 repository에서 이름으로 동물을 찾아와서
이미 데이터베이스에 존재하는지 확인하는 메서드이다.

또한

Optional로 반환받은 값을 그대로 Optional에 담아 받았기 때문에 해당 데이터가 null인지 아닌지 여부에 따른 코드 구성을 손쉽게 할 수 있다.

---

### 3. 테이블 간의 관계 매핑

도메인과 애그리거트라는 개념이 있다.
    
    도메인 - 현실이 한 업무 영역
    애그리커트 - 관련 도메인들의 집합
        애그리거트 루트 - 대표 도메인

그리고 이 두가지 개념이 연관관계 매핑의 기준이 된다.

    1. 모든 접근은 애그리거트 루트를 통해서 이루어진다.

    2. 같은 애그리거트 안에서는 엔티티간 객체로 참조한다

    3. 애그래거트 루트 대 애그리거트 루트 간에는
        애그리거트 루트 간의 참조는 객체 참조 대신에 ID로 참조한다.
        1대1과 1대N 관계일 때는 테이블 간의 외래키 방식과 동일하다.
        N대N 관계일 때는 외래키 방식인 ID 참조와 객체 참조 방식이 함께 사용된다.    


방법론을 한번에 정리해보면

```java

// 1. 1:N - 애그리거트 루트 간
    // 1 . 기본키가 될 멤버에
    @Id
    private Long ooId;

    // N . AggregateReference가 외래키 역할
    private AggregateReference<테이블이름, @Id가 붙은 멤버의 타입> ooId;
    // 

// 2. N:N
    // 1:N , N:1로 만들어 준다.
    // 동일 애그리커트 안의 1:N
        //1. MappedCollection으로 객체참조
        @MappedCollection(idColumn = "OO_ID") // <- 테이블에 해당하는 column의 이름
        private set<N해당 클래스> ooo = new LinkedHashSet<>();
        
        //N. 그냥 다른 애그리커트의 1에 해당하는 엔티티의 id를 추가
        pirvate Long coffeeId;

```

정리가 참 힘들다. 그래도 다시 해보면

**같은 애그리거트면** 객체참조(1에 list나 set으로 객체참조)하고

**다른 애그리거트 루트끼리** 1:1 혹은 1:N이면 외래키 참조(AggregateReference) 한다.