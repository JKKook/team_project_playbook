/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import toast, { Toaster } from 'react-hot-toast';
import {
  addDocRef,
  loginWithGoogle,
  loginWithMeta,
  logout,
  onUserStateChange,
  signIn,
} from '../api/auth/firebase';
import logo from '../../public/asset/playbook-logo.png';
import { userFormState } from '../../src/recoil/recoil-auth';

const signInNotify = () =>
  toast.success('로그인 되었습니다!', {
    style: {
      transition: 'all 0.3s ease-in',
    },
  });

const Login = () => {
  // 로그인한 사용자의 정보
  const [user, setUser] = useState(); // null, undefined 초기값
  const [loginForm, setLoginForm] = useRecoilState(userFormState);

  const handleFormValue = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  // rotuer
  const router = useRouter();

  // email과 비밀번호로 로그인
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const authUser = await signIn(loginForm.email, loginForm.password);
      const resultRouter = await router.push('/');
      return authUser && resultRouter;
    } catch (err) {}
  };

  // 현재 로그인 한 사용자 가져오기, 렌더링 시 null값 되는 것 방지
  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  const handleMetaLogin = () => {
    loginWithMeta();
  };

  const handleLogout = () => {
    // firebase logout이 성공하게 되면 null를 받아옵니다.
    logout();
  };

  return (
    <>
      {!user ? (
        <div css={[LoginExtraContainer]}>
          <div css={[LoginInnerContainer]}>
            <div css={[LoginDisplay]}>
              <Link href='/'>
                <Image src={logo} alt='logo' width={150} />
              </Link>
              <h2 css={[LoginTitle]}>로그인</h2>
              <p css={[LoginSubTitle]}>PlayBook Account(으)로 계속 이동</p>
            </div>
            <div css={[LoginFormContainer]}>
              <form onSubmit={handleSignIn} method='post'>
                <input
                  css={[LoginEmailInput]}
                  type='email'
                  name='email'
                  placeholder='이메일을 입력해주십시오'
                  required
                  defaultValue={loginForm.email}
                  onChange={handleFormValue}
                />
                <div>
                  <input
                    css={[LoginPasswordInput]}
                    type='password'
                    name='password'
                    placeholder='비밀번호를 입력해주십시오'
                    required
                    defaultValue={loginForm.password}
                    autoComplete='on'
                    onChange={handleFormValue}
                  />
                </div>
                <div>
                  <input
                    css={[LoginSubmit]}
                    type='submit'
                    defaultValue='로그인'
                    disabled={!loginForm.email && !loginForm.password}
                    onClick={handleSignIn && signInNotify}
                  />
                </div>
              </form>
              <form>
                <p css={[LoginOptionText]}>또는</p>
                <input
                  css={[LoginWithSocial]}
                  defaultValue='Google(으)로 계속하기'
                  onClick={handleGoogleLogin}
                />
                <input
                  css={[LoginWithSocial]}
                  defaultValue='Meta / FaceBook(으)로 계속하기'
                  onClick={handleMetaLogin}
                />
              </form>
            </div>
            <div css={[LoginSupportMsgCon]}>
              <span css={[LoginSupportMsgFirst]}>
                플레이북 이용이 처음이십니까?
              </span>
              <span
                css={[LoginSupportMsgSecond]}
                onClick={() => router.push('/subPages/Register')}
              >
                {!loginForm.newAccount ? '회원가입' : '로그인'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <Toaster position='top-right' reverseOrder={false} autoClose={1000} />
    </>
  );
};

export default Login;

export const LoginExtraContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #3c6255;
`;

export const LoginInnerContainer = css`
  padding-top: 15px;
  padding-bottom: 50px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 10px 10px 5px -2px rgba(0, 0, 0, 0.07);
  webkit-box-shadow: 10px 10px 5px -2px rgba(0, 0, 0, 0.07);
  moz-box-shadow: 10px 10px 5px -2px rgba(0, 0, 0, 0.07);
`;

export const LoginDisplay = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 0px;
`;

export const LoginTitle = css`
  margin-bottom: 0.5rem;
  font-size: 26px;
  font-weight: bold;
`;

export const LoginSubTitle = css`
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  color: gray;
`;

export const LoginFormContainer = css`
  display: flex;
  flex-direction: column;
`;

export const LoginEmailInput = css`
  width: 450px;
  height: 36px;
  border: 1px solid gray;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  text-indent: 1rem;
  font-size: 16px;
`;

export const LoginPasswordInput = css`
  width: 450px;
  height: 36px;
  border: 1px solid gray;
  border-radius: 4px;
  text-indent: 1rem;
  font-size: 16px;
`;

export const LoginSubmit = css`
  width: 455px;
  height: 50px;
  border: none;
  border-radius: 4px;
  margin: 1rem 0;
  font-size: 20px;
  color: white;
  background-color: #a3bb98;
  cursor: pointer;
  &:hover {
    background-color: #3c6255;
  }
`;

export const LoginOptionText = css`
  display: flex;
  flex-basis: 100%;
  aligin-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 16px;
  margin: 1rem 0;
  &:before {
    content: '';
    flex-grow: 1;
    margin: 0 0.7rem;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 3px;
  }
  &:after {
    content: '';
    flex-grow: 1;
    margin: 0 0.7rem;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 3px;
  }
`;

export const LoginWithSocial = css`
  display: flex;
  justify-content: center;
  width: 450px;
  height: 42px;
  border: 1px solid gray;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: semi-bold;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  &:hover {
    background-color: #52616b;
    color: #ffffff;
  }
`;

// 로그인 시, MyPages로 이동 예정
export const LoginAvatarIcon = css`
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 50%;
  top: 2rem;
  padding: 0;
  cursor: pointer;
`;

export const LoginSupportMsgCon = css`
  text-align: left;
  margin-top: 4rem;
`;

export const LoginSupportMsgFirst = css`
  color: gray;
`;

export const LoginSupportMsgSecond = css`
  margin-left: 1rem;
  color: #658864;
  font-weight: 600;
  cursor: pointer;
  &:hover { text-decoration: underline; color: #1A0000;
`;
