/** @jsxImportSource @emotion/react **/
import {
  handleReservationInfo,
  reservationMoudle,
} from '../../../modules/reservationModules';
import { css } from '@emotion/react';
import { useState } from 'react';

const ReservationButton = ({ id }) => {
  const [state, setState] = useState(() => reservationMoudle(id));

  const getReservation = () => {
    handleReservationInfo(id, setState);
  };

  return (
    <button
      id='changeBtn'
      css={[ButtonToDetail, ButtonReserve]}
      onClick={getReservation}
    >
      {state ? '예약 취소' : '예약하기'}
    </button>
  );
};

export default ReservationButton;

const ButtonReserve = css`
  width: 100%;
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
  cursor: pointer;
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
