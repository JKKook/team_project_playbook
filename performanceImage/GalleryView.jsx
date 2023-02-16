/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';

const GalleryView = ({ currItem }) => {
  const { title, description } = currItem;
  return (
    <article css={[Description]}>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
};

export default GalleryView;

const Description = css`
  display: flex;
  flex-direction: column;
  align-items: justify;
  gap: 5rem;
  margin-top: 5rem;

  h3 {
    font-size: 40px;
  }

  p {
    padding-left: 1rem;
    margin-top: 3rem;
    font-size: 20px;
    line-height: 2.5rem;
    word-break: keep-all;
    white-space: pre-wrap;
  }
`;
