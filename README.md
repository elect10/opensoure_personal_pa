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

# 코드 설명 (디자인적 코드는 배제하고, 기능적인 부분만을 설명합니다.)
## login.js
+ 






# TODO List
+ 게시물 수정, 삭제시 지원자들에게 알림 전송
+ 데스크탑용 style 구현하기
+ 즉각적인 팀원 평가 반영
+ 회원가입 제한 로직 구체화 하기 + 소셜 로그인
+ 그외 자잘한 버그 수정











