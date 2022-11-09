---
layout: single
title:  "[프로젝트] @RequiredArgsConstructor"

categories:
    - 프로젝트

tags:
     
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---
## 이 글에 담긴 것
- @RequiredArgsConstructor

## 정리

코드 작성 중 팀원 분이 생성자를 제거하고 @RequiredArgsConstructor 애너테이션을 추가하는 것을 보았다.

그 전에는 이렇게 작성했었다.

```java
    public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MemberService memberService;
    private final TagRepository tagRepository;

    public QuestionService(QuestionRepository questionRepository, MemberService memberService, TagRepository tagRepository) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
        this.tagRepository = tagRepository;
    }
    .
    .
    .
}
```

하지만 이 애너테이션을 이용하면 이렇게 변한다.

```java
    @RequiredArgsConstructor
    public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MemberService memberService;
    private final TagRepository tagRepository;
    .
    .
    .
}
```

## 추가

스프링의 생성자 주입에는 3가지 방법이 있다.

    필드 주입
    setter 주입
    생성자 주입

스프링은 공식적으로는 생성자 주입을 추천하는데 그 이유는 '불변성'때문이다.

위 코드들도 보면 필드에 private final로 선언한 것을 볼 수 있다. 

이는 한 번 주입되는 의존성 객체는 내부가 더 이상 바뀔 이유가 없다는 것을 알려주는 정보이기도 하다.

이 점에서 @RequiredArgsConstructor의 주의점이 있다.

필드에 'final' 즉 불변객체라는 것을 명시해주어야 한다.
