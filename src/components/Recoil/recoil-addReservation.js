export const addReservationState = (reserve, performance) => {
  const newReservation = [...reserve];
  const foundIndex = reserve.findIndex((x) => x.id === performance.id);

  if (foundIndex >= 0) {
    newReservation[foundIndex] = {
      ...reserve[foundIndex],
      quantity: reserve[foundIndex].isStocked + 1,
    };
    return newReservation;
  }

  newReservation.push({
    performance,
    id: performance.id,
    quantity: 1,
  });
  return newReservation;
};
