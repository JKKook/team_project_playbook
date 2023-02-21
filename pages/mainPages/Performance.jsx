/** @jsxImportSource @emotion/react **/
import { css } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format, parse } from "date-fns";
import PerformanceList from "../../src/components/molecules/PerformanceList";
import Loading from "../../src/components/atoms/Loading";
import useGetPerformance from "../../src/store/server/getAPI/useGetPerformance";
import { GoSearch, GoCalendar } from "react-icons/go";

/**---------------------- 함수 영역-------------------------------- */

const filterCategory = (data, category) => {
    if (!data) return;
    if (category === "") return data;
    else return data.filter((c) => c.genre === category);
};

const parseDate = (date) => {
    const parseYear = date.getFullYear();
    const parseMonth = date.getMonth();
    const parseDay = date.getDate();
    return [parseYear, parseMonth, parseDay];
};

const Performance = () => {
    const { data, isLoading } = useGetPerformance();

    const [category, setCategory] = useState("");
    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    // const [openDate, setOpenDate] = useState(false);
    // const [date, setDate] = useState([
    //     {
    //         startDate: new Date(),
    //         endDate: new Date(),
    //         key: "selection",
    //     },
    // ]);

    // Fri Feb 24 2023 11:23:48 GMT+0900 (한국 표준시)
    const [startDate, setStartDate] = useState(new Date());
    const [dateData, setDateData] = useState([]);

    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);
    const { current: myData } = useRef(searchData);

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

    useEffect(() => {
        if (!data) return;

        setDateData(
            data.data.filter((v) => {
                const data = v.start.replace(/[.]/g, "");
                const parseYear = +data.slice(0, 4);
                const parseMonth = +data.slice(4, 6) - 1;
                const parseDay = +data.slice(6, 8);

                const compareDate = new Date(parseYear, parseMonth, parseDay);
                if (compareDate >= startDate) return true;
            })
        );

        console.log(dateData, parseDate(startDate));
    }, [startDate, myData]);

    if (isLoading) {
        return <Loading />;
    }

    const renderFunction = () => {
        if (dateData && !isLoading) {
            return <PerformanceList total={dateData} />;
        }
        if (searchData && !isLoading) {
            return (
                <PerformanceList total={filterCategory(searchData, category)} />
            );
        } else {
            return <PerformanceList total={data} />;
        }
    };

    return (
        <>
            {!isLoading && (
                <div css={[InputGroup]}>
                    <div css={[SelectFormContainer]}>
                        <div css={[CategoryFilter]}>
                            <select
                                name="filter"
                                value={category}
                                onChange={handleCategory}
                                css={[CategorySelect]}
                            >
                                <option value="">전체 공연</option>
                                {data &&
                                    Array.from(data.genreList).map((genre) => (
                                        <option key={genre} value={genre}>
                                            {genre}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div css={[InputFormContainer]}>
                            <form
                                onSubmit={onSearch}
                                autoComplete="off"
                                css={[InputForm]}
                            >
                                <input
                                    type="text"
                                    list="performance"
                                    value={search}
                                    placeholder="보고싶은 공연을 입력해주세요"
                                    onChange={onChange}
                                    css={[FormInput]}
                                />
                                <button type="submit" css={[SearchInputButton]}>
                                    <GoSearch />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* <div css={[CalendarContainer]}>
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
          </div> */}
                    <div css={DatePickContainer}>
                        <span css={DatePickName}>
                            원하시는 날짜를 선택해주세요:
                        </span>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* {searchData && !isLoading && (
                <PerformanceList total={filterCategory(searchData, category)} />
            )}

            {dateData && !isLoading && <PerformanceList total={dateData} />} */}
            {renderFunction()}
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

const DatePickContainer = css`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
`;

const DatePickName = css`
    width: 250px;
`;
