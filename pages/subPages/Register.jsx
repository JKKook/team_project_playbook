/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onUserStateChange, signUp } from '../api/auth/firebase';
import AvatarImage from '../../src/components/atoms/AvatarImage';
import {
  LoginDisplay,
  LoginExtraContainer,
  LoginInnerContainer,
  LoginTitle,
  LoginSubTitle,
  LoginFormContainer,
  LoginEmailInput,
  LoginPasswordInput,
  LoginSubmit,
  LoginAvatarIcon,
  LoginSupportMsgCon,
  LoginSupportMsgFirst,
  LoginSupportMsgSecond,
} from './Login';
import Image from 'next/image';
import logo from '../../public/asset/playbook-logo.png';
import Link from 'next/link';

const Register = () => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 쿼리 Login 컴포넌트에서 받아오기
  const uRouter = useRouter();
  // const { query } = uRouter.query;
  // console.log(uRouter.query);

  // 현재 로그인 한 사용자 가져오기, 렌더링 시 null값 되는 것 방지
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  // 회원 가입
  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      setErrorMsg('');
      const newRegister = signUp(email, password);
      console.log(newRegister);
    } catch (error) {
      // Errors : https://firebase.google.com/docs/auth/admin/errors
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMsg(`${email}은 유효하지 않은 이메일 주소입니다`);
          break;

        case 'auth/invalid-password':
          setErrorMsg('비밀번호는 6자리 이상이어야 합니다');
          break;

        case 'auth/email-already-exists':
          setErrorMsg('이미 가입 된 계정입니다');
          break;
      }
    }
  };

  // email 존재 유무에 따라 value값을 이메일과 패스워드에 할당
  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  const handleLogout = () => {
    // firebase logout이 성공하게 되면 null를 받아옵니다.
    logout();
  };

  return (
    <>
      <div css={[LoginExtraContainer]}>
        <div css={[LoginInnerContainer]}>
          <div css={[LoginDisplay]}>
            <Link href='/'>
              <Image src={logo} alt='logo' width={150} />
            </Link>
            <h2 css={[LoginTitle]}>PlayBook ID 생성</h2>
            <p css={[LoginSubTitle]}>PlayBook Account 생성중</p>
          </div>
          <div css={[LoginFormContainer]}>
            {!user && (
              <form css={[LoginFormContainer]}>
                <p css={[RegisterFormText]}>이메일</p>
                <input
                  css={[LoginEmailInput]}
                  type='email'
                  name='email'
                  placeholder='생성하고자 하는 이메일 주소를 입력하십시오'
                  required
                  value={email}
                  onChange={handleChange}
                />
                <div>
                  <p css={[RegisterFormText]}>비밀번호</p>
                  <input
                    css={[LoginPasswordInput]}
                    type='password'
                    name='password'
                    placeholder='생성하고자 하는 비밀번호를 입력하십시오'
                    required
                    autoComplete='on'
                    value={password}
                    onChange={handleChange}
                  />
                  <p css={RegisterFormTextSub}>
                    *비밀번호는 6자 이상이어야 하며 공백으로 시작하거나 끝날 수
                    없습니다.
                  </p>
                  <p css={RegisterFormText}>새 비밀번호 확인</p>
                  <input
                    css={LoginEmailInput}
                    type='password'
                    name='password'
                    required
                    autoComplete='on'
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    css={LoginSubmit}
                    type='submit'
                    value='PlayBook ID 생성'
                    onClick={handleSignUp}
                  />
                  {user && (
                    <div>
                      <button css={LoginAvatarIcon} onClick={handleLogout}>
                        <AvatarImage user={user} />
                      </button>
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>
          <div css={[LoginSupportMsgCon]}>
            <span css={[LoginSupportMsgFirst]}>
              플레이북 ID가 이미 있으십니까?
            </span>
            <span
              onClick={() => uRouter.push('/subPages/Login')}
              css={LoginSupportMsgSecond}
            >
              로그인
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

const RegisterFormText = css`
  margin: 0.5rem 0;
  color: gray;
`;

const RegisterFormTextSub = css`
  margin: 1.5rem 0;
  color: darkgrey;
  font-size: small;
`;
