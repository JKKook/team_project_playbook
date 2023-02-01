/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { getTotalApi } from '@/pages/mainPages/Performance';
import filterSearch from '../atoms/FilterSearch';
import { useRouter } from 'next/router';

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

const Filter = ({ total }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const { status } = useQuery(
    ['total', { genre: category }],
    getTotalApi
  );

  const router = useRouter();

  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };

  useEffect(() => {
    filterSearch({ router, search: search ? search : 'all' });
  }, [search]);

  return (
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
            total
              .filter(
                (arr, index, callback) =>
                  index === callback.findIndex((el) => el.genre === arr.genre)
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
          type='search'
          list='performance'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          css={[FormInput]}
        />
      </form>
    </div>
  );
};

export default Filter;
