/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import { useState } from 'react';
import GalleryView from './GalleryView';
import GalleryList from './GalleryList';
import data from '../public/asset/api/BannerImage';

const Gallery = () => {
  const [datas, setDatas] = useState(data); // 공연이미지 데이터
  const [currItem, setCurrItem] = useState(datas[0]); // 선택한 사진

  const onView = (id) => {
    // 고유번호인 id를 받아서 해당 이미지 데이터 찾기
    setCurrItem(datas.find((item) => item.id === id));
  };

  return (
    <div css={[Wrap]}>
      <div css={[RecommandContainer]}>
        <strong css={[RecommandPlayBook]}>
          <span css={[HighlightTextForward]}>Let is Play</span>
          <span css={[HighlightTextBehind]}>오늘의 플레이북 Pick!!</span>
        </strong>
      </div>
      <div css={[GalleryWrap]}>
        <GalleryList datas={datas} onView={onView} currItem={currItem} />
        <GalleryView currItem={currItem} />
      </div>
    </div>
  );
};

export default Gallery;

const Wrap = css`
  margin: 2rem auto;
`;

const RecommandContainer = css`
  display: flex;
  justify-content: flex-start;
  margin: 2rem 0;
`;

const RecommandPlayBook = css`
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
`;

const HighlightTextForward = css`
  display: block;
  font-size: 1.4rem;
  color: #889e81;
  text-align: left;
  &::before {
    content: '"';
  }
  &::after {
    content: '"';
  }
`;

const HighlightTextBehind = css`
  display: block;
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: 800;
  color: #2b2b2b;
`;

const GalleryWrap = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  border-radius: 10px;
  padding: 3rem;
`;
