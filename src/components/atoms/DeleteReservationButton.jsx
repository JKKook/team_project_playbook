/** @jsxImportSource @emotion/react **/
import {
  getReservationInfo,
  handleRemoveReservationInfo,
  handleReservationInfo,
} from '@/src/modules/reservationModules';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useQueryClient } from 'react-query';

const DeleteReservationButton = ({ id, reserveList, onRemoveReservation }) => {
  const [state, setState] = useState(false);
  const queryClient = useQueryClient();
  const cancelQuery = () => {
    queryClient.invalidateQueries(['listApi']);
  };

  const reservationInfo = getReservationInfo();
  useEffect(() => {
    if (!reservationInfo.find((info) => info === id)) {
      setState(false);
    } else {
      setState(true);
    }
  }, [reservationInfo, id]);

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
