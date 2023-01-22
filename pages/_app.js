// _app.js에서 렌더링하는 값은 모든 페이지에 영향을 준다.
// _app.js는 클라이언트에서 띄우길 바라는 전체 컴포넌트의 공통 레이아웃이다.
// 전체 페이지를 감싸고 있는 root페이지라고 볼 수 있다.
// _app.js 실행 -> _document.js실행 구조
import React from 'react';
import Head from 'next/head';

// props로 받는 Component는 요청한 페이지다. GET/요청시 Component에서는 pages/index.js 파일이 props로 내려온다.
// pageProps는 페이지 getInitialProps를 통해 내려받은 props들을 말한다.

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet='utf-8' />
      <meta
        name='description'
        content='공연정보를 알아볼 수 있는 공연정보 사이트'
      />
      <title>팀프로젝트 공연사이트</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
