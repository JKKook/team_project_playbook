/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import {
  getReservationInfo,
  handleReservationInfo,
} from '../../../modules/reservationModules';

const ReservationButton = ({
  id,
  reserveList,
  onAddReservation,
  onRemoveReservation,
}) => {
  const [state, setState] = useState(false);

  const reservationInfo = getReservationInfo();
  useEffect(() => {
    if (!reservationInfo.find((info) => info === id)) {
      setState(false);
    } else {
      setState(true);
    }
  }, [reservationInfo, id]);

  return (
    <button
      id='changeBtn'
      css={[ButtonToDetail, ButtonReserve]}
      onClick={() => {
        handleReservationInfo(
          id,
          reserveList,
          onAddReservation,
          onRemoveReservation
        );
      }}
    >
      {state === true ? '예약 취소' : '예약하기'}
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
