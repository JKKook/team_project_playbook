/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div css={[Background]}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;

const Background = css`
  background: radial-gradient(
    63.1% 88.47% at 55.91% -10.51%,
    rgb(203, 202, 202) 0%,
    rgb(49, 69, 65) 100%
  );
`;
