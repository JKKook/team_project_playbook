/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import Image from 'next/image';
import paintG from '../public/asset/home_paint2.png';
const GalleryView = ({ currItem }) => {
  const { title, description } = currItem;
  return (
    <article css={[Description]}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Image
        css={[PaintImage]}
        src={paintG}
        alt='paintG'
        width={80}
        height={80}
      />
    </article>
  );
};

export default GalleryView;

const Description = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: justify;
  gap: 5rem;
  margin-top: 5rem;
  margin-left: 3rem;

  h3 {
    font-size: 34px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 800;
    z-index: 11;
  }

  p {
    padding-left: 1rem;
    margin-top: 3rem;
    font-size: 20px;
    font-family: 'Open Sans:ital', sans-serif;
    line-height: 2.5rem;
    word-break: keep-all;
    white-space: pre-wrap;
    z-index: 10;
  }
`;

const PaintImage = css`
  position: absolute;
  transform: translate(50%, 40%);
  opacity: 0.2;
  width: 250px;
  height: 250px;
`;
