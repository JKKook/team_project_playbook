/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { onUserStateChange, signUp } from '../api/auth/firebase';
import {
  LoginDisplay,
  LoginExtraContainer,
  LoginInnerContainer,
  LoginTitle,
  LoginSubTitle,
  LoginFormContainer,
  LoginEmailInput,
  LoginSubmit,
  LoginAvatarIcon,
  LoginSupportMsgCon,
  LoginSupportMsgFirst,
  LoginSupportMsgSecond,
} from './Login';
import Image from 'next/image';
import logo from '../../public/asset/playbook-logo.png';
import Link from 'next/link';
import { emailRegex, passwordRegex } from '../../src/utils/auth-regex';
import { useRecoilState } from 'recoil';

import {
  userState,
  userFormMessageState,
  userFormState,
  isUserState,
} from '../../src/components/Recoil/recoil-auth';

const Register = () => {
  // 로그인 user 유무
  const [user, setUser] = useRecoilState(userState);
  // 이메일, 비밀번호 , 비밀번호 확인
  const [registerForm, setRegisterForm] = useRecoilState(userFormState);
  // 오류메시지 상태 저장
  const [registerStateMessage, setRegisterStateMessage] =
    useRecoilState(userFormMessageState);
  // 유효성 검사
  const [isForm, setIsForm] = useRecoilState(isUserState);

  // 에러 방지를 위해 초기값 '' 세팅
  const clearErrors = () => {
    setRegisterForm('');
  };

  // 현재 로그인 한 사용자 가져오기, 렌더링 시 null값 되는 것 방지
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  // 동적 라우팅 활용
  const router = useRouter(); // null
  // 회원 가입
  const handleSignUp = async (e) => {
    e.preventDefault();
    clearErrors();
    const result = await signUp(registerForm.email, registerForm.password);
    const resultRouter = await router.push('/');
    return result && resultRouter;
  };

  // 이메일 유효성 테스트
  const handleCheckEmail = (e) => {
    const vaildateEmail = emailRegex;
    const email = e.target.value;
    setRegisterForm({ ...registerForm, email: email });

    if (!vaildateEmail.test(email)) {
      setRegisterStateMessage({
        ...registerStateMessage,
        emailMessage: '올바른 이메일 형식이 아닙니다, 다시 한 번 확인 해주세요',
      });

      setIsForm({ ...isForm, isEmail: false });
    } else {
      setRegisterStateMessage({
        ...registerStateMessage,
        emailMessage: '사용 가능한 이메일입니다 :)',
      });
      setIsForm({ ...isForm, isEmail: true });
    }
  };

  // 비밀번호 유효성 테스트
  const handleCheckPassword = (e) => {
    const validatePassword = passwordRegex;
    const currentPassword = e.target.value;
    setRegisterForm({ ...registerForm, password: currentPassword });

    if (!validatePassword.test(currentPassword)) {
      setRegisterStateMessage({
        ...registerStateMessage,
        passwordMessage:
          '숫자 + 영문자 + 특수문자 조합으로 8자리 이상 입력해주세요',
      });
      setIsForm({ ...isForm, isPassword: false });
    } else {
      setRegisterStateMessage({
        ...registerStateMessage,
        passwordMessage: '사용 가능한 비밀번호입니다.',
      });
      setIsForm({ ...isForm, isPassword: true });
    }
  };

  // 비밀번호 확인 유효성 테스트
  const handleCheckPasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setRegisterForm({
      ...registerForm,
      passwordConfirm: currentPasswordConfirm,
    });

    if (registerForm.password !== currentPasswordConfirm) {
      setRegisterStateMessage({
        ...registerStateMessage,
        passwordConfirmMessage: '설정한 비밀번호가 일치하지 않습니다',
      });
      setIsForm({ ...registerForm, isPasswordConfirm: false });
    } else {
      setRegisterStateMessage({
        ...registerStateMessage,
        passwordConfirmMessage: '설정한 비밀번호가 일치합니다',
      });
      setIsForm({ ...registerForm, isPasswordConfirm: true });
    }
  };

  // 로그아웃
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
              <form
                css={[LoginFormContainer]}
                method='post'
                onSubmit={handleSignUp}
              >
                <p css={[RegisterFormText]}>이메일</p>
                <input
                  css={[LoginEmailInput]}
                  type='email'
                  name='email'
                  placeholder='생성하고자 하는 이메일 주소를 입력하십시오'
                  required
                  value={registerForm.email}
                  onChange={handleCheckEmail}
                />
                {registerForm.email !== null && (
                  <span
                    css={[RegisterNoticeText]}
                    className={`message ${
                      isForm.isEmail ? 'success' : 'error'
                    }`}
                  >
                    {registerStateMessage.emailMessage}
                  </span>
                )}
                <div>
                  <p css={[RegisterFormText]}>비밀번호</p>
                  <input
                    css={[LoginEmailInput]}
                    type='password'
                    name='password'
                    placeholder='생성하고자 하는 비밀번호를 입력하십시오'
                    required
                    autoComplete='on'
                    value={registerForm.password}
                    onChange={handleCheckPassword}
                  />
                  <div>
                    {registerForm.password !== null && (
                      <span
                        css={[RegisterNoticeText]}
                        className={`message ${
                          isForm.isPassword ? 'success' : 'error'
                        }`}
                      >
                        {registerStateMessage.passwordMessage}
                      </span>
                    )}
                  </div>
                  <div css={{ marginTop: '2rem' }}>
                    <p css={[RegisterFormText]}>새 비밀번호 확인</p>
                  </div>
                  <input
                    css={[LoginEmailInput]}
                    type='password'
                    name='password'
                    placeholder='생성하고자 하는 비밀번호를 확인하십시오'
                    required
                    autoComplete='on'
                    value={registerForm.passwordConfirm}
                    onChange={handleCheckPasswordConfirm}
                  />
                  <div>
                    {registerForm.passwordConfirm !== null && (
                      <span
                        css={[RegisterNoticeText]}
                        className={`message ${
                          isForm.isPasswordConfirm ? 'success' : 'error'
                        }`}
                      >
                        {registerStateMessage.passwordConfirmMessage}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    css={LoginSubmit}
                    type='submit'
                    value='PlayBook ID 생성'
                    disabled={!{ ...isForm }}
                    onClick={handleSignUp}
                  />
                  {user && (
                    <div>
                      <button
                        css={[LoginAvatarIcon]}
                        onClick={handleLogout}
                      ></button>
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
              onClick={() => router.push('/subPages/Login')}
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

export const RegisterFormText = css`
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: gray;
`;

export const RegisterNoticeText = css`
  color: #f08a5d;
  font-size: 14px;
`;
