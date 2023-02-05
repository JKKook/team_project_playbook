import { useQuery } from 'react-query';
import axios from 'axios';

const getDescriptionAPI = async (id) => {
  return await axios.get(`http://localhost:4000/description/${id}`);
};

const useGetDescription = (performenceid) => {
  return useQuery(
    ['description', performenceid],
    () => getDescriptionAPI(performenceid),
    {
      enabled: !!performenceid,
      select: (data) => {
        const resData = data.data.elements[0].elements[0].elements;
        return {
          id: resData[0].elements[0].text,
          name: resData[1].elements[0].text,
          from: resData[2].elements[0].text,
          to: resData[3].elements[0].text,
          actor: resData[5].elements[0].text,
          runtime: resData[7].elements[0].text,
          place: resData[4].elements[0].text,
          price: resData[10].elements[0].text,
          genre: resData[13].elements[0].text,
          posterImage: resData[11].elements[0].text,
          descriptImage: resData[16].elements[0].elements[0].text,
        };
      },
    }
  );
};

export default useGetDescription;
// const resData = response.data;

// return {
//   id: resData.elements[0].elements[0].elements[0].elements
//     ? resData.elements[0].elements[0].elements[0].elements[0].text
//     : '정보없음', // 공연 아이디
//   name: resData.elements[0].elements[0].elements[1].elements
//     ? resData.elements[0].elements[0].elements[1].elements[0].text
//     : '정보없음', // 공연 이름
//   from: resData.elements[0].elements[0].elements[2].elements
//     ? resData.elements[0].elements[0].elements[2].elements[0].text
//     : '정보없음', // 공연 시작일
//   to: resData.elements[0].elements[0].elements[3].elements
//     ? resData.elements[0].elements[0].elements[3].elements[0].text
//     : '정보없음', // 공연 종료일
//   actor: resData.elements[0].elements[0].elements[5].elements
//     ? resData.elements[0].elements[0].elements[5].elements[0].text
//     : '정보없음', // 출연배우
//   runtime: resData.elements[0].elements[0].elements[7].elements
//     ? resData.elements[0].elements[0].elements[7].elements[0].text
//     : '정보없음', // 런타임시간
//   place: resData.elements[0].elements[0].elements[4].elements
//     ? resData.elements[0].elements[0].elements[4].elements[0].text
//     : '정보없음', // 장소
//   price: resData.elements[0].elements[0].elements[10].elements
//     ? resData.elements[0].elements[0].elements[10].elements[0].text
//     : '정보없음', // 가격
//   genre: resData.elements[0].elements[0].elements[13].elements
//     ? resData.elements[0].elements[0].elements[13].elements[0].text
//     : '정보없음', // 공연장르
//   posterImage: resData.elements[0].elements[0].elements[11].elements
//     ? resData.elements[0].elements[0].elements[11].elements[0].text
//     : '정보없음', // 포스터이미지
//   // descriptImage: [{type: "element", name: "", elements: [{ type: 'text', text: 'url경로' }]}]
//   descripImage: resData.elements[0].elements[0].elements[16].elements
//     ? resData.elements[0].elements[0].elements[16].elements
//     : [], // 공연 상세이미지
// };
