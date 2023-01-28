// 여기에 우리가 원하는 구현들을 넣으면된다
import { dehydrate, QueryClient, useQuery } from 'react-query';
import axios from 'axios';
import ImageSlider from '@/src/components/molecules/ImageSlider';
import styled from '@emotion/styled';
import HomeNavbar from '@/src/components/molecules/HomeNavbar';
import RecommendPerformance from '@/src/components/molecules/RecommendPerformance';

const getApiData = async () => {
  const response = await axios.get('http://localhost:4000/main/image');
  const arr = [];
  // console.log(response.data.elements[0].elements); // 8개 공연정보
  const resData = response.data.elements[0].elements;
  resData.map((v) => {
    const obj = {
      id: v.elements[0].elements[0].text, // 공연 id
      name: v.elements[1].elements[0].text, // 공연 이름
      image: v.elements[5].elements[0].text, // 공연 포스터이미지
    };
    arr.push(obj);
  });
  return arr;
};

// TODO: 여기에 플레이북 추천 구현
const Index = () => {
  const { data, isLoading, isFetching } = useQuery('image', getApiData);
  if (!data) {
    return <div>No data</div>;
  }
  return (
    <>
      <HomeNavbar />
      <div>{<ImageSlider performances={data} />}</div>
      <Recommend>
        <h2 style={{textAlign: 'center'}}>이런 공연은 어떠세요?</h2>
        <div style={{ margin: '10rem 0', userSelect: 'none' }}>
          {<RecommendPerformance performances={data} />}
        </div>
      </Recommend>
    </>
  );
};

export default Index;

// export const getStaticProps = async() => {
//     const queryClient = new QueryClient();
//     await queryClient.prefetchQuery("image", getApiData);
//     return {
//         props: {
//             dehydratedState: dehydrate(queryClient)
//         }
//     };
// }

const Recommend = styled.div`
  position: relative;
  top: 100px;
  left: 20px;

  font-size: 25px;
  font-weight: bold;
`;
