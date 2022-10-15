---
layout: single
title:  "Section 3 Spring - Jpa"

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
- spring data jdbc는 단방향, spring data jpa는 양방향
- 다대일을 먼저 매핑하고 일대다는 필요할때 매핑하자
- @Entity와 @Id는 꼭 붙이자.

<br> 

## 느낀점
JDBC를 보고 JPA를 보니, 솔직히 spring data jpa가 더 어렵다고 자료에 적혀있긴 했지만, 쌩초보 입장에서는 뭐가 어려운건지는 분간이 안된다. 아무래도 더 깊게 사용하지 않아서 그런거겠지.. 

<br>

## 스스로 답해보기
- jdbc api와 jpa api
- spring data JDBC 와 spring data JPA

<br>

## 정리 - 들어가며

jdbc가 코드수준에서 데이터베이스를 사용할 수 있게 해주는 표준 사양이었다면

> JPA는 ORM 기술의 표준 사양이다.

즉 구현체는 따로 있는데 그것이 ***Hibernate ORM***이다

    JPA
    Hibernate ORM
    JDBC API

이렇게 보면 되겠다.

JPA를 풀어쓰면 Java Persistence API가 되는데,

JPA를 이용하여 데이터베이스에 접근하게 되는 것은

1) 영속성 컨텍스트의 1차캐시에 엔티티를 저장한다
2) 데이터베이스에 반영한다.

의 순서가 되겠다.

이 기술을 사용하기 위해서는 다음의 의존 라이브러리를 추가한다.

    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'

또한 다음의 설정을 application.yml에 추가하자
```java
//application.yml

jpa:
    hibernate:
      ddl-auto: create  # (1) 스키마 자동 생성
    show-sql: true      # (2) SQL 쿼리 출력

```

### 1. 연간관계 매핑

spring data JDBC를 떠올리고 넘어가보자.

1. 테이블과 엔티티를 매핑 할 때
    - 기본기카 될 멤버에 @Id
    - table의 이름이 entity와 다르다면 클래스 레벨에 @table("이름")

2. 엔티티간의 연관관계를 매핑 할 때

애그리거트를 기준으로 세가지의 규칙이 있었다.

    1) 도메인은 애그리거트의 루트로 접근한다.
    2) 동일 애그리거트는 객체로 접근한다.
    3) 애그리거트 루트간에는
        
        1:1 , 1:N 은 외래키로 참조한다
            AggregateReference<>
        
        N:N은 두가지 다 쓴다.
            1:N , N:1 의 관계를 만들어주는 객체를 만들고,
            같은 애그리거트 안에서는 객체 참조
            다른 애그리거트는 N에 1의 id값을 멤버로 넣어준다.

그리고 이 기준들은 ***단방향 매핑***이었음을 알아두자.

JPA는 어떻게 다른지 보자. 

1. 테이블과 엔티티를 매핑 할 때
    - 클래스 레벨에 @Entity
        (name = " ") 로 변경 가능하다.
    - 기본키에 @Id
        - @Id(strategy = GenerationType.IDENTITY or SEQUENCE or TABLE)
    - 그 외 컬럼을 위한 것
        - @Column - nullabe, updatable, unique등의 애트리뷰트 지정 가능
        - @Enumerated(value = EnumType.STRING)

    - @Table
        (name = " ") 로 변경 가능하다.

2. 엔티티간의 연관관계를 매핑 할 때
    
    1) 1:N
        @OneToMany(mappedBy = "N에 추가한 멤버의 이름")
        1의 멤버에 N을 리스트로 추가하거나  -> 일대다는 잘 사용하지 않음 / 다대일을 하고 필요할때 사용
        @ManyToOne
        @JoinColumn(name = "테이블에 저장될 이름")
        N의 멤버에 1을 객체로 추가한다. -> 우선 사용

    2) N:N
        중간에 1:N, N:1을 만들어주는 클래스를 설계하고,
        1)을 그대로 적용

    3) 1:1
        무엇이 상위도메인인지 파악하자.
    
