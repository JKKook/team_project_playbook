/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { TextContainer, NotFoundText, BackToHomeButton } from '../404';
import { AiOutlineMessage } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { NotFoundTextEng } from '../404';

const ComingSoon = () => {
  const router = useRouter();

  const handleRouter = () => {
    return router.push('/');
  };

  return (
    <div css={[TextContainer]}>
      <span css={[Title]}>
        Coming Soon <AiOutlineMessage />
      </span>
      <h3 css={[NotFoundText]}>곧 출시될 예정입니다. 다음에 만나요</h3>
      <p css={[NotFoundTextEng]}>
        We are working hard to provide you with a better service. It will be
        released soon, so please wait a little bit.
      </p>
      <button css={[BackToHomeButton]} onClick={handleRouter}>
        홈페이지로 다시 돌아가시려면 여기를 눌러주세요
      </button>
    </div>
  );
};

export default ComingSoon;

export const Title = css`
  font-size: 8rem;
  font-weight: bold;
  color: #52616b;
`;
