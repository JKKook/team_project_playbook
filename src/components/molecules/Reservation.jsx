/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import useGetPerformance from '@/src/store/server/useGetPerformance';
import React from 'react';
import ReservationItem from './ReservationItem';

const Reservation = ({ data }) => {
  return (
    <div>
      <ReservationItem total={data} />
    </div>
  );
};

export default Reservation;
