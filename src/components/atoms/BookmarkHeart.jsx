/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import {useEffect, useState } from 'react';
import {
  getBookmarkInfo,
  handleBookMarkInfo,
} from '../../modules/bookmarkModules';
import {useQueryClient } from 'react-query';

const BookmarkHeart = ({ id,bookMarks, onAddMarks, onRemoveMarks }) => {
  const [state, setState] = useState(false);
  const queryClient = useQueryClient();
  const cancelQuery = () => {
    queryClient.invalidateQueries(['listApi']);
  };

  const bookmarkInfo = getBookmarkInfo();
  useEffect(() => {
    if(!bookmarkInfo.find((info) => info === id)){
      setState(false);
    } else {
      setState(true);
    }
  },[bookmarkInfo,id]);

  return (
    <>
      <span css={[Heart]} onClick={() =>  {
        handleBookMarkInfo(id,bookMarks,onAddMarks, onRemoveMarks)
        cancelQuery();  
      }}>
        {state === true ? <BsHeartFill css={[FillHeart]} /> : <BsHeart />}
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
