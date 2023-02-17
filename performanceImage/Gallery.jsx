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

const GalleryWrap = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  border-radius: 10px;
  background: skyblue;
  padding: 3rem;
`;
