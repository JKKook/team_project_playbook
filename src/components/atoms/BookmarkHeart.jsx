/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useState } from 'react';
import {
  bookmarkModule,
  handleBookMarkInfo,
} from '../../modules/bookmarkModules';

const BookmarkHeart = ({ id }) => {
  const [state, setState] = useState(() => bookmarkModule(id));
  return (
    <>
      <span css={[Heart]} onClick={() => handleBookMarkInfo(id, setState)}>
        {state ? <BsHeartFill css={[FillHeart]} /> : <BsHeart />}
      </span>
    </>
  );
};

export default BookmarkHeart;

const Heart = css`
  font-size: 20px;
  padding-top: 2px;
  cursor: pointer;
`;

const FillHeart = css`
  color: red;
`;
