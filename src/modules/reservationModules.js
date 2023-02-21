import { PERFORMANCE_RESERVE_KEY } from '../contexts/localStorageKey';

export const reservationModule = (performanceid) => {
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

export const handleReservationInfo = (
  id,
  reserveList,
  onAddReservation,
  onRemoveReservation
) => {
  const reservationInfo = getReservationInfo();

  if (!reservationInfo.find((info) => info === id)) {
    localStorage.setItem(
      PERFORMANCE_RESERVE_KEY,
      JSON.stringify([...reservationInfo, id])
    );
    onAddReservation([...reservationInfo, id]);
  } else {
    removeReservationInfo(id);
    onRemoveReservation(reserveList, id);
  }
};

export const handleRemoveReservationInfo = (
  id,
  reserveList,
  onRemoveReservation
) => {
  const reservationInfo = getReservationInfo();
  const newList = reservationInfo.filter((info) => info !== id);
  localStorage.setItem(PERFORMANCE_RESERVE_KEY, JSON.stringify(newList));
  onRemoveReservation(reserveList, id);
};
