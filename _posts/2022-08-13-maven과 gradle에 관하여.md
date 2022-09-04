---
layout: single
title:  "[개인] maven과 gradle에 관하여"

categories:
    - 개인탐구

tags:
    - Java
       
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---

## 이 글에 담긴 것
- maven과 gradle을 이해하는 것 (파고들어서 분석하고 그런 것은 아니니 그런 것을 원한다면 돌아가세요)

## 공부하던 부분
- 자바 복습

## 의문점
1. 내 머리속의 개념들의 모호함을 구체화해야 하지 않겠는가??

## 정리
어제 정리한 runtime, compiletime, build와 같이 맨날 궁금해 해놓고 구체화 하지 않은 지식 중 하나이다. 마치 맨날 경제 뉴스를 보면서

    아 이제는 경제용어를 좀 공부해서 활용해봐야지

하면서도 미루고만 있었던 과거의 경영학을 배우던 나와 과거의 나에게 탓을 돌리고 있는 현재의 내가 그래왔듯이

maven과 gradle은 왜 존재하는 것일까??

### 중간답
일단 찾아보니 생각보다 금방 명료해졌다. build란 무엇인가 정리할때 스택오버플로우에서 다음과 같은 답변을 봤었다.

빌드란

1.Generating sources (sometimes).
2.Compiling sources.
3.Compiling test sources.
4.Executing tests (unit tests, integration tests, etc).
5.Packaging (into jar, war, ejb-jar, ear).
6.Running health checks (static analyzers like Checkstyle, Findbugs, PMD, test coverage, etc).
7.Generating reports.

이와 같은 과정이고, 컴파일은 빌드에 속하는 부분이라고..

maven과 gradle은 위 순서들을 자동으로. 즉, 개발자가 일일이 하지 않아도 되도록 해주는 ***빌드관리도구***이다.

그렇다면 생각보다 답이 금방 나온 김에... maven과 gradle을 조금만 더 파보도록 하자

![이분꺼 보고 같이 공부하시죠](https://dev-coco.tistory.com/65)

나도 추후에 다시 돌아와서 채워보도록 해야겠다.(20220813)
