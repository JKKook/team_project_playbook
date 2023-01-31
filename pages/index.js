/** @jsxImportSource @emotion/react **/
// 여기에 우리가 원하는 구현들을 넣으면된다

import { dehydrate, QueryClient, useQueries, useQuery } from 'react-query';
import axios from 'axios';
import ImageSlider from '@/src/components/molecules/ImageSlider';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Navbar from '@/src/components/molecules/Navbar';
import RecommendPerformance from '@/src/components/molecules/RecommendPerformance';
import { async } from '@firebase/util';
import HomeNavbar from '@/src/components/molecules/HomeNavbar';
// 공공기관 api 경로 (쿼리전까지)
const HOST = `http://kopis.or.kr/openApi/restful/pblprfr`;
// api key
const KEY = '98e02b76a394447699b7324b7ff14b83';

// 한달전부터 현재까지 공연하는 정보 불러오기
const requestUrl = `${HOST}?service=${KEY}&stdate=20221201&eddate=20230401&cpage=1&rows=20`;

// 8개의 이미지슬라이드를 위해 가져오는 api
const getApiData = async () => {
  const response = await axios.get('http://localhost:4000/main/image');
  const arr = [];
  //console.log(response.data.elements[0].elements); // 8개 공연정보
  const resData = response.data.elements[0].elements;
  resData.map((v) => {
    const obj = {
      id: v.elements[0].elements[0].text, // 공연 id
      name: v.elements[1].elements[0].text, // 공연 이름
      image: v.elements[5].elements[0].text, // 공연 포스터이미지
    };
    arr.push(obj);
  });
  return arr;
};

// 이런공연은 어떠세요 리스트를 가져오는 api
const recommendApiData = async () => {
  const response = await axios.get('http://localhost:4000/main/recommend');
  const arr = [];
  const resData = response.data.elements[0].elements;
  // console.log(resData[0].elements);
  resData.map((v) => {
    const obj = {
      id: v.elements[0].elements[0].text,
      name: v.elements[1].elements[0].text,
      image: v.elements[5].elements[0].text,
      genre: v.elements[6].elements[0].text, // 공연 장르
      isPlaying: v.elements[7].elements[0].text, // 현재 공연중인지, 예정인지,
    };
    arr.push(obj);
  });
  return arr;
};

// TODO: 여기에 플레이북 추천 구현
const Index = () => {
  // const imageData = useQuery("image", getApiData);
  // const recommendData = useQuery("recommend", recommendApiData);

  // resultData = [{data}, {data}, {...}]
  const resultData = useQueries([
    {
      queryKey: ['image'],
      queryFn: getApiData,
    },
    {
      queryKey: ['recommend'],
      queryFn: recommendApiData,
    },
  ]);
  const loading = resultData.some((result) => result.isLoading);
  if (loading) {
    return <div>loading....</div>;
  }

  return (
    <>
      <HomeNavbar />
      <div>
        <ImageSlider performances={resultData[0]?.data} />
      </div>
      <div css={[RecommendContainer]}>
        <h2 css={[Recommend]}>이런 공연은 어떠세요?</h2>
        <ul css={[RecommendList]}>
          {<RecommendPerformance performances={resultData[1]?.data} />}
        </ul>
      </div>
    </>
  );
};

export default Index;

const RecommendContainer = css`
  margin-top: 5rem;
`;

const Recommend = css`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
`;
const RecommendList = css`
  margin-top: 5rem;
`;
