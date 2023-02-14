const express = require('express');
const router = express.Router();
const request = require('request');
const converter = require('xml-js');

// 공공기관 api 경로 (쿼리전까지)
const HOST = `http://kopis.or.kr/openApi/restful/pblprfr`;
// api key
const KEY = '98e02b76a394447699b7324b7ff14b83';

// 한달전부터 현재까지 공연하는 정보 불러오기
const requestUrl = `${HOST}?service=${KEY}&stdate=20221201&eddate=20230401&cpage=3&rows=10`;

router.get('/', (_, res) => {
  request(
    {
      url: requestUrl,
      method: 'GET',
    },
    (body) => {
      const xmlToJson = converter.xml2json(body);
      res.send(xmlToJson);
    }
  );
});

module.exports = router;
