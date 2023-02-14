import ReservationItem from './ReservationItem';

const Reservation = ({ data }) => {
  return (
    <div>
      <ReservationItem total={data} />
    </div>
  );
};

export default Reservation;
