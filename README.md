# 구현 목표
본 프로젝트는 성균관대학교 학생들 간의 원활한 개발자 구인을 위해 만들어졌습니다.

# 구현 기능
+ 로그인
+ 회원가입
+ 포트폴리오 작성 및 수정 페이지

+ 게시(구인)글 작성
+ 게시(구인)글 검색
+ 게시물에 지원하기
+ 내가 지원한 게시물 확인
+ 내가 작성한 게시물 확인

+ 지원자 정보 확인
+ 지원자 승인
+ 게시물(프로젝트) 종료, 삭제
+ 게시물(프로젝트) 종료후 팀원 평가창 (데이터 베이스에는 아직 반영 x )

# Reference
1. https://github.com/facebook/react
2. https://github.com/remix-run/react-router
3. https://github.com/react-icons/react-icons
4. https://github.com/pmndrs/zustand
5. https://github.com/styled-components/styled-components
6. https://github.com/expressjs/express
7. https://github.com/nodejs/node-v0.x-archive
8. https://github.com/axios/axios
9. https://github.com/ANXS/postgresql
10. https://github.com/date-fns/date-fns
11. https://github.com/GoogleChrome/web-vitals
12. https://github.com/expressjs/cors
13. https://github.com/motdotla/dotenv
14. https://github.com/auth0/node-jsonwebtoken
15. https://github.com/expressjs/cookie-parser
16. https://github.com/go-pg/pg

# 지원 운영체제 
linux
mac os 

# 실행방법 
### 배포 웹사이트 접속
0. https://43.203.250.115:3000/ 에 접속한다. (추후 배포용 서버는 삭제 될수 있습니다.)

 ```https://43.203.250.115:3000/```

### 설치후 접속 (ubuntu 22.04 기준)
1. 원하는 디렉토리에 현재 github 주소를 이용해 클론한다.
```
git clone https://github.com/elect10/opensoure_personal_pa.git
```
2. cd opensource_personal_pa 를 통해 opensource_personal_pa 폴더로 진입한다.
```
cd opensource_personal_pa
```
3. 도커가 설치되어있지 않은 경우, Sudo snap install docker 명령어를 실행한다.
```
Sudo snap install docker
```
4. Docker-compose up --build 를 실행한다. (권한 오류시 Sudo Docker-compose up --build 를 실행)
```
Docker-compose up --build
```
5. http://localhost:3000 으로 진입후 , 회원가입 , 로그인을 진행한다. (id 는 본인의 학번을 기입한다.)
```
 http://localhost:3000
```
### 설치후 접속 (mac ver14 기준)
1. 원하는 디렉토리에 현재 github 주소를 이용해 클론한다.
```
git clone https://github.com/elect10/opensoure_personal_pa.git
```
2. cd opensource_personal_pa 를 통해 opensource_personal_pa 폴더로 진입한다.
```
cd opensource_personal_pa
```
3. 도커가 설치되어있지 않은 경우, https://www.docker.com/products/docker-desktop 에서 설치를 진행한다.
```
https://www.docker.com/products/docker-desktop
```
4. Docker-compose up --build 를 실행한다. (권한 오류시 Sudo Docker-compose up --build 를 실행)
```
Docker-compose up --build
```
5. http://localhost:3000 으로 진입후 , 회원가입 , 로그인을 진행한다. (id 는 본인의 학번을 기입한다.)
```
 http://localhost:3000
```

