import axios from 'axios';
import { useQuery } from 'react-query';

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
          id: resData[0].elements ? resData[0].elements[0].text : '정보없음',
          name: resData[1].elements ? resData[1].elements[0].text : '정보없음',
          from: resData[2].elements ? resData[2].elements[0].text : '정보없음',
          to: resData[3].elements ? resData[3].elements[0].text : '정보없음',
          place: resData[4].elements ? resData[4].elements[0].text : '정보없음',
          actor: resData[5].elements ? resData[5].elements[0].text : '정보없음',
          runtime: resData[7].elements
            ? resData[7].elements[0].text
            : '정보없음',
          price: resData[10].elements
            ? resData[10].elements[0].text
            : '정보없음',
          posterImage: resData[11].elements
            ? resData[11].elements[0].text
            : '정보없음',
          genre: resData[13].elements
            ? resData[13].elements[0].text
            : '정보없음',
          descriptImage: resData[16].elements[0].elements[0].text
            ? resData[16].elements[0].elements[0].text
            : [],
        };
      },
    }
  );
};

export default useGetDescription;
