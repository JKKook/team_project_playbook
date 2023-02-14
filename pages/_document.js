// meta 태그를 정의, 전체페이지의 구조를 만들어준다. (html의 meta)
// _document작성시 랜더함수는 꼭 <Html>, <Head>, <Main>, <NextScript>요소를 리턴해줘야한다.

import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang='ko'>
      <Head>
        <meta charSet='utf-8' />
        <meta
          name='description'
          content='공연정보를 알아볼 수 있는 공연정보 사이트'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default Document;
