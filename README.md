## .env 사용법

---

open API 고유키나 배포용에선 보여지면 안되는 변수들을 저장해놓는다. <br/>
<br />
⭐️ component 내부에서 .env 접근시 <br />

    const EXAMPLE_KEY = process.env.EXMAPLE_KEY;

<br />

## 변수명 통일하기

---

👉🏻 변수, state : 소문자 카멜케이스

    const myData = 10; // 주석 자세히

👉🏻 function : 소문자 카멜케이스 && arrow function

    const myFunc = () => {...} // 주석 자세히

👉🏻 고유Key : NEXT_APP\_대문자\_언더바

    const NEXT_APP_EXAMPLE_KEY = process.env.NEXT_APP_EXAMPLE_KEY;

<br />
