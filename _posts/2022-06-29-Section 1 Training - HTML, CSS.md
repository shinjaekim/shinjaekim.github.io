---
layout: single
title:  "Section 1 Training - HTML, CSS"

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

- 코드 샌드박스를 이용한 트위터 페이지 만들어보기
    - 코드스테이츠에서 제공한 js코드 기반으로 html과 css코드를 직접 짜보았다.

<br>

## 느낀점

- 머릿속으로 가상의 레이아웃을 그려보는 습관을 들이면 코드만 추가하면 구현되는구나
- 꾸준한 복기와 성실함만이 실력을 키울 수 있겠다.
- 깃허브 블로그 작성 연습해보자
- 스스로 공부하자. 더더욱 찾아서
- 시맨틱 태그를 썼다면 더 깔끔했을 것
- 자랑타임 보니까… 다들 정말 열심히 하는구나..

<br>

## 정리

### 1. HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>twittler</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
  </head>
  <body>
    <div id="greeting">트위터
      <span id="greeting2" >10월9일한글날</span>
    </div>

    <div id="inputfactor"> 
      <div>
          <div class="inputname"> 식별이름 </div>
          <input type="Text" style="WIDTH: 100pt; HEIGHT: 20pt"id="usernameInput" class="inputbox"/>
          <div class="inputname"> 내용 </div>
          <input type="text"  style="WIDTH: 400pt; HEIGHT: 30pt" id="messageInput" class="inputbox"/>
          <div></div>
          <input type="button" style="WIDTH: 60pt; HEIGHT: 30pt" value="전송" id="tweetButton" class="inputbox"/>
      </div>
      <div>
        <img src = "https://cdn-icons-png.flaticon.com/512/4498/4498498.png" width="200"/>
      </div>
      <div></div>
    </div>

    <div id = "randomfactor">
      <input type ="button" style="WIDTH: 60pt; HEIGHT: 30pt" value="불러오기" id="randomButton"></input>
    </div>

    <!-- Tweet lists -->
    <section id="tweetlist" class="white">
      <div> - 글목록 - </div>
    </section>

    <script src="script.js"></script>
  </body>
</html>
```

#### a. 추가 - 내가 구글링으로 찾아본것

- input type =”” value=””
    - type에 지정한 것이 박스라면 value에 들어간 내용이 박스안에 들어간다.
- placeholder를 추가하면 박스칸에 입력할 내용의 힌트를 희미한 글씨체로 넣을 수 있다.
- 인라인 스타일로 html에서 style을 추가하여 width, height, font-size를 조정가능
    - css로 넘어간다면 input 태그 셀렉터 이용 → 관심사 분리를 위해 더 바람직
- span태그는 인라인 태그이지만 width를 줄 수 있다.
    - style="display:inline-block”
- border는 사방, 상 하 좌 우 각각 테두리 지정 가능
- img는 상대주소와 절대주소로 입력 가능

### 2. CSS

```css
#greeting {
  font-size: 20px;
  font-family: 궁서체;
  font-weight: bold;
  border: 2px solid #ccc;
  border-radius: 1em;
  color: black;
  background-color: #eee;
  text-shadow: 0 0 5px #333;
  text-align: center;
  margin: 0.5em;
  padding: 0.5em;
}
#greeting > span{
  font-size: 10px;
}
#inputfactor {
  background: rgb(33, 158, 207); 
  margin: 10px;
  padding: 25px;
  border-radius: 20px;
  display : flex;
  justify-content: space-between;
}
.inputname{
  font-family: 궁서체;
  font-size: 20px;
  margin: 5px 5px 10px 5px;
  color: white;
}
.inputbox{
  font-family: 궁서체;
  margin : 5px 5px 10px 5px;
  border-radius: 10px;
}
#randomfactor{
  margin: 10px;
  padding: 10px 10px 10px 25PX;
  border-radius: 20px;
  background: #d3d3d3;
}
#randomButton{
  font-family: 궁서체;
  margin : 5px 5px 5px 5px;
  border-radius: 10px;
}
#tweetlist{
  margin: 10px;
  padding: 20PX;
  border-radius: 20px;
  background : gray;
}
.white{
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between;
  padding : 10px 30px 10px 15px;
  font-family : 궁서체;
}
.tweet__username{
  flex : 0 1 auto;
  inline-size: 520px;
}
.tweet__createdAt{
  flex : 0 1 auto;
}
.tweet__message{
  flex : 0 1 100%;
  border-bottom-style: solid;
  border-color: #d3d3d3;
}
*{
  box-sizing : border-box;
}
```

### 3. JS (추후 분석해서 해석 추가하기)

```css
import { DATA, generateNewTweet } from "./data.js";
// DATA는 이미 작성된 트윗을 표시합니다.
console.log(DATA);

Number.prototype.padLeft = function () {
  if (this < 10) {
    return "0" + String(this);
  } else {
    return String(this);
  }
};

Date.prototype.format = function () {
  var yyyy = this.getFullYear();
  var month = (this.getMonth() + 1).padLeft();
  var dd = this.getDate().padLeft();
  var HH = this.getHours().padLeft();
  var mm = this.getMinutes().padLeft();
  var ss = this.getSeconds().padLeft();

  var format = [yyyy, month, dd].join("-") + " " + [HH, mm, ss].join(":");
  return format;
};
// generateNewTweet을 호출할 때마다 새로운 트윗을 생성합니다.
console.log(generateNewTweet());

const state = {
  isFilteredPage: false
};

