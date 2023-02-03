/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import PerformanceList from '@/src/components/molecules/PerformanceList';
import { useState, useEffect } from 'react';
import Loading from '@/src/components/atoms/Loading';
import useGetGenre from '@/src/store/server/useGetGenre';

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

const filterCategory = (data, category) => {
  if (!data) return;
  if (category === '') return data;
  else return data.filter((c) => c.genre === category);
};

const Performance = () => {
  const { data, isLoading } = useGetGenre();

  const [category, setCategory] = useState('');
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (!data) return;
    const filteredData = data.data.filter((el) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchData(filteredData);
  };
  useEffect(() => {
    if (!data) return;
    if (!search) setSearchData(data.data);
  }, [data, search]);

  if (isLoading) {
    return <Loading />;
  };

  return (
    <>
      {!isLoading && (
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
                {data &&
                  Array.from(data.genreList).map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
              </select>
            </div>
            <form onSubmit={onSearch} autoComplete='off' css={[InputForm]}>
              <input
                type='text'
                list='performance'
                value={search}
                onChange={onChange}
                css={[FormInput]}
              />
              <button type='submit'>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {searchData && !isLoading && (
        <PerformanceList total={filterCategory(searchData, category)} />
      )}
    </>
  );
};
export default Performance;
