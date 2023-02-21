/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import {
  getReservationInfo,
  handleRemoveReservationInfo,
} from '../../modules/reservationModules';
import { AiOutlineDelete } from 'react-icons/ai';

const DeleteReservationButton = ({ id, reserveList, onRemoveReservation }) => {
  const queryClient = useQueryClient();
  const cancelQuery = () => {
    queryClient.invalidateQueries(['listApi']);
  };

  return (
    <div css={[DeleteIcon]}>
      <AiOutlineDelete
        onClick={() => {
          handleRemoveReservationInfo(id, reserveList, onRemoveReservation);
          cancelQuery();
        }}
      />
    </div>
  );
};

export default DeleteReservationButton;

const DeleteIcon = css`
  position: relative;
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
`;
