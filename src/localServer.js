// xml을 변환, cors 정책해결을 위해 만든 localServer
// 4000을 default로 잡았습니다.
// Server router 수정시 자동으로 서버가 새로고침이 안되니 수동으로 껐다 켜주세요.
// yarn server (package.json 참조)
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 4000;

// main페이지에 캐로셀로 뜨는 공연이미지정보 가져오기
// 하단부터 라우터정보 가져오시면 됩니다.
// 파일은 src/serverRouter/...입니다.
const mainImageRouter = require('./serverRouter/mainImageRouter');

// cors 정책 허용 라이브러리
// 설명: https://velog.io/@logqwerty/CORS
app.use(
  cors({
    origin: '*', // 권한허용 페이지
    credentials: true, // 쿠키 인증요청 여부
    optionsSuccessStatus: 200, // 상태 설정
  }),
);

// 라우터 경로 설정
app.use('/main/image', mainImageRouter);

// server메인
app.get('/', (_, res) => {
  res.send('Server open되었습니다.');
});

app.listen(PORT, () => {
  console.log('listening on port http://localhost:4000');
});

// https://velog.io/@garam0410/Java-OPEN-API-%ED%8C%8C%EC%8B%B1%ED%95%98%EA%B8%B0-JSON
