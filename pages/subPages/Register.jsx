/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, onUserStateChange, signUp } from '../api/auth/firebase';
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
  // 이메일, 비밀번호 , 비밀번호 확인
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // 오류메시지 상태 저장
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const clearErrors = () => {
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  };

  // 쿼리 Login 컴포넌트에서 받아오기
  const router = useRouter();
  // const { query } = uRouter.query;
  // console.log(uRouter.query);

  // 현재 로그인 한 사용자 가져오기, 렌더링 시 null값 되는 것 방지
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  // 회원 가입
  const handleSignUp = async (e) => {
    e.preventDefault();
    clearErrors();
    const newRegister = signUp(email, password).then(router.push('/'));
    console.log(newRegister);
  };

  // 이메일
  const handleChangeEmail = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage(
        '올바른 이메일 형식이 아닙니다, 다시 한 번 확인 해주세요',
      );
      setIsEmail(false);
    } else {
      setEmailMessage('사용 가능한 이메일입니다 :)');
      setIsEmail(true);
    }
  };

  // 비밀번호
  const handleChangePassword = (e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    const currentPassword = e.target.value;
    setPassword(currentPassword);

    if (!passwordRegex.test(currentPassword)) {
      setPasswordMessage(
        '숫자 + 영문자 + 특수문자 조합으로 8자리 이상 입력해주세요',
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('사용가능한 비밀번호입니다');
      setIsPassword(true);
    }
  };

  // 비밀번호 확인
  const handleChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);

    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage('설정한 비밀번호가 일치하지 않습니다');
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage('비밀번호가 동일합니다');
      setIsPasswordConfirm(true);
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
              <form css={[LoginFormContainer]} onSubmit={handleSignUp}>
                <p css={[RegisterFormText]}>이메일</p>
                <input
                  css={[LoginEmailInput]}
                  type='email'
                  name='email'
                  placeholder='생성하고자 하는 이메일 주소를 입력하십시오'
                  required
                  value={email}
                  onChange={handleChangeEmail}
                />
                {email.length > 0 && (
                  <span className={`message ${isEmail ? 'success' : 'error'}`}>
                    {emailMessage}
                  </span>
                )}
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
                    onChange={handleChangePassword}
                  />
                  <div>
                    {password.length > 0 && (
                      <span
                        className={`message ${
                          isPassword ? 'success' : 'error'
                        }`}
                      >
                        {passwordMessage}
                      </span>
                    )}
                  </div>
                  <p css={RegisterFormTextSub}>
                    *비밀번호는 6자 이상이어야 하며 공백으로 시작하거나 끝날 수
                    없습니다.
                  </p>
                  <p css={RegisterFormText}>새 비밀번호 확인</p>
                  <input
                    css={LoginEmailInput}
                    type='password'
                    required
                    autoComplete='on'
                    value={passwordConfirm}
                    onChange={handleChangePasswordConfirm}
                  />
                  <div>
                    {passwordConfirm.length > 0 && (
                      <span
                        className={`message ${
                          isPasswordConfirm ? 'success' : 'error'
                        }`}
                      >
                        {passwordConfirmMessage}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    css={LoginSubmit}
                    type='submit'
                    value='PlayBook ID 생성'
                    disabled={!(isEmail && isPassword && isPasswordConfirm)}
                    // onClick={handleRouter}
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

const RegisterFormText = css`
  margin: 0.5rem 0;
  color: gray;
`;

const RegisterFormTextSub = css`
  margin: 1.5rem 0;
  color: darkgrey;
  font-size: small;
`;
