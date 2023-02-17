/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import PerformanceList from '../../src/components/molecules/PerformanceList';
import Loading from '../../src/components/atoms/Loading';
import useGetPerformance from '../../src/store/server/useGetPerformance';
import { GoSearch, GoCalendar } from 'react-icons/go';

/**---------------------- 함수 영역-------------------------------- */

const filterCategory = (data, category) => {
  if (!data) return;
  if (category === '') return data;
  else return data.filter((c) => c.genre === category);
};

const Performance = () => {
  const { data, isLoading } = useGetPerformance();

  const [category, setCategory] = useState('');
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const getDatesStartToEnd = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let list = [];

    while (data <= end) {
      list.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return list;
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
      el.name.toLowerCase().includes(search.toLowerCase()),
    );
    setSearchData(filteredData);
  };

  useEffect(() => {
    if (!data) return;
    if (!search) setSearchData(data.data);
  }, [data, search]);

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

          <div css={[CalendarContainer]}>
            <span css={[CalendarUsage]}>
              *원하시는 날짜가 있다면 캘린더를 이용해보세요 :)
              <GoCalendar
                onClick={() => setOpenDate(!openDate)}
                css={[SearchInputButton]}
              />
            </span>
            <span onClick={() => setOpenDate(!openDate)} css={[CalendarText]}>
              {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
                date[0].endDate,
                'MM/dd/yyyy',
              )}`}
            </span>

            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={new Date()}
                css={[Calendar]}
              />
            )}
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
`;

// calendar
const CalendarContainer = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const CalendarUsage = css`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #8785a2;
  margin-top: 0.3rem;
  cursor: pointer;
  &:hover {
    color: #364f6b;
  }
`;

const CalendarText = css`
  display: none;
`;

// when clicked, show-up
const Calendar = css`
  position: absolute;
  top: 118px;
  left: 35rem;
  z-index: 1;
`;
