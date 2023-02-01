/** @jsxImportSource @emotion/react **/
import { css, keyframes } from '@emotion/react';

const text = keyframes`
    50% {
      opacity: 0.1;
    }
`;

const dash = keyframes`
  to {
    stroke-dashoffset: 234;
  }
`;

const LoadingImg = css`
  background: rgba(0, 0, 0, 0.533);
  color: white;
  top: 0px;
  left: 0px;
  z-index: 9;
  text-align: center;
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingSvg = css`
  font-size: 5px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: ${text} 1s ease-in-out infinite;
`;

const LoadingPloygon = css`
  stroke-dasharray: 22;
  stroke-dashoffset: 1;
  animation: ${dash} 4s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite
    alternate-reverse;
`;

const Loading = () => {
  return (
    <div css={[LoadingImg]}>
      <svg width='205' height='250' viewBox='0 0 40 50' css={[LoadingSvg]}>
        <polygon
          strokeWidth='1'
          stroke='#fff'
          fill='none'
          points='20,1 40,40, 1,40'
          css={[LoadingPloygon]}
        ></polygon>
        <text fill='#fff' x='6' y='47'>
          Loading
        </text>
      </svg>
    </div>
  );
};

export default Loading;
