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
import MyPages from './MyPages';

const Register = () => {
  // 이메일, 비밀번호 , 비밀번호 확인
  const [user, setUser] = useState();

  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  // 오류메시지 상태 저장
  const [formMessage, setFormMessage] = useState({
    emailMessage: '',
    passwordMessage: '',
    passwordConfirmMessage: '',
  });

  // 유효성 검사
  const [isForm, setIsForm] = useState({
    isEmail: false,
    isPassword: false,
    isPasswordConfirm: false,
  });

  // 에러 방지를 위해 초기값 '' 세팅
  const clearErrors = () => {
    setForm('');
  };

  // 쿼리 Login 컴포넌트에서 받아오기
  const router = useRouter();

  // 현재 로그인 한 사용자 가져오기, 렌더링 시 null값 되는 것 방지
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  // 회원 가입
  const handleSignUp = async (e) => {
    e.preventDefault();
    clearErrors();
    const result = await signUp(form.email, form.password);
    const resultRouter = await router.push('/');
    return result && resultRouter;
  };

  // 이메일
  const handleCheckEmail = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const email = e.target.value;
    setForm({ ...form, email: email });

    if (!emailRegex.test(email)) {
      setFormMessage({
        ...formMessage,
        emailMessage: '올바른 이메일 형식이 아닙니다, 다시 한 번 확인 해주세요',
      });

      setIsForm({ ...isForm, isEmail: false });
    } else {
      setFormMessage({
        ...formMessage,
        emailMessage: '사용 가능한 이메일입니다 :)',
      });
      setIsForm({ ...isForm, isEmail: true });
    }
  };

  // 비밀번호
  const handleCheckPassword = (e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    const currentPassword = e.target.value;
    setForm({ ...form, password: currentPassword });

    if (!passwordRegex.test(currentPassword)) {
      setFormMessage({
        ...formMessage,
        passwordMessage:
          '숫자 + 영문자 + 특수문자 조합으로 8자리 이상 입력해주세요',
      });
      setIsForm({ ...isForm, isPassword: false });
    } else {
      setFormMessage({
        ...formMessage,
        passwordMessage: '사용 가능한 비밀번호입니다.',
      });
      setIsForm({ ...isForm, isPassword: true });
    }
  };

  // 비밀번호 확인
  const handleCheckPasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setForm({ ...form, passwordConfirm: currentPasswordConfirm });

    if (password !== currentPasswordConfirm) {
      setFormMessage({
        ...formMessage,
        passwordConfirmMessage: '설정한 비밀번호가 일치하지 않습니다',
      });
      setIsForm({ ...form, isPasswordConfirm: false });
    } else {
      setFormMessage({
        ...formMessage,
        passwordConfirmMessage: '설정한 비밀번호가 일치합니다',
      });
      setIsForm({ ...form, isPasswordConfirm: true });
    }
  };
  // 비밀번호 변경
  const handleChangePassword = async (passwordConfirm) => {
    changePassword(passwordConfirm);
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
              <form css={[LoginFormContainer]} onSubmit={handleSignUp}>
                <p css={[RegisterFormText]}>이메일</p>
                <input
                  css={[LoginEmailInput]}
                  type='email'
                  name='email'
                  placeholder='생성하고자 하는 이메일 주소를 입력하십시오'
                  required
                  value={form.email}
                  onChange={handleCheckEmail}
                />
                {form.email.length > 0 && (
                  <span
                    css={[RegisterNoticeText]}
                    className={`message ${
                      isForm.isEmail ? 'success' : 'error'
                    }`}
                  >
                    {formMessage.emailMessage}
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
                    value={form.password}
                    onChange={handleCheckPassword}
                  />
                  <div>
                    {form.password.length > 0 && (
                      <span
                        css={[RegisterNoticeText]}
                        className={`message ${
                          isForm.isPassword ? 'success' : 'error'
                        }`}
                      >
                        {formMessage.passwordMessage}
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
                    required
                    autoComplete='on'
                    value={form.passwordConfirm}
                    onChange={handleCheckPasswordConfirm}
                  />
                  <div>
                    {form.passwordConfirm.length > 0 && (
                      <span
                        css={[RegisterNoticeText]}
                        className={`message ${
                          isForm.isPasswordConfirm ? 'success' : 'error'
                        }`}
                      >
                        {formMessage.passwordConfirmMessage}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    css={LoginSubmit}
                    type='submit'
                    value='PlayBook ID 생성'
                    disabled={!isForm}
                    onClick={handleSignUp}
                  />
                  {user && (
                    <div>
                      <button
                        css={LoginAvatarIcon}
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
  margin: 0.5rem 0;
  color: gray;
`;

export const RegisterNoticeText = css`
  color: #f08a5d;
  font-size: 14px;
  margin-bottom: 1rem;
`;
