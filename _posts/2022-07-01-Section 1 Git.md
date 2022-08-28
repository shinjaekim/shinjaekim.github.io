---
layout: single
title:  "Section 1 Git"

categories:
    - 코드스테이츠

tags:
    - Git
    
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---
[week2]
## 간단정리

- Git은 백업, 협업, 이전 버전 저장 등 필수적으로 알아야 한다.
- 일거리를 개인 물류창고에서 택배로 받아서 우리 집에서 해결한 다음 다시 택배로 보내는 상황을 생각해보자
    - 타인의 물류창고로 보낼 수도 있으며, 메시지를 남기면 변동사항도 전달이 가능하다
- Github에서 원격저장소를 만들고 clone을 통해 로컬저장소를 만든다.
- Working directory에서 작업해서 add로 staging area에 올린다.
- Commit을 이용해 변경사항을 저장한다
- push를 통해 원격저장소에 올린다.

<br>

## 느낀점

- 뭔가 하는거 같다. 쉬운건 절대 아니다. 이번 챕터를 시작하면서 깃헙, 깃에대해서 말만 들었을 뿐 이것이 무엇을 하는가에 대해 엄청 고민해보았었다. 이제는 감이 잡힌다. local repository와 remote repository를 구분하고 clone, add, commit, push, pull에 대한 감을 잡았다. 페어프로그램으로 끙끙대면서 해결했던 것이 큰 도움이 되었다.

<br>

## 스스로 답해보기 (사전질문)

- git이란 무엇일것 같은가?
- Git과 Github 비교해봐
- ssh는 뭐야?
- 혼자, 협업의 workflow 떠올려봐

<br>

## 정리




### 1. GIT

#### a. 버전관리
    - version control system
    - 버전 별로 변경된 이력들을 저장하는 작업
        - commit 을 이용하여 변경사항 기록
    - 분산형 버전 관리 시스템
        - 작업을 완료한 이후 파일을 닫았다 치자. 어떻게 다시 수정전 버전을 불러올건데?? 이런 부가적인 기능을 담당하는것이 git

#### b. git이 관리하는 폴더는 버전관리 가능
    - git repository
    - 스냅샷을 만든다.
    - 스냅샷을 만드는 공간을 staging area 라고 한다.
    - github와 같은 원격클라우드에 PUSH될 준비가 된 것

#### c. Git 설치
    - Homebrew 설치 - > 이전에 완료함
    - brew install git / brew git
    - 설치 완료
    - 정보등록
        
```powershell
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```
        
##### ** 설치중 만난 난관 **
    - zsh : command not found $
        - 추측. 해당 명령어가 존재하지 않는다는것?? zsh가 설치?? 되지 않았다??
        - 해결 → 일단은 무시하니 되었다. (알아보기)
    - 읽어보니 길게 나오고 config에 접근을 못하더라..
        - 추측 : 뭔지 모르겠다. config는 어떤 역할을 하는가?
        - chmod를 통해 config에 접근권한을 부여했는데,, 이러니 다시는 발생하지 않더라
            - 다만 추후에 어떤 일을 가져올지??
    - ssh와 공개키 → 공부하기



#### d. 혼자 작업하는 프로세스
    - 타인의 원격 레포지터리에서 가져오기 
        1. fork를 통해 Github remote repository로 가져온다
        2. git clone <remote repository address>
            - remote repository를 내 PC로 → local repository 생성
        3. local repository로 진입
        4. git remote add [origin(naming)] <remote repository address>
        5. 작업 / 수정
        6. git add . or git add <file> → 파일을 staging area로 옮김
        7. git commit -m ‘message’ → 수정사항 명시
        8. git push origin <branch name>

    - 내가 작업을 하다가 옮긴다??
        - 해당 repository에서 git init
            - 해당 repository를 git이 관리하는 폴더로 지정함
        - 이후 4~8 process 동일

#### e. 함께 작업하는 프로세스
    - 혼자 작업 프로세스의 타인 부분과 대부분 같음
    - 다만, 4.번에서 상대방의 원격 레포지터리 또한 remote add 해야함
        - 상대방의 remote repository에서 PULL 해오기 때문
    - PR
        - pull request → 반영을 요청함

#### f. Git의 장소에 대한 추상적 이해
    - untracked area → git init 으로 지정했을때
    - tracked area
        - unstaged area
            - unmodified
            - modified → 파일이 staging 될 준비가 됨
        - staging area → git add 명령어를 실행했을때
            - git reset HEAD^ → 최근의 commit 을 취소함
                - ^ 누적에 따라 지정이 다름
                - hard 와 soft 옵션 공부하기

        - git log → commit 사항을 보여줌

#### g. 플러스 공부할 것
    - git checkout -b name
    - git branch - show branch list
    - git switch - move to — branch

---

### 2. English summary

Using git process

first 

Get project from other’s remote repository to my remote repository → we call this process ‘fork’

click the fork button on top right

click Create Fork button

second 

Move this project to my local repository → we call this process ‘clone’

git clone address of repository

type this command on terminal

third

Move thIs project we cloned to my working space

git status → check which things is included in staging area or untracked area

forth

Add this project we proofread at our working area to our staging area

add : making files being in the status which prepared for commit 

git add file’s name

git add . → all

restore : discarding changes (only things which is not commited)

fifth

and then Git will do commit process automatically and move it my local repository

corrections → not automatically , use git commit -m <messages>

[https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/) → check this site

sixth

Push snapshots to my remote repository or other’s remote repository

seventh

Request “pull request” for others to adjust to our corrections to thier project