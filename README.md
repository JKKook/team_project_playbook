# Team_PlayBook

---

###### Period (23.01.14 ~ 23.02.16)

- 기획 및 프로젝트 셋업 (23.01.14 ~ 23.01.17)
- 프로젝트 작업 (23.01.17 ~ 23.02.16)

<br>

## Index

---

###### 1. 기획서 및 프로젝트 셋업 (초기 청사진)

###### 2. PlayBook 소개

###### 3. Stacks

###### 4. 주요 기능

###### 5. 주요 기능 상세 설명

###### 6. Co-workers

###### 7. 프로젝트 후기

<br>

#### 1. 기획서 및 프로젝트 셋업 (초기 청사진)

---

#### Setting

![image_description](./public/asset/setup1.png)
![image_description](./public/asset/setup2.png)
![image_description](./public/asset/setup3.png)

<br>

#### Git

###### 1). Git Flow : main - develop - feature

###### 2). Git Convention

```js
- FEAT : 새로운 기능의 추가
- FIX: 버그 수정
- DOCS: 문서 수정
- STYLE: 스타일 관련 기능(코드 포맷팅, 세미콜론 누락, 코드 자체의 변경이 없는 경우)
- REFACTOR: 코드 리펙토링
- TEST: 테스트 코트, 리펙토링 테스트 코드 추가
- CHORE: 빌드 업무 수정, 패키지 매니저 수정(ex .gitignore 수정 같은 경우)
```

<br>

#### Unify composition

```jsx
*** 경로 설정
- 상대 경로

*** Atomic Design 적용
- Atom, moelcules 너무 신경쓰지말고 컴포넌트 재사용 단위로 신경쓸 것

*** 파일 셋업
- 상태관리 / API / 모듈: 소문자로 시작 + 카멜
- 컴포넌트 / Pages: 대문자 + 카멜
- 폴더명: 소문자만

*** 코드 작성
- 주석: 상세하게
- 변수: 특정 의미를 갖도록 네이밍

👉🏻 변수, state : 소문자 카멜케이스
    const myData = 10; // 주석 자세히

👉🏻 function : 소문자 카멜케이스 && arrow function
    const myFunc = () => {...} // 주석 자세히

👉🏻 고유Key : NEXT_APP\_대문자\_언더바
    const NEXT_APP_EXAMPLE_KEY = process.env.NEXT_APP_EXAMPLE_KEY;

Etc

*** Yarn setting
*** Webpack, Vercel
*** CSS Library : emotion styled
*** Styling : Root Color 설정
*** 상태 관리 라이브러리 : recoil
*** 서버 통신 : FireBase

```

<br>

#### 2. PlayBook 소개

---

<img src="./public/asset/playbook-logo.png" width="100">

<span>'플레이북'은 영단어 **Play**(공연 하다, 놀이, 즐기다)와 **Book**(예약 하다)의
의미를 착안하여 **놀이처럼 즐기면서 예약하다**의 의미를 덧붙여 만든 합성어입니다.
따라서, 색상은 피로감을 줄이며 산뜻한 느낌으로 다가갈 수 있도록 그린, 화이트 계열을 선택했습니다. 그리고 다른 최대한 웹사이트를 이용하는데 불편함을 줄이고자 분류 카테고리를 통합하여 검색과 필터형식으로 '한 곳'에서 '한 눈'에 볼 수 있도록 타 공연사이트와 차별점을 두고 작업하였습니다.
</span>
