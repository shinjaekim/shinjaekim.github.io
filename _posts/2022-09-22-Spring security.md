---
layout: single
title:  "Section 4 Spring security (Config, 인증)"

categories:
    - 코드스테이츠
    - 개인탐구

tags:
    - Spring
    
toc: true
toc_sticky: true
toc_label: "나의 생각흐름 정리"    
---
[week9]
## 간단정리
- 서블릿 필터의 영역에서 보안의 인증 인가가 진행된다.

<br> 

## 느낀점
- 굉장히 복잡하지만, 천천히 따라가면 이해할만 하지만, 또 뒤돌면 까먹는 정말 머리 아픈 영역

<br>

## 스스로 답해보기
- Spring security framework란?
- Spring security 의 필요성
- Spring security 의 동작 방식

<br>

## 정리

> Spring Security는 Spring MVC 기반의 애플리케이션의 인증, 인가 기능을 지원하는 보안 프레임워크이다.

이를 조금 자세히 분류해보자

- 인증방식

    - ssr방식으로 폼 로그인 인증을 구현할 수 있다.
    - csr방식으로 토큰 기반 인증을 구현할 수 있다.
    - Oath2를 기반으로 한 인증을 구현할 수 있다.

- 역할에 따른 권한 레벨을 적용할 수 있다.

- 이를 바탕으로 리소스에 대한 접근을 제어할 수 있다.

- 패스워드와 같은 민감한 정보를 암호화 할 수 있다.

- 웹 보안의 공격 차단을 설정할 수 있다.


### 1. 용어 구분(이론적)

principal(주체)
    어플리케이션을 사용하는 주체
    어플리케이션을 사용하는 주체라 함은 사용자, 디바이스, 시스템 등
    '인증 프로세스가 성공적으로 수행된 사용자의 계정 정보'

authentication(인증)
    어플리케이션을 사용하는 사용자가 '나'다
    주민등록증 같은 것 -> credential

authorization(인가)
    인증 이후 진행되는 것
    사용자의 레벨에 따라 리소스의 접근 권한을 설정하는 과정(허가하는 과정)
    역할의 형태

access control(접근 제어)
    인가에 따른 권한 레벨이 있다고 할때
    자신의 권한에 맞지 않는 리소스에 접근한다고 하자
    그러면 접근이 제한되어야 할 것인데
    이것을 접근 제어라고 한다.

---

### 2. Configuration 구현

[들어가기에 앞서]

    과거와 현재의 차이
    과거 : WebSecurityConfigurerAdapter를 상속받는 클래스를 만들고 configure 메서드를 오버라이딩 하였다.(5.7 이전)

    현재 : SecurityFilterChain을 Bean으로 등록한다. (권장))

스프링의 보안과 관련된 설정들, 환경구성을 하는 클래스이다. 

내부의 @Bean이 명시된 메서드들은 객체들을 리턴하는데, 그것이 추후 보안과 관련된 조치들을 취할때 사용하게될 Bean이다.

```java
    
@Configuration
public class SecurityConfiguration{
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        // HTTP 요청에 대한 보안 설정 구성을 하는 영역
    }
}
```

#### 2-1 간략한 설정들

1. authorizeHttpRequest / antMatchers - 특정 리소스(URL)의 접근 가능 여부 설정
2. formLogin - 폼 로그인을 사용하는 ssr방식의 경우
3. cors
4. csrf
5. apply - 커스텀 필터 적용

---

### 3. 2번을 흐름에서 보자.

스프링 MVC패턴을 공부할때 클라이언트로부터 요청을 받고 응답을 전해주는 계층은 api - controller계층이었다.

그리고 그 controller계층에 도달하는 과정에 돋보기를 두면 dispatcherServlet이라는 것이 앞에서 영향력을 행사한다.

하지만 ***Spring Security***는 dispatcherServlet에 도착하기 전에 http message에 어떠한 조치를 취하는 서블릿 필터의 영역에 속한다.

여러 서블릿 필터 중 security에 해당하는 필터는 둘이다.

    DelegatingFilterProxy  -> FilterChainProxy

여기서 DelegatingFilterProxy는 '서블릿 컨테이너 영역의 필터'와 'ApplicationContext에 Bean으로 등록된 필터'들을 연결해준다.

후자의 Bean으로 등록된 필터들이 2번에서 작성한 SecurityConfiguration 클래스 안에 속한 @Bean으로 명시된 메서드이다.


#### 3-1. 여기서 의문점이 생긴다.

Spring 프레임워크에 속하는 영역에서는 applicationContext(스프링 컨테이너)에 Bean을 등록하고 이를 이용하여 DI함으로써 제어의 흐름을 프레임워크가 관리한다.

하지만 앞서 언급한 바로는 Security가 적용되는 filter의 영역은 DispatherServlet 이전, 그러니까 '서블릿의 기술이지 Spring 프레임워크의 기술의 영역이 아니다' 

> Spring 프레임워크의 영역이 아닌 filter에 어떻게 ApplicationContext를 이용한 Bean의 DI가 가능할까??

이를 가능하게 된 시작점이 DelegatiingFilterProxy의 등장이다.

로직적으로는 DelegatingFilterProxy가 스프링 컨테이너에 등록된 Bean Filter를 주입받고, 이 DelegationFilterProxy가 서블릿 컨테이너에 등록되어 사용된다.

***스프링 부트를 이용하고부터는 톰캣과 같은 서블릿 컨테이너까지 스프링부트가 제어하기때문에(영역이 확대되어서) DelegationFilterProxy가 꼭 필요한 존재는 아니라고 하는데 이는 더 찾아봐야겠다***

---

### 4. Spring Security의 인증 흐름

ID/PASSWORD를 이용하는 상황을 가정한다.

1) 로그인

사용자가 ID/PASSWORD를 입력한다.


2) UsernamePasswordAuthenticationFilter에 도착

    Authentication 인터페이스를 구현한 UsernameAuthenticationToken에 ID/PASSWORD값을 넣어 '인증되지 않은 Authentication'을 생성한다.

    그리고 이를 AuthenticaionMangaer에 전달한다.


3) AuthenticationManager에 도착

    AuthenticationManger를 구현한 ProviderManager가 전달받은 UsernameAuthenticationToken을 AuthenticationProvider에게 넘긴다.


4) AuthenticationProvider의 UserDetailsService 조회

    AuthenticationProvider가 전달받은 UsernameAuthenticationToken의 UserDetailsService를 조회한다.


5) UserDetailsService가 DB조회

    조회 후 해당하는 UserDetail을 생성하여 AuthenticationProvider에게 전달한다.


6) AuthenticationProvider가 인증된 Authentication을 만든다.

    2번에서 생성된 Authentication과 다르게 principal, credential, authority가 포함되어 있다.


7) UsernamePasswordAuthenticationFilter에 도착한다.

    6번에서 생성된 Authentication을 SecurityContext에 저장한다.