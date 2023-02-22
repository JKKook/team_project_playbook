/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

const DatePickerOne = () => {
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  return (
    <>
      <DatePicker
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  );
};

export default DatePickerOne;
