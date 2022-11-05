---
layout: single
title:  "[에러] transientvalueexception"

categories:
    - 프로젝트

tags:
     
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---
## 이 글에 담긴 것
- transientvalueexception

## 문제 봉착
- 컴파일 완료 후 postman으로 vote테이블에 데이터를 저장하고자 하는데 오류를 마주함

## 해결

> 연관관계가 있는 테이블에 Cascade옵션을 걸어주었다.

## 배경

현재 StackOverflow를 클론한 간단한 게시판 기능을 만들고 있는데,

기능을 구현하기 위해 필요한 Question과 Tag 도메인은 이러한 연관관계가 있다.

    Question - N : N - Tag

Question은 여러개의 태크를 가질 수 있고, Tag는 여러개의 질문에 속할 수 있다.

Jpa에서는 이러한 다대다 연관관계를 1:N, N:1로 풀어주게 되어

결국 세가지의 엔티티를 만들게 되었다.

    Question - 질문
    QuestionTag - 질문에 속한 태그
    Tag - 태크

위의 연관관계를 코드상으로 구현하면 다음과 같다.

Question

```java
.
.
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<QuestionTag> questionTags = new ArrayList<>();
.
.
```

QuestionTag
```java
.
.
@   ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    //사용된 태그가 속한 태그분류
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "TAG_ID")
    private Tag tag;
.
.
```

Tag
```java
.
.
    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    private List<QuestionTag> questionTags = new ArrayList<>();
.
.
```

## 정리

저 세가지 엔티티의 논리는 이러하다.

    질문(Question)에 태그(QuestionTag)를 추가해서 등록하면
        해당 태그(Tag)가 이미 존재 할 경우 새로운 Tag의 사용횟수 증가
        아닐 경우 새로운 태그 생성

즉, 질문 하나만 등록되어도 QuestionTag와 Tag 테이블에 연쇄적인 변화가 필요하다.

하지만 나는 QuestionRepository만 이용한다.

이러한 이유로 '엔티티간의 연관관계는 설정하였지만', '영속성 컨텍스트에는 Question만 올라간다'

그래서 Cascade를 사용해주는 것이다.

> 엔티티의 연관관계 설정만이 능사는 아니다.
            