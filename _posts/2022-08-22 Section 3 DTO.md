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
[week9]
## 간단정리

<br> 

## 느낀점


<br>

## 스스로 답해보기

<br>

## 정리
DTO는 왜 사용할까??
현재 리소스의 개별 데이터들의 개수가 적기 때문에, 바인딩을 하는데에 있어 @Requestparam을 이용해도 커버가 가능하다.
하지만 리소스에 포함되는 데이터의 개수들이 많아진다묜?? 코드가 복잡해지고 이는 즉 유지보수의 어려움으로 직결될 것이다.

따라서 DTO로 받아서 해결하자

Data Transfer Object