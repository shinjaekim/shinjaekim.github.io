---
layout: single
title:  "Section 1 Layout, Wireframe"

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

- 페이지 레이아웃은 좋은 UI와 UX를 위한 기초
- 분할되는 순서를 잘 기억하자
    - 종이 가로 세로 번갈아 접기
- Flexbox는 앞으로 백엔드로서 효율적인 코드를 짜는 습관을 들이기 위한 생각을 하게 해주었다.

<br>

## 느낀점

- Flexbox는 앞으로 백엔드로서 효율적인 코드를 짜는 습관을 들이기 위한 생각을 하게 해주었다.
    - 부모에게 명령하여 자식을 컨트롤한다 → 코드의 줄수를 줄일 수 있겠다.
- 피곤함을 잘 컨트롤 해야겠다.

<br>

## 스스로 답해보기 (사전질문)

- 페이지 레이아웃은 무엇을 뜻하는가?
    - 이전 강의와 이어지는 부분
    - 기능
    - Flexbox
    - (배우면서 추가할것)
- 웹 화면 설계를 설명한다면 어떻게 해볼까?
    - 와이어프레임
    - 목업
    - (배우면서 추가할것)
    
<br>

## 정리


### 1. 페이지 레이아웃

    레이아웃 - 성격과 목적에 맞게 콘텐츠를 배치한다.
    수직분할과 수평분할을 차례대로 적용한다.
        - 수직분할 - 콘텐츠는 가로로
        - 수평분할 - 콘텐츠는 세로로


#### a. 레이아웃 리셋

레이아웃은 리셋하고 진행하자 - 아래는 리셋코드

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
```

#### b. Flexbox

    부모에게 말을 걸어 자식을 조종한다.
        - 이게 왜 유용하냐. 여러번 설정할거 한번하면 되기 때문이다.

    Flexbox 부모 편
        - 부모 요소에게 display : flex;
        - 원리 : 1. 축을 정하고 2. 정렬을 한다. → *결국 정렬을 위한 것*
            - flex-direction
                - 정렬 축을 정한다
                - row(기본값 -가로) / column(세로) / row-reverse / column-reverse
            - flex-wrap
                - 하위 요소가 상위 요소의 크기를 넘을시 자동 줄바꿈
                - nowrap (기본값) / wrap / wrap-reverse → *어떤 모양일지 머릿속으로 그려보자*
            - justify-content
                - 축과 수평한 방향으로 정렬하겠다. → *축과 수평함을 명심하자.*
                - flex-start / flex-end / center / space-between / space-around
            - align-items
                - 축과 수직한 방향으로 정렬하겠다. → *축과 수직임을 명심하자*
                - stretch / flex-start / flex-end / center / baseline

    Flexbox 자식 편
        - 자식요소를 컨트롤 해서 공간을 조정한다. *→ 차지하는 공간과 관련된 것*
        - 원리 : 1. 팽창과 수축과 기본 크기를 관리한다.
            - flex : grow shrink basis
            - flex : 0 1 auto → 기본값
                - 각자 지정도 가능 ex) flex-grow / flex-shrink / flex basis
            - grow
                - 0의 의미 : 욕심을 버리고 빈공간을 차지하지 않겠다.
                - 1의 의미 : 1로 지정되는 순간 욕심쟁이다. 빈공간 차지한다.
                - 1이 여럿 : 타협해서 빈 공간을 n등분 해간다.
                - 0과 1로만 결정되는 것이 아니라 숫자들을 이용하여 비율로 사용 가능
            - shrink
                - grow와 동시사용 비추, 웬만하면 grow를 건드리자
                    - 실제 크기를 예측하기 힘들기 때문이다.
            - basis
                - flex-grow 속성이 0인 경우에만 basis의 속성 값 유지
                - width와 동시 적용시 basis가 이긴다.

참고) Atomic CSS 방법론 - 클래스이름과 구현의 1:1 매치

---


### 2. 웹 앱 화면을 설계해보자

- 와이어프레임을 그려보자
- 여기에 div, section 또는 시맨틱 태그를 이용해서 설계해보자
- id와 class 또한 이용해보자
- 와이어프레임
- 목업 - 기능 뺀 모형


![스크린샷 2022-06-28 16.32.35.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c91e7f1c-7860-4804-b899-9a6f89fcb443/스크린샷_2022-06-28_16.32.35.png)

                                                                             [참고 그림]

운동)팔