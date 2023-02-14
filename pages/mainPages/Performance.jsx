/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import PerformanceList from '../../src/components/molecules/PerformanceList';
import { useState, useEffect } from 'react';
import Loading from '../../src/components/atoms/Loading';
import useGetPerformance from '../../src/store/server/useGetPerformance';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';

/**---------------------- 함수 영역-------------------------------- */

const filterCategory = (data, category) => {
  if (!data) return;
  if (category === '') return data;
  else return data.filter((c) => c.genre === category);
};

// const filterDate = (data, date) => {
//   if (!data) return;
// }

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

  // const startDay =
  //   date[0].startDate.getFullYear() +
  //   '.' +
  //   0 +
  //   Number(new Date().getMonth() + 1) +
  //   '.' +
  //   0 +
  //   new Date().getDate();

  //   const endDay =
  //   date[0].endDate.getFullYear() +
  //   '.' +
  //   0 +
  //   Number(new Date().getMonth() + 1) +
  //   '.' +
  //   0 +
  //   new Date().getDate();

  // console.log(getDatesStartToEnd(date[0].startDate, date[0].endDate));
  // console.log(startDay, endDay);
  // console.log(data);
  // console.log(Array.from(data.startDate));

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

          {/* <div css={[CategoryFilter]}>
              <select
                name='filter'
                value={sort}
                onChange={handleSort}
                css={[CategorySelect]}
              >
                <option value=''>All</option>
                <option value='oldest'>오래된 순</option>
                <option value='newest'>최신 순</option>
              </select>
            </div> */}

          {/* <DatePicker data={data} /> */}

          <div>
            <span
              onClick={() => setOpenDate(!openDate)}
              css={[CalendarText]}
            >{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
              date[0].endDate,
              'MM/dd/yyyy',
            )}`}</span>

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

          <form onSubmit={onSearch} autoComplete='off' css={[InputForm]}>
            <input
              type='text'
              list='performance'
              value={search}
              onChange={onChange}
              css={[FormInput]}
            />
            <button type='submit' css={[HideButton]}>
              Submit
            </button>
          </form>
        </div>
      )}
      {searchData && !isLoading && (
        <PerformanceList total={filterCategory(searchData, category)} />
      )}
    </>
  );
};

export default Performance;

const InputGroup = css`
  height: 30px;
  background-color: white;
  // border: 1px solid #495057;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0px;
  border-radius: 5px;
  position: relative;
  margin: 0 3rem;
  bottom: -25px;
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
  border-radius: 0.25rem;
  cursor: pointer;
`;

const InputForm = css`
  padding-left: 0;
  padding-right: 0;
  width: 40%;
  border: none;
  outline: none;
`;

const HideButton = css`
  display: none;
`;

const CalendarText = css`
  color: #495057;
  cursor: pointer;
  user-select: none;
`;

const Calendar = css`
  position: absolute;
  top: 50px;
  left: 25rem;
  z-index: 1;
`;
