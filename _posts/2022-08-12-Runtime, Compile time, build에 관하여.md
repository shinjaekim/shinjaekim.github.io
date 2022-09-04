---
layout: single
title:  "[개인] Run time, Compile time, Build에 관하여"

categories:
    - 개인탐구

tags:
    - Java
       
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---

## 이 글에 담긴 것
- 런타임, 컴파일타임, 빌드를 구분하자

## 공부하던 부분
- 자바 복습

## 의문점
1. 저 세가지 완벽하게 구분을 할 줄 알아?

## 정리

학습을 진행하면 할 수록 기초가 부족하다는 생각이 너무 많이 든다. 그렇다고 한가지 한가지 모든 것들을 처음부터 차곡차곡 주춧돌 쌓아 나의 지식의 체계를 건설하자니 시간이 오래 걸린다.(원래는 이런식의 공부를 좋아해서 지금 더 힘들다.) 

하지만 코딩 공부는 그런식으로는 할 수 없는 것 같다. 내가 목표로 하는 효율적인 웹 서버를 만드는 것, 그것은 결국 하이퍼링크로 문서들을 뛰어넘는 그런 일종의 데이터들을 위한 것이듯 나의 공부도 그런 식이 되어야 하는 것 같다.

무튼 더 나아가려 하는데 초장부터 내가 확실히 구분하지 못하는 단어들, 정의들이 나온다는 것은 썩 유쾌한 일은 아니다. 그래서 나올때마다 바로바로 정리해서 머릿속에 넣기로 했다. 하이퍼링크를 뛰어넘어 다니듯..

## 결론

기초 원리부터 따닥따닥 따져가면서 볼 필요도 없을 것 같다. 위키선생님께 여쭤본 결과 다음과 같이 명료하게 정리가 된다.

> 런타임 - 사용자에 의해 프로그램이 실행되는 동안

> 컴파일 타임 - 고급언어인 프로그래밍 언어를 컴퓨터가 이해 할 수 있는 기계어로 변환하는 동안

그렇게 되면 런타임오류와 컴파일타임 오류의 구분도 이해가 된다.

만약 내가 계산기 프로그램을 만들었는데 나눗셈의 경우 '0으로 나누는 경우'를 생각하지 못했다면?? 문법적인 오류는 없으니까 컴파일되고, 사용자에 의해 실행될 것이다. 그리고 사용자에 의해 실행되었을때 0으로 나누면 에러가 발생할 것이다. 이 경우가 런타임 에러가 된다.

하지만 내가 int형 변수를 선언해야 하는데 inf라고 썼다든가, 혹은 if()의 괄호 안에 조건을 채워넣지 않는 등의 syntax으로가 나게 된다면 이는 컴파일 과정에서 오류를 발생시킬 것이다. 이것이 컴파일 오류가 된다.

그렇다면 build는 무엇??     
스택오버플로우에서 친절한 답변을 찾아왔다.

"
The "Build" is a process that covers all the steps required to create a "deliverable" of your software. In the Java world, this typically includes:

1.Generating sources (sometimes).
2.Compiling sources.
3.Compiling test sources.
4.Executing tests (unit tests, integration tests, etc).
5.Packaging (into jar, war, ejb-jar, ear).
6.Running health checks (static analyzers like Checkstyle, Findbugs, PMD, test coverage, etc).
7.Generating reports.

So as you can see, compiling is only a (small) part of the build (and the best practice is to fully automate all the steps with tools like Maven or Ant and to run the build continuously which is known as Continuous Integration).
"

컴파일(프로그래밍언어->기계어 변환)은 빌드의 한 과정일 뿐이다.