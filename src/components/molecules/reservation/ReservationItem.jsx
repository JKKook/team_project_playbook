/** @jsxImportSource @emotion/react **/
import { PERFORMANCE_RESERVE_KEY } from '../../../contexts/localStorageKey';
import { getReservationInfo } from '../../../modules/reservationModules';
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineDelete } from 'react-icons/ai';

const ReservationItem = ({ total, id }) => {
  const handleRemoveReservation = (performanceid) => {
    const reserveInfo = getReservationInfo();
    const newReservation = reserveInfo.filter((item) => item !== performanceid);
    localStorage.setItem(
      PERFORMANCE_RESERVE_KEY,
      JSON.stringify(newReservation),
    );
  };

  return (
    <div css={[Performances]}>
      {total &&
        total.map((elem, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  <p css={[Detail, PlayingStatus]}>
                    공연상태 : {elem.isPlaying}
                  </p>
                </div>
              </div>
              <div css={[DeleteIcon]}>
                <AiOutlineDelete
                  onClick={() => handleRemoveReservation(elem.id)}
                />
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
  width: 20rem;
  // white-space: nowrap;
`;

const CardTitle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeleteIcon = css`
  position: relative;
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
`;

const Detail = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PlayingStatus = css``;
