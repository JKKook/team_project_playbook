/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { CgGhostCharacter } from 'react-icons/cg';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();
  const handleRouter = () => {
    return router.push('/');
  };

  return (
    <div css={[TextContainer]}>
      <h1 css={[NotFoundTitle]}>404</h1>
      <h2 css={[NotFoundText]}>
        잘못된 접근입니다 <CgGhostCharacter css={[NotFoundImg]} />
      </h2>
      <p css={[NotFoundTextEng]}>
        The resource requested could not be found on this servent
      </p>
      <button css={[BackToHomeButton]} onClick={handleRouter}>
        홈페이지로 다시 돌아가시려면 여기를 눌러주세요
      </button>
    </div>
  );
};
export default NotFound;

export const TextContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 1.5rem;
`;

const NotFoundImg = css`
  transform: translate(10%, 15%);
  font-size: 2rem;
  color: #52616b;
`;

const NotFoundTitle = css`
  font-size: 13rem;
  font-weight: bold;
  color: #52616b;
`;

const NotFoundText = css`
  font-size: 1.5rem;
  font-weight: bold;
  color: #52616b;
`;

const NotFoundTextEng = css`
  font-size: 1rem;
  text-decoration: underline;
`;

const BackToHomeButton = css`
  margin-top: 1.5rem;
  border: none;
  cursor: pointer;
  background-color: #ce7777;
  color: #ffffff;
  padding: 0.8rem;
  font-size: 1rem;
`;