# 실행 예시
![KakaoTalk_Video_2024-06-05-16-32-11](https://github.com/elect10/opensoure_personal_pa/assets/133738655/e30b3a36-074f-4e56-8477-ad0c14eed6bb)


# api 명세서 
[api 명세서를 확인하려면 클릭](/Users/minji/Downloads/API.pdf)


# 코드 설명 (코드의 양이 너무 방대해 디자인적 코드는 배제하고, 핵심 기능만을 설명합니다.)

## react 코드에서의 데이터 전송은 모두 axios.post 로 json 형식으로 전송 되었으며 토큰 관련 보안 문제로 { withCredentials: true } 를 추가했습니다.

## 작성된 코드의 형식은 아래와 같습니다.
## 주요코드.jsx (부가코드.jsx , 부가코드2.jsx )...,,, {주요코드의 기능을 구현해주는 component 코드}


## SignUp.jsx
+ 이름, 학번(id), 비밀번호, 전화번호, 학과 를 form 에 받아 (state, setstate 이용) 서버로 전송합니다.

## Login.jsx (Loginpic.jsx)
+ 학번(id), 비밀번호 를 input 에 받아 서버로 전달한후, 로그인이 성공하면 main page 로 이동합니다. 

## Main.jsx (Postcardmain.jsx, ProjectDescription.jsx)
+ 메인 페이지로, 프로젝트 검색 기능을 제공합니다. 
+ status 팝업(Techstackpoopup1.jsx) 은 모집중인지 여부를 판단합니다.
+ position 팝업(Techstackpoopup2.jsx)은 position 을 받아 string 형으로 서버에 넘깁니다. 
+ techstack popup 은 tech stack 을 비트마스크 형식으로 받아 서버에 넘깁니다.(ex react = 0 << 1 , express = 0 << 2 ..,,) 이 정보를 토대로 조건에 맞는 posts 들을 받아와 main 화면에 보여줍니다.
+ 검색 input 은 클라이언트 부분에는 구현이 돼있지만 , 서버 쪽에서 구현하지 않아 실제로 필터링하는 역활을 하지 못합니다.


## Makepost.jsx 
+ 글을 작성하여 서버로 전송합니다.
popup 은 main.jsx 에서 사용한것과 동일한 컴포넌트로 구현했습니다.

## Scrab.jsx (Postcardmain.jsx, ApplicationList.jsx)
+ 서버에서 id 토큰 (쿠키)을 이용해 내 id 를 확인한뒤 지원한 게시물을 전송해주면 내가 지원한 게시물을 나열해서 보여줍니다.

## ProfilePage.jsx (ProfileCard.jsx, Portfolio.jsx, Postlists.jsx, AccountInformation.jsx ..,,)
+ 본인의 프로필을 관리할수 있는 페이지. 
edit portfolio 를 이용해 포트폴리오를 수정할수 있으며 , 본인의 포트폴리오를 확인하는것 또한 가능하다.
+ My Post 버튼을 통해 본인이 쓴 게시물을 확인할수 있게 했다.
+ My Post 를 통해 게시물을 확인하고 클릭하면, 지원자 리스트가 나온다 (ApplicationList.jsx) 지원자를 클릭하면 , 지원자의 포트폴리오가 나오게 된다. (Application.jsx) 
+ 지원자 리스트 페이지에서 지원자 승인이 가능하다.

## TeamEvaluation.jsx (TeamMemberEvaluation.jsx , TeamMemberList.jsx )
+ 팀을 평가하는 페이지.
+ 게시물을 검색했을때 , 게시물이 recurting 상태가 아니고 closed 라면 , TeamEvaluation page 로 라우팅한다.
+ teammemberlist.jsx 를 통해 팀원들을 불러온후 , 팀원을 클릭시 , teammemberevaluation 함수로 이동해 팀원을 평가한다.
+ 평가는 마찬가지로 state 에 점수 , 평가자 등을 저장한후, onClick () => setstate 로 저장한 값을 서버로 전달한다.

## useProjectStore.jsx , useTeamStore.jsx
+ 자식 계층에서 부모 계층으로 데이터를 넘길때 react 내에서 zustand 를 이용해 상태관리를 진행했다. 
+ 두 파일은 zustand 를 이용해 프로젝트, 팀 에 대한 정보를 전역적으로 관리해주는 파일이다. 
+ react 코드 어디에서든 사용이 가능하다

## TabBar.jsx 
+ 거의 모든 화면에 존재하는 네비게이션 바를 구현한 컴포넌트이다.
+ 간단히 navigate 를 이용해 다른 페이지로 이동할수 있게 했다.
+ z-index 를 1000으로 할당해 팝업을 제외한 모든 요소보다 앞에 존재하게 구현했다. (popup 은 1001 )

## server.js 
+ 로그인을 수행할시 쿠키형식의 토큰이 발행되도록 구현했으며, 차후 유저의 id 가 필요한 경우 이 값을 확인하여 사용할수 있게 하였다. 
+ 기본적으로 json 데이터를 수신하여 , 수신된 값에 맞는 일(데이터 베이스 수정 및 데이터 발송..,,etc ) 을 수행하며, 모든 요청은 보안상의 이유로 post 로 받도록 설정했다. 
+ try catch 를 이용해 에러 핸들링을 최대한 구현해놨다.
+ 리액트 파일과의 연동은 깃허브에 미리 업로드된 build 폴더와 진행했다. 변경을 원할시 25, 613 번째 줄의 경로를 수정해야한다.
+ 자세한 구현은 api 명세서를 참고

## TABLE.sql
+ 데이터 베이스에 필요한 테이블을 구현해둔 파일이다.
+ users 에서는 유저들의 정보를 저장한다.
+ posts 에서는 게시물 마다의 정보를 저장하고 이때id 는 만든 순서대로 커지도록 구현했다.
+ alarms 은 알람기능이 구현전인 관계로 사용되지 않는다.
+ apply_post 는 게시글과 신청자를 묶어주는 테이블이다.
+ teams 는 게시물을 작성한인원, 신청한 인원으로 구성된다.
+ applicant 는 지원자의 apply_post 에  position 을 추가한 테이블이다.
+ evaluate 는 평가를 위한 테이블 이다.

## .env
+ 데이터 베이스를 위한 환경변수를 설정한 파일이다.




# TODO List
+ 게시물 수정, 삭제시 지원자들에게 알림 전송
+ 데스크탑용 style 구현하기
+ 즉각적인 팀원 평가 반영
+ 회원가입 제한 로직 구체화 하기 + 소셜 로그인
+ 그외 자잘한 버그 수정











