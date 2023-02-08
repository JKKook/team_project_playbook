/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const ReservationItem = ({ total }) => {
  return (
    <div css={[Performances]}>
      {total &&
        total.data.map((elem, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ marginRight: '3rem' }}>{idx + 1}</h2>
            <div css={[CardContainer]}>
              <Link href={`/description/${elem.id}`}>
                <Image
                  src={elem.image}
                  alt={'이미지'}
                  height={200}
                  width={200}
                />
              </Link>
              <div css={[CardBody]}>
                <h5 css={[CardTitle]} title={elem.name}>
                  공연명 : {elem.name}
                </h5>
                <p css={[Detail]} title={elem.place}>
                  장소 : {elem.place}
                </p>
                <p css={[Detail]}>장르 : {elem.genre}</p>

                <p css={[Detail]}>
                  기간 : {elem.start} ~ {elem.end}
                </p>
                <p css={[Detail, PlayingStatus]}>공연상태 : {elem.isPlaying}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ReservationItem;

const Performances = css`
  display: flex;
  flex-direction: column;
  // grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  margin-top: 3rem;
`;

const CardContainer = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
`;

const CardBody = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 2rem;
  // white-space: nowrap;
`;

const CardTitle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Detail = css``;

const PlayingStatus = css``;

const ButtonContainer = css`
  margin-right: 0;
  margin-left: 0;
  justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  flex-wrap: wrap;
`;

const ButtonToDetail = css`
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
`;

const LinkToDescription = css`
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
`;
