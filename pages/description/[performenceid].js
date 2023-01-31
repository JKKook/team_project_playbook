/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import NextImage from 'next/image';
import { useQuery } from 'react-query';
const { useState, useEffect } = require('react');

const { useRouter } = require('next/router');

// 여기서 공연 상세정보 API 불러오기
export const getDescriptionAPI = async (id) => {
  const response = await axios.get(`http://localhost:4000/description/${id}`);
  const resData = response.data;
  // console.log(resData.elements[0].elements[0].elements[16].elements[tab].elements[0].text);

  // console.log(resData.elements[0].elements[0].elements[16].elements);
  return {
    id: resData.elements[0].elements[0].elements[0].elements[0].text, // 공연 아이디
    name: resData.elements[0].elements[0].elements[1].elements[0].text, // 공연 이름
    from: resData.elements[0].elements[0].elements[2].elements[0].text, // 공연 시작일
    to: resData.elements[0].elements[0].elements[3].elements[0].text, // 공연 종료일
    actor: resData.elements[0].elements[0].elements[5].elements[0].text, // 출연배우
    runtime: resData.elements[0].elements[0].elements[7].elements[0].text, // 런타임시간
    place: resData.elements[0].elements[0].elements[4].elements[0].text, // 장소
    price: resData.elements[0].elements[0].elements[10].elements[0].text, // 가격
    genre: resData.elements[0].elements[0].elements[13].elements[0].text, // 공연장르
    posterImage: resData.elements[0].elements[0].elements[11].elements[0].text, // 포스터이미지
    // descriptImage: [{type: "element", name: "", elements: [{ type: 'text', text: 'url경로' }]}]
    descripImage: resData.elements[0].elements[0].elements[16].elements, // 공연 상세이미지
  };
};

const getImageSize = (src) => {
  let img = new Image();
  img.src = src;
  const widthImage = img.width;
  const heightImage = img.height;
  return {
    width: widthImage,
    height: heightImage,
  };
};

const Post = () => {
  const router = useRouter();

  // path 아디 정보
  const { performenceid } = router.query;
  let imageSize = null;

  const { data, isLoading, isFetching } = useQuery(
    ['description', performenceid],
    () => getDescriptionAPI(performenceid)
  );

  // console.log(data.descripImage[0].elements[0].text);

  if (!isLoading) {
    imageSize = getImageSize(data.descripImage);
  }

  return (
    <>
      {!isLoading ? (
        <div css={[Container]}>
          <div>
            {data.descripImage?.map((item, idx) => {
              <NextImage
                css={[Images]}
                key={idx}
                src={item}
                alt={'image'}
                width={700}
                height={5000}
              />;
            })}
          </div>
          <div css={[ImageContainer]}>
            <NextImage
              src={data.posterImage}
              alt={data.name}
              width={350}
              height={500}
            />
          </div>
          <h1 css={[PerformenceName]}>{data.name}</h1>
          <div css={[InfoContainer]}>
            <h2 css={[InfoName]}>공연 정보</h2>
            <ul css={[List]}>
              <li>장소: {data.place}</li>
              <li>출연진: {data.actor}</li>
              <li>
                기간: {data.from} ~ {data.to}
              </li>
              <li>가격: {data.price}</li>
              <li>공연장르: {data.genre}</li>
              <li>공연시간: {data.runtime}</li>
            </ul>
          </div>
          <div css={[ButtonContainer]}>
            <button>예매하기</button>
            <button>북마크</button>
          </div>
          <div css={[DescriptionImage]}>
            {data.descripImage?.map((item, idx) => {
              return (
                <NextImage
                  css={[Images]}
                  key={idx}
                  src={item.elements[0].text}
                  alt={'image'}
                  width={700}
                  height={5000}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div>Loading중</div>
      )}
    </>
  );
};

export default Post;

const Container = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ImageBox = css`
  @media screen and (min-width: 768px) {
    flex: 0 0 auto;
    width: 50%;
  }
`;

const ImageContainer = css`
  margin: 20px auto;
  width: 350px;
  height: 500px;
  background-color: black;
`;

const PerformenceName = css`
  display: flex;
  flex-direction: column;

  font-size: 25px;
  font-weight: 500;
  margin: 10px 20px;

  @media screen and (max-width: 500px) {
    font-size: 18px;

    &:after {
      content: '';
      display: block;
      width: 200px;
      height: 5px;
      border-bottom: 1px solid #bcbcbc;
      margin: 20px;
    }
  }
`;

const List = css`
  margin: 20px 20px;
`;

const InfoContainer = css`
  display: flex;
  flex-direction: column;
`;

const InfoName = css`
  font-size: 20px;
  color: gray;
  margin: 20px;
`;

const ButtonContainer = css`
  display: flex;
  justify-content: center;
`;

const DescriptionImage = css`
  margin: 20px auto;
`;

const Images = css`
  object-fit: fill;
`;
