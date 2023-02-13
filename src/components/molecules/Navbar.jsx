/** @jsxImportSource @emotion/react */
import Link from 'next/link';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import logo from '../../../public/asset/playbook-logo.png';
import user from '../../../public/asset/user.png';
import Image from 'next/image';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import AvatarImage from '../atoms/AvatarImage';
import { FiLogOut } from 'react-icons/fi';
import { MdContactPage } from 'react-icons/md';

const Navbar = ({ isLoggedIn, handleLogout, userData }) => {
  console.log(!!isLoggedIn);
  console.log('Nav : isUserData', userData);

  const router = useRouter();
  // router.pathname을 pathname이라는 변수에 저장
  const pathname = router.pathname;

  // useRef로 DOM 접근하도록 생성
  const outsideRef = useRef(null);

  const [open, setOpen] = useState(false);

  /** ------------------------------- 함수 영역 ------------------------------------ */

  // dropdown menu toggle되도록 함수 생성
  const handleOpen = () => {
    setOpen(!open);
  };

  // 현재 document에서 mousedown 이벤트가 동작하면 handleClickOutSide 함수 호출
  // 현재 document에 이벤트리스너 추가 및 제거
  // useEffect로 한 번 실행된 후에 'mousedown' 이벤트가 동작해도 handleClickOutSide가 동작하지 않음.
  useEffect(() => {
    // dropdown 영역이 활성화된 상태이면서 outsideRef.current에 이벤트가 발생한 html element가 포함되어 있지 않을 경우 false로 바꿔주며 dropdown 영역을 닫는다.
    const handleClickOutSide = (e) => {
      if (open && !outsideRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('click', handleClickOutSide);
    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  });

  // 로그인 완료 후에는 로그인 링크가 사라지고 아바타 이미지 및 드롭다운이 구현되도록 loggedRouter함수 만들어줌.
  const loggedRouter = () => {
    return (
      <li
        css={[Dropdown]}
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        <div css={[DropdownToggle]}>
          {userData && userData.photoURL ? (
            <AvatarImage userData={userData} />
          ) : (
            <Image
              src={user}
              alt='user'
              width={30}
              height={30}
              css={[UserAvatar]}
            />
          )}

          {userData && (
            <span css={[UserAvatarDisPlayName]}>
              {`${userData.displayName}`}님
            </span>
          )}
        </div>
        {/* 클릭하면 dropdown menu가 열리도록, 다시 클릭하면 닫히도록, dropdown 영역 밖을 클릭하면 dropdown 영역 사라지도록 */}
        {open ? (
          <div css={[DropdownMenu]} ref={outsideRef}>
            <div css={[DropdownItem]}>
              <div>
                <p css={[DropDownUserAvatarDisPlayName]}>
                  {`${userData.displayName}님 `}
                </p>
                <p>방문해주셔서 감사합니다</p>
              </div>
            </div>

            <Link
              css={[DropdownItem, DropdownItemLink]}
              href={{ pathname: '/subPages/MyPages', query: userData.photoURL }}
            >
              <MdContactPage css={[DropDownIcon]} /> 마이페이지
            </Link>
            <div css={[Divider]}></div>

            <button css={[DropdownItem, Button]} onClick={handleLogout}>
              <FiLogOut css={[DropDownIcon]} /> 로그아웃
            </button>
          </div>
        ) : null}
      </li>
    );
  };

  // 같은 코드를 사용하는 부분을 배열로 묶음.
  const NavRouterData = [
    {
      id: 0,
      link: '/',
      title: '홈',
    },
    {
      id: 1,
      link: '/mainPages/Performance',
      title: '전체 공연',
    },
    {
      id: 2,
      link: '/subPages/Bookmark',
      title: '북마크',
    },
    {
      id: 3,
      link: '/mainPages/Support',
      title: '고객센터',
      query: !userData
        ? ''
        : {
            user: [
              userData.uid,
              userData.displayName,
              userData.email,
              userData.photoURL,
            ],
          },
    },
  ];

  return (
    <nav css={[NavContainer]}>
      <Link href='/' css={[NavbarLogo]}>
        <Image src={logo} alt='로고' width={110} />
      </Link>
      <ul css={[NavBar]}>
        {/* classnames 라이브러리를 활용해 기존 NavBarLink의 클래스도 사용하고 isActive라는 클래스는 router.pathname이 배열의 객체 내에 link랑 같으면 활성화됨. */}
        {NavRouterData.map((data) => (
          <li key={data.id}>
            <Link
              className={classNames('NavBarLink', {
                isActive: pathname === data.link,
              })}
              href={{
                pathname: data.link,
                query: data.query,
              }}
              as={`/about/question/${userData}`}
            >
              {data.title}
            </Link>
          </li>
        ))}
      </ul>
      <ul css={[NavBar]}>
        {/* 로그인 전에는 밑에 리스트가 추가되어야 하고 로그인이 완료되면 loggedRouter()실행되도록 구현해야 함(아직 미완료) */}
        {!userData ? (
          <li css={[Main]}>
            <Link
              href='/subPages/Login'
              className={classNames('MainLink', {
                isActive: pathname === '/subPages/Login',
              })}
            >
              로그인
            </Link>
          </li>
        ) : (
          loggedRouter()
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

const NavContainer = css`
  // position: fixed;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // box-shadow: 1px 1px 3px 1px #d5dada;
  transition: all 0.5s ease;
  background: #adc5c5;
  z-index: 1000;
  // opacity: 0.8
  scroll-snap-stop: always;
`;

const NavbarLogo = css`
  display: flex;
  align-items: center;
  margin-left: 4rem;
`;

const NavBar = css`
  display: flex;
  margin-right: 3rem;
  .NavBarLink {
    color: rgba(0, 0, 0, 0.55);
    font-weight: 600;
    padding: 5px 0;
    margin: 0 2rem;
    transition: all 0.5s ease;
    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
    &:first-of-type {
      padding-left: 5rem;
    }
  }
  .isActive {
    color: rgba(0, 0, 0, 0.8);
  }
`;

const Dropdown = css`
  position: relative;
`;

const DropdownToggle = css`
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.55);
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
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
  left: -9.8rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  font-weight: 400;
  color: #212529;
  padding: 0.25rem 1.5rem;
  text-align: inherit;
  background-color: transparent;
  border: 0;
  &:hover {
    background-color: #e7ecef;
  }
`;

const DropdownItemLink = css`
  margin-top: 0.8rem;
  margin-bottom: 0.7rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
`;

const Divider = css`
  height: 0;
  overflow: hidden;
  border-top: 1px solid #e9ecef;
`;

const Button = css`
  display: flex;
  justify-content: center;
  margin-top: 0.6rem;
  margin-bottom: 0.6rem;
  font-size: inherit;
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
  .isActive {
    color: rgba(0, 0, 0, 0.8);
  }
`;

export const UserAvatar = css`
  border-radius: 50%;
  transform: translateY(-3px);
  margin-right: 3px;
`;

const UserAvatarDisPlayName = css`
  max-width: 150px;
  white-space: no-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const DropDownUserAvatarDisPlayName = css`
  padding: 1rem;
  max-width: 100px;
  word-break: break-all;
`;

const DropDownIcon = css`
  margin-right: 0.3rem;
  font-size: 1.2rem;
`;
