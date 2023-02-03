import axios from 'axios';
import { useQuery } from 'react-query';

const getTotalApi = async () => {
  return await axios.get('http://localhost:4000/main/total');
};

const useGetGenre = () => {
  return useQuery(['total'], getTotalApi, {
    // Category가 변경될 때만 렌더링
    select: (data) => {
      const resData = data.data.elements[0].elements;
      const arr = [];
      resData.map((v) => {
        const obj = {
          id: v.elements[0].elements[0].text, // 공연 id
          name: v.elements[1].elements[0].text, // 공연 이름
          start: v.elements[2].elements[0].text, // 공연 시작일
          end: v.elements[3].elements[0].text, // 공연 시작일
          place: v.elements[4].elements[0].text, // 공연 장소
          image: v.elements[5].elements[0].text, // 공연 포스터이미지
          genre: v.elements[6].elements[0].text, // 공연 장르
          isPlaying: v.elements[7].elements[0].text, // 공연 상태
        };
        arr.push(obj);
      });
      return {
        genreList:new Set(arr.map(list => list.genre)),
        data:arr 
      };
    },
  });
};

export default useGetGenre;
