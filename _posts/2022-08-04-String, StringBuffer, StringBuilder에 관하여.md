---
layout : single
title : "String 형제들에 관하여 (Builder, Buffer)"

categories : 개인탐구

tags : 
        - Java

toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"
---
## 이 글에 담긴 것
- String을 정복하고자 하는 마음

## 공부하던 부분
- 모든 코딩문제

## 의문점
1. 도대체 나는 언제까지 String 관련 메서드들을 찾아볼 것인가??
2. 이제는 좀 builder buffer 개념을 명확히 할 때가 되지 않았나..

## 정리

String은 한번 생성되면 할당된 공간이 변화하지 않는다.

하지만 

StringBuilder와 StringBuffer의 경우는 할당된 공간의 가변적이다.

그렇다면 왜 굳이 StringBuilder와 StringBuffer를 구분할까??

그 차이는 멀티쓰레드 환경에서의 동기화 지원여부에 있다. Builder는 단일쓰레드 환경에 맞게 설계되어 있다.

## 설명
지금까지 String에서 문자열을 합할때는 + 를 이용했다. 그리고 그냥 더해지겠거니 생각을 했는데...

이런 로직에 의해 더해지는 거였다.

    만약 kim, shinjae로 kimshinjae를 만들고싶다면
    String은 할당된 공간이 변하지 않기때문에
    kim과 shinjae를 합해서 저장하는 새로운 공간을 할당하는 것이었다.

하지만 builder와 buffer는 초기에 buffer크기를 설정하고 할당된 공간을 가변적으로 이용한다.

## String method (자주 쓸만한)

```java
String str = new String("실험용 선언하고 갈게요.");
```

    str.split("regex")
        regex로 나누어 '배열'로 반환

    str.contains("찾고싶은거")
        존재 여부를 '논리형'으로 반환

    str.substring(from) or (from, to)   
        부분 문자열 반환
    
    str.equals("문자열")
        문자열과 같은지 여부를 '논리형'으로 반환

    str.replace("old","new")
        헌것을 새것으로 바꿈

    str.toLowerCase()
        소문자로

    str.toUpperCase()
        대문자로

    str.trim()
        '양쪽의 공백' 제거

    str.valueOf(여러 타입의 값들)
        문자열로 변환한다.
        이거는 래퍼클래스에서도 사용됨
            ex) Integer.valueOf()

    str.length()
        문자열 길이 반환
        배열의 길이랑 착각 X

    str.isEmpty()
        0인지 아닌지를 구별하여 '논리형'반환

    str.indexOf(문자)
        문자의 인덱스를 반환한다. 없으면 -1

    str.concat("string")
        문자열 합치기/

<br>

## StringBuilder, StringBuffer (자주 쓸만한)

```java
String str = new String("실험용 선언하고 갈게요.");
StringBuilder strbi = new StringBuilder(str);
or
StringBuffer strbu = new StringBuffer(str);
```
*String과 같은 메서드는 *표시*

    메서드는 같아서 strbu로 가보자

    strbu.toString()
        문자열로 변환 (String으로 변환)

    * strbu.substring(from) or (from, to)
        부분 문자열 반환

    strbu.insert(index, string)
        인덱스에 문자열 추가

    strbu.delete(from, to)
        from ~ to 문자열 삭제

    strbu.append("String")
        문자열 붙이기

    strbu.capacity()
        문자열 크기 구하기

    strbu.reverse()
        문자열 뒤집기

    * strbu.length()
        문자열 길이