/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const CardContainer = css`
  margin: 30px auto;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const CardBody = css`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
`;

const CardTitle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
`;

const Playing = css``;

const ButtonContainer = css`
  margin-right: 0;
  margin-left: 0;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
`;

const ButtonToDetail = css`
  margin-right: 5px;
  flex: 1 1 0%;
  display: inline-block;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  text-align: center;
  cursor: pointer;
  user-select: none;
  border: 1px solid #0dcaf0;
  border-radius: 0.375rem;
  background-color: #0dcaf0;
  vertical-align: middle;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const Card = ({ performances }) => {
  console.log(performances);

  return (
    <div css={[CardContainer]}>
      <Image
        src={performances}
        alt={'images'}
        height={400}
        width={288}
      />
      <div css={[CardBody]}>
        <h5 css={[CardTitle]} title={performance.name}>
          공연이름
        </h5>
        <p title={performance.price}>가격</p>
        <p title={performance.place}>장소</p>
        <p title={performance.isPlaying}>공연중</p>
        <p title={performance.genre}>액션</p>

        <div css={[ButtonContainer]}>
          <Link css={[ButtonToDetail]} href={`/description/${performance.id}`}>
            자세히
          </Link>
          <button css={[ButtonToDetail]}>북마크 추가</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
