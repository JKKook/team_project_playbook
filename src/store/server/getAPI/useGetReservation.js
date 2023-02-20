import { getReservationInfo } from '../../../modules/reservationModules';
import axios from 'axios';

const useGetReservation = async () => {
  const list = getReservationInfo();
  const urlArr = [];
  list.forEach((elem) => {
    const url = `http://localhost:4000/description/${elem}`;
    urlArr.push(axios.get(url));
  });
  const response = await axios.all(urlArr);

  // 파싱
  const arr = [];
  response.map((elem) => {
    const elemData = elem.data.elements[0].elements[0].elements;
    const obj = {
      id: elemData[0].elements[0]?.text || '정보없음',
      name: elemData[1].elements[0]?.text || '정보없음',
      start: elemData[2].elements[0]?.text || '정보없음',
      end: elemData[3].elements[0]?.text || '정보없음',
      place: elemData[4].elements[0]?.text || '정보없음',
      image: elemData[11].elements[0]?.text || '정보없음',
      genre: elemData[13].elements[0]?.text || '정보없음',
      isPlaying: elemData[14].elements[0]?.text || '정보없음',
    };
    arr.push(obj);
  });
  return arr;
};

export default useGetReservation;
