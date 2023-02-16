/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import Image from 'next/image';

const GalleryItem = ({ item, onView }) => {
  const { image, title, id } = item;
  return (
    <li onClick={() => onView(id)} css={[ThumbList]}>
      <Image src={image} alt={title} width={50} height={50} />
    </li>
  );
};

export default GalleryItem;

const ThumbList = css`
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    opacity: 0.8;
    transform: scale(0.8);
  }
`;
