---
layout: single
title:  "Section 1 HTML, CSS"

categories:
    - 코드스테이츠

tags:
    - HTML/CSS
   
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"
---
[week2]
## 간단정리

- HTML은 마크업 언어이다
    - 마크업 언어는 태그를 이용하여 구조를 명기한다.
    - 구조를 설계한다.
- CSS
    - 설계한 구조에 도색을 해준다.
    - ID와 CLASS 지정을 통해 컨트롤한다.

<br>

## 느낀점

- 프론트엔드 부분이지만 협업을 위해 알아두는 정도로는 뒤쳐지지 않고 쫒아갈 수 있겠다.
- 블로그 정리는 나만의 사전을 만드는 것이자 배운것을 체화하기 위한 활동.
    - 게을러지지 말자
    
<br>

## 스스로 답해보기 (사전질문)

- HTML이란?
    - 약자의 의미
    - 요소
    - (배우면서 추가할것)
- CSS란?
    - (배우면서 추가할것)
    
<br>

## 정리

HTML - structure / CSS - presentation / Java script - interaction


### 1. HTML - HyperText Markup Language
    HyperText 
        -  문서를 뛰어넘은 문서 / 링크로 연결된 문서

    구조를 표현하는 언어 
        - 웹페이지의 틀을 만든다.

    마크업 언어 
        - 태그 등을 이용하여 문서나 데이터의 구조를 명기한다
            - 태그 - <> 부등호로 묶인 기본 구성요소
            - 태그 속성 콘텐츠 / attribute name , attribute value

##### a. 생각해보기 

1. ``` <div> <span> <img> <a> <ul>&<li> <input> <textarea> <button> ```
2. multi-line text input / input(text,radio,checkbox) / Unordered list & List Item / Link

##### b. 태그에 대해 알아보자
    div
        - 한 줄을 차지한다. ←→ span - 컨텐츠 크기만큼 공간을 차지한다

    img
        - img src = http~~~ → src (key) (value) / 닫는 태그는 필요 없다.
        - src는 source인 것 같다

    a
        - a href=”#“>어디< , target_blank → 새 창에서 열어줌
        - a - anchor = “닻”이라는 뜻

    p
        - paragraph 문단
            - HTML에서 문단은 이미지나 입력 폼 등 관련있는 콘텐츠 무엇이나 가능하다.

    시맨틱 요소
        - div와 기능적으로 같다. 다만 영역을 나눌때 의미를 더하여 구분을 쉽게 한다.
        - section - 독립적인 영역이나, 딱히 의미를 부여하기 애매할때
        - nav - 메뉴, 목차, 색인 / 현재 or 다른 페이지로의 링크를 보여줌
        - header - 소개 영역
        - main - body의 주요 콘텐츠
        - article - 사이트 안에서 독립적으로 구분해 배포하거나 재사용 할 수 있는 구획
        - aside - 사이드바, 콜아웃 박스 / 문서의 주요 내용과 간접적으로 연결됨.

    radio button vs checkbox
        - 버튼은 하나만, 체크박스는 여러개
        - 라디오 박스 그룹 설정 … name = “~~” 로 묶어준다.

    link - html파일과 다른 파일 연결
        - ex) <link rel = “stylesheet” href=”index.css” />
        - rel 속성 연결하고자 하는 파일의 역할이나 특징
        - href속성 - 파일의 위치를 추가 (다른 폴더에 있다면)

    <script src=”my-java-script.js”></script> - 자바 스크립트 실행



<br>


### 2. 관심사 분리 
---
html에 css를 직접 작성 할 수도 있지만 한곳은 구조만 한곳은 디자인만

인라인 스타일, 내부 스타일, 외부 스타일


<br>



### 3. CSS - Cascading style sheets
---

    - Casacading - 쏟아져 내리는 → 트리구조 → 부모와 자식
    - command line interface를 몰라도 이용할수있도록
        - UI → UX 사용자 경험
    - CSS - 스타일링 도구 - 반드시 HTML이 있어야 동작


[예시 - 주석 달아보기]

