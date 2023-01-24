import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from '../../../public/asset/logo.png';
import user from '../../../public/asset/user.png';
import Image from 'next/image';

const Navbar = () => {
  const router = useRouter();

  // 현재 경로와 클릭한 메뉴의 경로가 같으면 active 클래스 추가하면 css 변경
  const isActive = (path) => {
    if (path === router.pathname) {
      return 'active';
    } else {
      return '';
    }
  };

  const loggedRouter = () => {
    return (
      <li>
        <Link href='/'>
          <Image
            src={user}
            alt='user'
            width={30}
            height={30}
            className='userAvatar'
          />
          이인재
        </Link>

        <div>
          <Link href='/subPages/MyPages'>마이페이지</Link>
          <div></div>
          <button>로그아웃</button>
        </div>
      </li>
    );
  };

  return (
    <nav>
      <Link href='/'>
        <Image src={logo} alt='로고' width={110} />
      </Link>

      <ul>
        <li>
          <Link href='/'>홈</Link>
        </li>
        <li>
          <Link href='/mainPages/Performance'>전체 공연</Link>
        </li>
        <li>
          <Link href='/subPages/BookSystem'>북마크</Link>
        </li>
      </ul>

      <ul>
        {/* 로그인 전에는 밑에 리스트가 추가되어야 하고 로그인이 완료되면 loggedRouter()실행되도록 구현해야 함(아직 미완료) */}
        <li className='main'>
          <Link href='/subPages/Login'>로그인</Link>

          <Link href='/subPages/Register'>회원가입</Link>
        </li>

        {/* {loggedRouter()} */}
      </ul>
    </nav>
  );
};

export default Navbar;
