// xml을 변환, cors 정책해결을 위해 만든 localServer
// 4000을 default로 잡았습니다.
// Server router 수정시 자동으로 서버가 새로고침이 안되니 수동으로 껐다 켜주세요.
// yarn server (package.json 참조)
const express = require('express');
const app = express();

const cors = require('cors');
const request = require('request');
const converter = require('xml-js');

const PORT = 4000;

// main페이지에 캐로셀로 뜨는 공연이미지정보 가져오기
// 하단부터 라우터정보 가져오시면 됩니다.
// 파일은 src/serverRouter/...입니다.
const mainImageRouter = require('./serverRouter/mainImageRouter');
const totalRouter = require('./serverRouter/totalPerformanceRouter');
const KEY = '98e02b76a394447699b7324b7ff14b83';

// cors 정책 허용 라이브러리
app.use(
  cors({
    origin: '*', // 권한허용 페이지
    credentials: true, // 쿠키 인증요청 여부
    optionsSuccessStatus: 200, // 상태 설정
  }),
);

// 라우터 경로 설정
app.use('/main/image', mainImageRouter);
app.use('/main/total', totalRouter);

// server메인
app.get('/', (_, res) => {
  res.send('Server open되었습니다.');
});

app.get('/description/:id', (req, res) => {
  let params = req.params;
  request(
    {
      url: `https://www.kopis.or.kr/openApi/restful/pblprfr/${params.id}?service=${KEY}`,
      method: 'GET',
    },
    (err, response, body) => {
      const xmlToJson = converter.xml2json(body);
      console.log(xmlToJson);
      res.send(xmlToJson);
    },
  );
});

app.listen(PORT, () => {
  console.log('listening on port http://localhost:4000');
});
