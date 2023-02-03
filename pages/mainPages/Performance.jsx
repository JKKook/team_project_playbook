/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import { useQuery } from 'react-query';
import filterSearch from '@/src/components/atoms/FilterSearch';
import { useRouter } from 'next/router';
import axios from 'axios';
import PerformanceList from '@/src/components/molecules/PerformanceList';
import { useState, useEffect } from 'react';
import Loading from '@/src/components/atoms/Loading';

/**---------------------- style 영역-------------------------------- */

const InputGroup = css`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  margin-top: 1rem;
`;

const FormInput = css`
  width: 100%;
  height: calc(1.5em em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

const CategoryFilter = css`
  margin-top: 0.5rem;
  display: flex;
  padding-left: 0;
  padding-right: 0;
`;

const CategorySelect = css`
  display: inline-block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const InputForm = css`
  margin-top: 0.5rem;
  padding-left: 0;
  padding-right: 0;
  width: 40%;
`;

/**---------------------- 함수 영역-------------------------------- */

export const getTotalApi = async (key) => {
  const response = await axios.get('http://localhost:4000/main/total');
  const arr = [];
  const resData = response.data.elements[0].elements;

  // console.log(key);
  const category = key.queryKey[1].genre;
  // console.log(category);

  //useLocation
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
  // console.log(result);
  const result = arr.filter((e) => e.genre === category);
  if (category === '') return arr;
  return result;
};

const Performance = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [bookmark, setBookmark] = useState([]);

  const { data, status, isLoading } = useQuery(
    ['total', { genre: category }],
    getTotalApi,
    {
      select: (total) =>
        total.filter((performance) => performance.name.includes(search)),
    }
    // { staleTime: Infinity, cacheTime: Infinity }
  );

  const router = useRouter();

  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };

  // useEffect(() => {
  //   filterSearch({ router, search: search ? search : 'all' });
  // }, [search]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <div css={[InputGroup]}>
          <div css={[CategoryFilter]}>
            <select
              name='filter'
              value={category}
              onChange={handleCategory}
              css={[CategorySelect]}
            >
              <option value='all'>전체 공연</option>

              {/* option value 중복 제거 */}
              {status === 'success' &&
                data
                  ?.filter(
                    (arr, index, callback) =>
                      index ===
                      callback.findIndex((el) => el.genre === arr.genre)
                  )
                  .map((item) => (
                    <option key={item.id} value={item.genre}>
                      {item.genre}
                    </option>
                  ))}
            </select>
          </div>

          <form autoComplete='off' css={[InputForm]}>
            <input
              type='text'
              list='performance'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              css={[FormInput]}
            />
          </form>
        </div>
      </div>
      <PerformanceList total={data} search={search} />
    </>
  );
};
export default Performance;
