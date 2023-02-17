/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import GalleryItem from './GalleryItem';
import Image from 'next/image';

const GalleryList = ({ datas, currItem, onView }) => {
  const { image, title } = currItem;

  return (
    <article>
      <Image
        src={image}
        alt={title}
        width={400}
        height={500}
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

const ImageBox = css`
  border-radius: 20px;
  height: 100%;
  aspect-ratio: 1 / 1;
`;

const ThumbBox = css`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;
