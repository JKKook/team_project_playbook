import { PERFORMANCE_RESERVE_KEY } from '../contexts/localStorageKey';

export const reservationMoudle = (performanceid) => {
  const result = getReservationInfo();

  if (result.find((info) => info === performanceid)) {
    console.log(true);
    return true;
  } else {
    return false;
  }
};

export const getReservationInfo = () => {
  const result =
    JSON.parse(localStorage.getItem(PERFORMANCE_RESERVE_KEY)) ?? [];
  return result;
};

export const removeReservationInfo = (performanceid) => {
  const reservationInfo = getReservationInfo();
  const newReservationInfo = reservationInfo.filter(
    (info) => info !== performanceid
  );
  localStorage.setItem(
    PERFORMANCE_RESERVE_KEY,
    JSON.stringify(newReservationInfo)
  );
};

export const handleToggleReservationInfo = (id) => {
  const reservationInfo = getReservationInfo();

  if (!reservationInfo.find((info) => info === id)) {
    localStorage.setItem(
      PERFORMANCE_RESERVE_KEY,
      JSON.stringify([...reservationInfo, id])
    );
  } else {
    removeReservationInfo(id);
  }
};

export const handleRemoveReservationInfo = (
  id,
  reserveList,
  onRemoveReservation
) => {
  const reservationInfo = getReservationInfo();

  if (!reservationInfo.find((info) => info !== id)) {
    removeReservationInfo(id);
    onRemoveReservation(reserveList, id);
  }
};
