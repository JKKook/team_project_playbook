/** @jsxImportSource @emotion/react */
import Loading from '@/src/components/atoms/Loading';
import { css } from '@emotion/react';
import NextImage from 'next/image';
import useGetDescription from '@/src/store/server/useGetDescription';
const { useState, useEffect } = require('react');

const { useRouter } = require('next/router');

// 여기서 공연 상세정보 API 불러오기

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

const srcMatch = (src) => {
  const regexp = RegExp(/^(http:\/\/)/);
  const isSrc = regexp.test(src);
  if (!isSrc) {
    return `http://www.kopis.or.kr/upload/pfmIntroImage/${src}.jpg`;
  }
  return src;
};

const Post = () => {
  const router = useRouter();
  // path 아디 정보
  const { performenceid } = router.query;
  let imageSize = null;

  const { data, isLoading } = useGetDescription(performenceid);

  console.log(data);

  return (
    <>
      {!isLoading && data ? (
        <div css={[Container]}>
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
              <li>장소vv: {data.place}</li>
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
            {/* {data.descripImage.length !== 0 ? (
              data.descripImage.map((item, idx) => {
                return ( */}
            <NextImage
              css={[Images]}
              // key={idx}
              src={data.descriptImage}
              alt={'image'}
              width={700}
              height={5000}
            />
            {/* );
              })
            ) : (
              <div>상세정보 이미지가 없습니다.</div>
            )} */}
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
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
