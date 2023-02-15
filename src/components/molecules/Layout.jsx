import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { RecoilRoot } from 'recoil';
import { logout } from '../../../pages/api/auth/firebase';
import { auth } from '../../../pages/api/auth/firebase';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

const signOutNotify = () =>
  toast('반가웠어요 잘가요!', {
    icon: '👋',
  });

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  // 현재 로그인 한 사용자 가져오기, 렌더링 시 null값 되는 것 방지
  useEffect(() => {
    // isLoggedIn은 로그인, 로그아웃, 초기화 시 반응!
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
      setIsLoggedIn(true);
    });
  }, []);

  const handleLogout = () => {
    // firebase logout이 성공하게 되면 null를 받아옵니다.
    logout().then(() => router.push('/') && signOutNotify());
  };

  return (
    <div>
      <RecoilRoot>
        {isLoggedIn ? (
          <Navbar
            isLoggedIn={isLoggedIn}
            userData={userData}
            handleLogout={handleLogout}
          />
        ) : (
          ''
        )}
        <Toaster position='top-right' reverseOrder={false} />
        {children}
      </RecoilRoot>
    </div>
  );
};

export default Layout;
