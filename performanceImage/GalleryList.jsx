/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import GalleryItem from './GalleryItem';
import Image from 'next/image';

const GalleryList = ({ datas, currItem, onView }) => {
  const { image, title } = currItem;

  return (
    <article css={[Left]}>
      <Image
        src={image}
        alt={title}
        width={500}
        height={450}
        css={[ImageBox]}
      />
      <ul css={[ThumbBox]}>
        {datas.map((item) => (
          <GalleryItem key={item.id} item={item} onView={onView} />
        ))}
      </ul>
    </article>
  );
};

export default GalleryList;

const Left = css``;

const ImageBox = css`
  border-radius: 20px;
`;

const ThumbBox = css`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;
