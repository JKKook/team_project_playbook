import { PERFORMANCE_RESERVE_KEY } from '../contexts/localStorageKey';

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

export const handleReservationInfo = (id, state) => {
  const reservationInfo = getReservationInfo();

  if (!reservationInfo.find((info) => info === id)) {
    localStorage.setItem(
      PERFORMANCE_RESERVE_KEY,
      JSON.stringify([...reservationInfo, id])
    );
    state(true);
  } else {
    removeReservationInfo(id);
    state(false);
  }
};