const usernameInput = document.querySelector("#usernameInput");
const messageInput = document.querySelector("#messageInput");
const tweetButton = document.querySelector("#tweetButton");
const randomButton = document.querySelector("#randomButton");
const mainTweetList = document.querySelector("#tweetlist");

const tweetListReducer = function (ul, tweet, id) {
  const li = document.createElement("li");
  li.classList.add("tweet");
  li.classList.add("white");

  const user = document.createElement("span");
  const createdAt = document.createElement("div");
  const message = document.createElement("div");

  user.classList.add("tweet__username");
  user.textContent = tweet.user;
  user.addEventListener("click", handleClickUser);

  const createdAtContent = document.createElement("span");
  createdAt.classList.add("tweet__createdAt");
  createdAtContent.textContent = tweet.created_at;
  createdAt.append(createdAtContent);

  message.classList.add("tweet__message");
  message.textContent = tweet.message;

  li.append(user, createdAt, message);
  ul.append(li);
  return ul;
};

const renderDATA = function () {
  const ul = document.createElement("ul");
  ul.id = "tweetWrapper";

  const tweets = DATA.reduce(tweetListReducer, ul);

  state.isFilteredPage = false;
  mainTweetList.append(tweets);
};

const renderFilteredDATA = function (targetName) {
  const ul = document.createElement("ul");
  ul.id = "tweetWrapper";

  const tweets = DATA.filter(function (tweet) {
    return tweet.user === targetName;
  }).reduce(tweetListReducer, ul);

  state.isFilteredPage = true;
  mainTweetList.append(tweets);
};

const removeTweet = function () {
  const tweetWrapper = document.querySelector("#tweetWrapper");
  tweetWrapper.remove();
};

const handleClickUser = function (event) {
  const targetName = event.target.textContent;
  alert(`${targetName} 필터링 결과입니다.`);
  removeTweet();
  renderFilteredDATA(targetName);
};

// 버튼을 모두 완성한 후 주석을 제거하시면 트윗리스트를 볼 수 있습니다.
tweetButton.onclick = function () {
  if (usernameInput.value && messageInput.value) {
    const tweetObject = {};
    tweetObject.user = usernameInput.value;
    tweetObject.message = messageInput.value;
    tweetObject.created_at = new Date().format();
    DATA.unshift(tweetObject);
    removeTweet();
    renderDATA();
    usernameInput.value = "";
    messageInput.value = "";
  } else {
    alert("User와 Message를 모두 입력하세요.");
  }
};

randomButton.addEventListener("click", function () {
  const tweetObject = generateNewTweet();
  DATA.unshift(tweetObject);
  removeTweet();
  renderDATA();
});

renderDATA();
```

dada.js (추후 해석 추가하기)

```css
// 트윗리스트를 만들 트윗 데이터를 가지고 있는 코드
export let DATA = [
  {
    user: "ingikim",
    message: "Welcome to Code States #codestates",
    created_at: "2022-04-25 12:30:20"
  },
  {
    user: "satya",
    message: "this is test message #pair #programming",
    created_at: "2022-04-26 18:30:20"
  },
  {
    user: "sundar",
    message: "code now! #work #hard",
    created_at: "2022-04-27 07:30:20"
  },
  {
    user: "steve",
    message: "Stay hungry, and stay foolish",
    created_at: "2022-04-28 12:30:20"
  },
  {
    user: "tim",
    message: "education for real world",
    created_at: "2022-04-29 18:30:20"
  }
];

export let randomUser = ["ingikim", "satya", "sundar", "steve", "tim", "jeff"];
export let randomMessage = [
  "이 헌법공포 당시의 국회의원의 임기는 제1항에 의한 국회의 최초의 집회일 전일까지로 한다. 감사원은 원장을 포함한 5인 이상 11인 이하의 감사위원으로 구성한다.",
  "헌법재판소의 조직과 운영 기타 필요한 사항은 법률로 정한다. 모든 국민은 자기의 행위가 아닌 친족의 행위로 인하여 불이익한 처우를 받지 아니한다.",
  "헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다. 국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다.",
  "모든 국민은 직업선택의 자유를 가진다. 군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. 행정권은 대통령을 수반으로 하는 정부에 속한다.",
  "민주평화통일자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 국가는 농·어민과 중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과 발전을 보장한다.",
  "국회는 국정을 감사하거나 특정한 국정사안에 대하여 조사할 수 있으며, 이에 필요한 서류의 제출 또는 증인의 출석과 증언이나 의견의 진술을 요구할 수 있다.",
  "인간이 얼음에 고행을 따뜻한 가장 이것이다. 꽃이 곧 동력은 끝에 동산에는 그것은 거선의 별과 인생의 것이다. 구하지 착목한는 스며들어 인생의 것이다.",
  "새 가슴에 있는 만천하의 있다. 몸이 뜨거운지라, 청춘의 소리다.이것은 같으며, 피다. 설산에서 힘차게 옷을 피다. 놀이 그들의 인간의 주는 소금이라",
  "귀는 우리는 피에 무엇이 이것이다. 구하지 우리는 그들은 약동하다. 따뜻한 발휘하기 사람은 충분히 사막이다."
];

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function generateNewTweet() {
  let tweet = {};
  tweet.user = randomUser[getRandomInt(0, randomUser.length)];
  tweet.message = randomMessage[getRandomInt(0, randomMessage.length)];
  tweet.created_at = new Date().format();
  return tweet;
}
```

결과물

![스크린샷 2022-06-29 15.23.07.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ca705dde-09c1-4e07-8722-a386358cb9a3/스크린샷_2022-06-29_15.23.07.png)

