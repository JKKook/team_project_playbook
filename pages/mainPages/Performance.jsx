/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import { useState, useEffect, useRef } from 'react';
// import moment from 'moment';
import ko from 'date-fns/locale/ko';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PerformanceList from '../../src/components/molecules/PerformanceList';
import Loading from '../../src/components/atoms/Loading';
import useGetPerformance from '../../src/store/server/getAPI/useGetPerformance';
import { GoSearch, GoCalendar } from 'react-icons/go';

/**---------------------- 함수 영역-------------------------------- */

const filterCategory = (data, category) => {
  if (data === null || undefined) return;
  if (category === '') return data;
  else return data.filter((c) => c.genre === category);
};

// const parseDate = (date) => {
//   const parseYear = date.getFullYear();
//   const parseMonth = date.getMonth();
//   const parseDay = date.getDate();
//   return [parseYear, parseMonth, parseDay];
// };

const Performance = () => {
  const { data, isLoading } = useGetPerformance();

  const [category, setCategory] = useState('');
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  // 검색 파트
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  // const { current: myData } = useRef(searchData);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    // if (!data) return;
    const filteredData = data.data.filter((el) =>
      el.name.toLowerCase().includes(search.toLowerCase()),
    );
    setSearchData(filteredData);
  };

  // data 지속성 관리 어디서? ,  출처 : useGetPerformance
  useEffect(() => {
    if (!data) return;
    if(!search) setSearchData(data.data);
  }, [data, search]);

  //
  useEffect(() => {
    if (!searchData) return;
    const newData = searchData.filter((item) => {
      if (new Date(item.start) >= startDate) {
        return item;
      }
    });
    // console.log(searchData);
    // if (!search) return setSearchData(newData);
    setSearchData(newData);
  }, [startDate, search]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!isLoading && (
        <div css={[InputGroup]}>
          <div css={[SelectFormContainer]}>
            <div css={[CategoryFilter]}>
              <select
                name='filter'
                value={category}
                onChange={handleCategory}
                css={[CategorySelect]}
              >
                <option value=''>전체 공연</option>
                {data &&
                  Array.from(data.genreList).map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
              </select>
            </div>
            <div css={[InputFormContainer]}>
              <form onSubmit={onSearch} autoComplete='off' css={[InputForm]}>
                <input
                  type='text'
                  list='performance'
                  value={search}
                  placeholder='보고싶은 공연을 입력해주세요'
                  onChange={onChange}
                  css={[FormInput]}
                />
                <button type='submit' css={[SearchInputButton]}>
                  <GoSearch />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {!isLoading && searchData && (
        <PerformanceList total={filterCategory(searchData, category)} />
      )}
    </>
  );
};

export default Performance;

// category
const InputGroup = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  margin: 2rem 3rem;
  gap: 1rem;
`;

const SelectFormContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CategoryFilter = css`
  display: flex;
  padding-left: 0;
  padding-right: 0;
`;

const CategorySelect = css`
  display: inline-block;
  padding: 0.4rem 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  cursor: pointer;
`;

// search Input
const InputFormContainer = css`
  display: flex;
  flex-direction: column;
  flex-basis: 89%;
`;

const FormInput = css`
  display: flex;
  padding: 0.4rem 0;
  padding-left: 5px;
  width: 350px;
  font-size: 1rem;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

const InputForm = css`
  display: flex;
  align-items: center;
  width: 40%;
  border: none;
  outline: none;
`;

const SearchInputButton = css`
  display: flex;
  border: none;
  margin-left: 0.3rem;
  font-size: 1.5rem;
  color: #8785a2;
  background-color: white;
`;

// calendar
const CalendarContainer = css`
  display: flex;
  align-items: center;
  user-select: none;
`;

const CalendarIcon = css`
  border: none;
  margin-left: 0.3rem;
  font-size: 1.5rem;
  color: #8785a2;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: #364f6b;
  }
`;

const CalendarUsage = css`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #8785a2;
  margin-top: 0.3rem;
  &:hover {
    color: #364f6b;
  }
`;

const DateInput = css`
  margin-top: 6px;
  margin-left: 20px;
  text-align: center;
  border: 1px solid #8785a2;
  border-radius: 5px;
  color: #8785a2;
  cursor: pointer;
`;
