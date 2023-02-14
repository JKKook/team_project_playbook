/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { passwordRegex } from '../../src/utils/auth-regex';
import { RegisterNoticeText } from './Register';
import Reservation from '../../src/components/molecules/reservation/Reservation';
import useGetReservation from '../../src/store/server/useGetReservation';
import avatar from '../../public/asset/user.png';
import { useRecoilState } from 'recoil';
import {
  userFormMessageState,
  userFormState,
  isUserState,
} from '../../src/recoil/recoil-auth';
import {
  changePassowordFromEmail,
  changePassword,
  changeProfile,
} from '../api/auth/firebase';

const MyPages = ({ user }) => {
  const router = useRouter();
  console.log('mypage', router.query);

  const [userData, setUserData] = useRecoilState(userFormState);
  const [registerForm, setRegisterForm] = useRecoilState(userFormMessageState);
  const [isForm, setIsForm] = useRecoilState(isUserState);

  // 실시간으로 input의 데이터가 입력되도록
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // 선택한 이미지가 저장되도록
  const changeAvatar = (e) => {
    e.preventDefault();
    changeProfile(router.query.userAvatar);
  };

  // 에러 방지를 위해 초기값 '' 세팅
  const clearErrors = () => {
    setRegisterForm('');
  };

  // 비밀번호
  const handleCheckPassword = (e) => {
    const validatePassword = passwordRegex;
    const currentPassword = e.target.value;
    setUserData({ ...userData, password: currentPassword });

    if (!validatePassword.test(currentPassword)) {
      setRegisterForm({
        ...registerForm,
        passwordMessage:
          '숫자 + 영문자 + 특수문자 조합으로 8자리 이상 입력해주세요',
      });
      setIsForm({ ...isForm, isPassword: false });
    } else {
      setRegisterForm({
        ...registerForm,
        passwordMessage: '사용 가능한 비밀번호입니다.',
      });
      setIsForm({ ...isForm, isPassword: true });
    }
  };

  // 비밀번호 확인
  const handleCheckPasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setUserData({
      ...userData,
      passwordConfirm: currentPasswordConfirm,
    });

    if (userData.password !== currentPasswordConfirm) {
      setRegisterForm({
        ...registerForm,
        passwordConfirmMessage: '설정한 비밀번호가 일치하지 않습니다',
      });
      setIsForm({ ...registerForm, isPasswordConfirm: false });
    } else {
      setRegisterForm({
        ...registerForm,
        passwordConfirmMessage: '설정한 비밀번호가 일치합니다',
      });
      setIsForm({ ...registerForm, isPasswordConfirm: true });
    }
  };

  // 비밀번호 변경
  const handleChangePassword = async (e) => {
    e.preventDefault();
    clearErrors();
    const result = await changePassword(user, userData.password).then(
      alert('비밀번호가 변경되었습니다.')
    );
    return result;
  };

  // email 인증을 통해 비밀번호 변경
  const handleChangePasswordThroughEmail = async () => {
    const result = await changePassowordFromEmail(userData.email).then(
      alert('해당 이메일로 비밀번호 변경 요청을 보냈습니다.')
    );
    return result;
  };

  const { data, isLoading } = useQuery(['listApi'], useGetReservation);

  return (
    <div css={[MyPageStyle]}>
      <Head>
        <title>마이페이지</title>
      </Head>

      <section css={[MypageSection]}>
        <div css={[DetailSection]}>
          <h2 css={[Text]}>프로필</h2>
          <div css={[Avatar]}>
            <Image src={avatar} alt='avatar' width={150} css={[AvatarImage]} />
            <span css={[ChangeImage]}>
              <p>변경</p>
              <input
                type='file'
                name='file'
                css={[UploadFile]}
                accept='image/*'
                onChange={changeAvatar}
              />
            </span>
          </div>
          <form method='post'>
            <div css={[FormGroup]}>
              <label css={[LabelText]} htmlFor='name'>
                이름
              </label>
              <input
                type='text'
                name='name'
                css={[FormInput]}
                placeholder='이름을 작성하세요.'
                onChange={handleChange}
              />
            </div>

            <div css={[FormGroup]}>
              <label css={[LabelText]} htmlFor='email'>
                Email
              </label>
              <input
                type='text'
                name='email'
                value={userData.email}
                css={[FormInput]}
                placeholder='Email을 작성하세요.'
                // disabled={true}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                onClick={handleChangePasswordThroughEmail}
                css={[Button]}
                disabled={!userData.email}
              >
                이메일로 비밀번호 변경 링크 받기
              </button>
            </div>

            <div css={[FormGroup]}>
              <label css={[LabelText]} htmlFor='password'>
                비밀번호
              </label>
              <input
                type='password'
                name='password'
                autoComplete='on'
                css={[FormInput]}
                placeholder='새 비밀번호를 작성하세요.'
                disabled={!handleCheckPassword}
                onChange={handleCheckPassword}
              />
            </div>
            <div>
              {userData.password.length > 0 && (
                <span
                  css={[RegisterNoticeText]}
                  className={`message ${
                    isForm.isPassword ? 'success' : 'error'
                  }`}
                >
                  {registerForm.passwordMessage}
                </span>
              )}
            </div>

            <div css={[FormGroup]}>
              <label css={[LabelText]} htmlFor='cf_password'>
                비밀번호 확인
              </label>
              <input
                type='password'
                name='passwordConfirm'
                autoComplete='on'
                css={[FormInput]}
                placeholder='새 비밀번호를 한 번 더 작성하세요.'
                onChange={handleCheckPasswordConfirm}
              />
            </div>
            <div>
              {userData.passwordConfirm.length > 0 && (
                <span
                  css={[RegisterNoticeText]}
                  className={`message ${
                    isForm.isPasswordConfirm ? 'success' : 'error'
                  }`}
                >
                  {registerForm.passwordConfirmMessage}
                </span>
              )}
            </div>

            <div css={[BtnContainer]}>
              {!user && (
                <button
                  onClick={handleChangePassword}
                  css={[Button]}
                  disabled={!isForm.isPassword && !isForm.isPasswordConfirm}
                >
                  업데이트
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
      <section css={[MypageSection]}>
        <div css={[ReservationSection]}>
          <h2 css={[Text]}>내 예약 목록</h2>
          <Reservation data={data} />
        </div>
      </section>
    </div>
  );
};

export default MyPages;

const MyPageStyle = css`
  margin-top: 2rem;
  display: flex;
`;

const MypageSection = css`
  // display: grid;
  // grid-template-columns: 1.2fr 2fr;
  width: 40%;
  flex-wrap: wrap;
  margin-left: 2rem;
  margin-bottom: 1rem !important;
`;

const DetailSection = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 15px;
  padding-left: 5rem;
  margin-right: 3rem;
`;

const ReservationSection = css`
  padding-left: 2rem;
`;

const Text = css`
  text-align: center !important;
  font-size: 1.75rem;import { useRouter } from 'next/router';

  color: #8d98a0;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Avatar = css`
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: relative;
  margin: 15px auto;
  bottom: 1px solid #ddd;
  border-radius: 50%;

  &:hover span {
    bottom: -20%;
  }
`;

const AvatarImage = css`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const ChangeImage = css`
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: 50%;
  background: #fff8;
  text-align: center;
  font-weight: 400;
  transition: 0.3 ease-in-out;
  cursor: pointer;

  p {
    color: rgb(255, 140, 45);
  }

  &:hover {
    bottom: -15%;
  }
`;

const UploadFile = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  color: rgb(184, 115, 115);
`;

const FormGroup = css`
  // margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const FormInput = css`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.1rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const BtnContainer = css`
  width: 100%;
  margin-top: 1rem;
`;

const Button = css`
  display: inline-block;
  font-weight: 400;
  user-select: none;
  width: 100%;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  color: #fff;
  background-color: #17a2b8;
  border-color: none;
  cursor: pointer;
  margin: 1rem 0.7rem;

  &:hover {
    background-color: #1bc4de;
  }
`;

const LabelText = css`
  margin-top: 1rem;
`;