```css
body {                         // body 영역의 스타일을 설정한다.
  margin: 0;                   // margin - border 밖 여백 
  padding: 0;                  // padding - border와 content 사이 여백
  background: #fff;
  color: #4a4a4a;              // color 글자 색 - HEX rgb
}
header, footer {               // header와 footer 영역의 스타일을 설정한다
  font-size: large;
  text-align: center;
  padding: 0.3em 0;            
  background-color: #4a4a4a;   // background-color - 배경의 색상
  color: #f9f9f9;
}
nav {                          // nav 영역의 스타일을 설정한다.
  background: #eee;            // background 글자 배경의 색상
}
main {                         // main 영역의 스타일을 설정한다.
  background: #f9f9f9;        
}
aside {                        // aside 영역의 스타일을 설정한다.
  background: #eee;
}
                               // [글꼴 크기]
                                  - 절대 단위: px, pt 등
                                  - 상대 단위: %, em, rem, ch, vw, vh 등
```

#### a. 셀렉터에 대해 알아보자

    - id
        - 문서에 단 하나의 요소에만 적용하는 **유일한 이름**
        - <h4 id=”starting point”>~~~</h4> 라 한다면 starting point는 단 하나
        - css에서 #starting point 로 불러온다.
    - class
        - 여러 요소에 하나의 이름 중복 지정 가능 & 한 요소에 여러 클래스 이름 지정 가능(띄어쓰기로)
        - <h4 class=”looking-area”>~~~</h4>, h5에도 looking area 지정 가능
        - css에서 .looking-area로 불러온다.
        - 만약 looking area 로 - 없이 띄어 썼다면 이것은 looking과 area 클래스 두개 지정한 것이 된다.
            
            → id와 class를 동시에 지정한 것이 있다면?
            
            = id만 부르거나 혹은 .class의 이름#id의 이름 혹은#id의 이름.class의 이름
            
    - *
        - 전체를 고른다. / 전체라 함은 모든 부모와 자식을 뜻한다. 전체라고 body하나로 착각하지 말자
    - tag 셀렉터
        - 태그 이름을 부르면 된다.
    - attribute(속성) 셀렉터
        - a[href] { }
        p[id="only"] { }
        p[class~="out"] { }
        p[class|="out"] { }
        section[id^="sect"] { }
        div[class$="2"] { }
        div[class*="w"] { }
        - 이건 공부좀 해보자. 일단 태그로 나누어진 영역 안의 한 속성에 대해 스타일 지정을 하는 것 같다.
    - 후손 셀렉터
        - header h1 {}  → 헤더 안의 h1 태그
        - 후손이기에 들여쓰기에 상관 없이 모든 후손들이 다 골라진다.
            - header, h1 {} 와 같이 ,로 고른경우는 다중으로 선택한 경우
            - 후손과의 차이점은 후손은 header는 안골라지지만 이 경우는 header도 골라짐
    - 자식 셀렉터
        - header > p → 헤더 직계후손
        - 후손과 다른점은 바로 밑 자식만 고른다.
    - 인접 형제 셀렉터
        - section + p
        - (나중에 코드를 추가할것) section과 같은 레벨의 인접한 p
    - 형제 셀렉터
        - section ~ p
        - 섹션과 같읜 레벨의 모든 p
    - p:first-child , last child etc..
        - 이건 보고 해석해면 된다.

    **박스에 대해 알아보자**

    - margin - border - padding - content 순
        - margin
            - 한개 설정 - 상하좌우 / 네개 설정 - 순서대로 상하좌우 / 두개 설정 - 순서대로 위 아래
            - 각각 margin-top right bottom left 설정 가능
        - border
            - border-width, border-style, boder-color
            - 각각 지정하거나 혹은 border: 1px solid red; 이런 식으로
            - 심미적 기능 뿐만 아니라 영역 지정 시에
        - padding
            - border와 content 사이의 여백
        - content
    - 박스 크기보다 콘텐츠가 크다면 overflow를 이용하여 스크롤 생성
        - overflow: auto;
        - overflow-x, overflow-y : x축 y축 스크롤
    - box-sizing: border-box

