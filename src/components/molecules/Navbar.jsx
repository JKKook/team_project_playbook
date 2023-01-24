/** @jsxImportSource @emotion/react */

import Link from 'next/link';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import logo from '../../../public/asset/playbook-logo.png';
import user from '../../../public/asset/user.png';
import Image from 'next/image';

const NavContainer = css`
  position: relative;
  width: 100%;
  margin: auto;
  // top: 0;
  // right: 0;
  // z-index: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(248, 249, 250, 1);
  transition: all 0.5s ease;
`;

const NavbarLogo = css`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const NavBar = css`
  display: flex;

  margin-right: 2rem;

  .NavBarLink {
    color: rgba(0, 0, 0, 0.55);
    font-weight: 600;
    padding: 5px 0;
    margin: 0 30px;
    transition: all 0.5s ease;

    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }

  .active {
    color: rgba(0, 0, 0, 0.8);
  }
`;

const Dropdown = css`
  position: relative;
`;

const DropdownToggle = css`
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.8);

  &::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }
`;

const DropdownMenu = css`
  position: absolute;
  top: 130%;
  left: -1.9rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  min-width: 10rem;
  margin: 0.125rem 0 0;
  color: #212529;
  text-align: center;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
`;

const DropdownItem = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 1rem;

  clear: both;
  font-weight: 400;
  color: #212529;
  background-color: transparent;
  border: 0;
`;

const Divider = css`
  height: 0;
  overflow: hidden;
  border-top: 1px solid #e9ecef;
`;

const Button = css`
  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

const Main = css`
  display: flex;
  align-items: center;

  .MainLink {
    display: flex;
    align-items: center;
    margin-right: 25px;
    margin-left: 10px;
    color: rgba(0, 0, 0, 0.55);
    font-weight: 600;
    transition: all 0.5s ease;

    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }

  .active {
    color: rgba(0, 0, 0, 0.8);
  }
`;

const UserAvatar = css`
  border-radius: 50%;
  transform: translateY(-3px);
  margin-right: 3px;
`;

const Navbar = () => {
  const router = useRouter();
  // const handleShow = () => {
  //   setShow((prev) => !prev);
  // };

  // 현재 경로와 클릭한 메뉴의 경로가 같으면 active 클래스 추가하면 css 변경
  const isActive = (path) => {
    if (path === router.pathname) {
      return ' active';
    } else {
      return '';
    }
  };

  const loggedRouter = () => {
    return (
      <li css={[Dropdown]}>
        <Link href='/' css={[DropdownToggle]}>
          <Image
            src={user}
            alt='user'
            width={30}
            height={30}
            css={[UserAvatar]}
          />
          이인재
        </Link>

        <div css={[DropdownMenu]}>
          <Link css={[DropdownItem]} href='/subPages/MyPages'>
            마이페이지
          </Link>
          <div css={[Divider]}></div>
          <button css={[DropdownItem, Button]}>로그아웃</button>
        </div>
      </li>
    );
  };

  return (
    <nav css={[NavContainer]}>
      <Link href='/' css={[NavbarLogo]}>
        <Image src={logo} alt='로고' width={110} />
      </Link>

      <ul css={[NavBar]}>
        <li>
          <Link href='/' className={'NavBarLink' + isActive('/')}>
            홈
          </Link>
        </li>
        <li>
          <Link
            href='/mainPages/Performance'
            className={'NavBarLink' + isActive('/mainPages/Performance')}
          >
            전체 공연
          </Link>
        </li>
        <li>
          <Link
            href='/subPages/BookSystem'
            className={'NavBarLink' + isActive('/subPages/BookSystem')}
          >
            북마크
          </Link>
        </li>
      </ul>

      <ul css={[NavBar]}>
        {/* 로그인 전에는 밑에 리스트가 추가되어야 하고 로그인이 완료되면 loggedRouter()실행되도록 구현해야 함(아직 미완료) */}
        <li css={[Main]}>
          <Link
            href='/subPages/Login'
            className={'MainLink' + isActive('/subPages/Login')}
          >
            로그인
          </Link>
        </li>

        {/* {loggedRouter()} */}
      </ul>
    </nav>
  );
};

export default Navbar;
