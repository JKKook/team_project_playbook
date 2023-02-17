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
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,600;0,700;0,800;1,400&display=swap'
          rel='stylesheet'
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
