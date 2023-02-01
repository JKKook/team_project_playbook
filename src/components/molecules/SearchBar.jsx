/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';

const InputForm = css`
  margin-top: 0.5rem;
  padding-left: 0;
  padding-right: 0;
  width: 40%;
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

const SearchBar = ({ onChange, value, total }) => {
  const []

  return (
    <form autoComplete='off' css={[InputForm]}>
      <input
        type='search'
        list='performance'
        placeholder='공연을 검색해주세요.'
        value={value}
        onChange={onChange}
        css={[FormInput]}
      />
    </form>
  );
};

export default SearchBar;
