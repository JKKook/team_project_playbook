import { useQuery } from 'react-query';
import axios from 'axios';
import PerformanceList from '@/src/components/molecules/PerformanceList';

import Filter from '@/src/components/molecules/Filter';

export const getTotalApi = async () => {
  const response = await axios.get('http://localhost:4000/main/total');
  const arr = [];
  const resData = response.data.elements[0].elements;
  resData.map((v) => {
    const obj = {
      id: v.elements[0].elements[0].text, // 공연 id
      name: v.elements[1].elements[0].text, // 공연 이름
      start: v.elements[2].elements[0].text, // 공연 시작일
      end: v.elements[3].elements[0].text, // 공연 시작일
      place: v.elements[4].elements[0].text, // 공연 장소
      image: v.elements[5].elements[0].text, // 공연 포스터이미지
      isPlaying: v.elements[7].elements[0].text, // 공연 상태
      genre: v.elements[6].elements[0].text, // 공연 장르
    };
    arr.push(obj);
  });
  return arr;
};

const Performance = () => {
  const { data, isLoading, isFetching } = useQuery('total', getTotalApi);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div>
        <Filter />
      </div>
      <PerformanceList total={data} />
    </>
  );
};
export default Performance;
