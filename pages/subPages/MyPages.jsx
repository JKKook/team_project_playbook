/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import Head from 'next/head';
import avatar from '../../public/asset/user.png';
import Image from 'next/image';

const MyPageStyle = css`
  margin-top: 2rem;
`;

const MypageSection = css`
  display: grid;
  grid-template-columns: 1fr 3fr;
  flex-wrap: wrap;
  margin-left: 2rem;
  margin-bottom: 1rem !important;
`;

const DetailSection = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding-right: 15px;
  padding-left: 5rem;
`;

const Text = css`
  text-align: center !important;
  font-size: 1.75rem;
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
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormInput = css`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
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
  margin-left: 0.7rem;

  &:hover {
    background-color: #1bc4de;
  }
`;

const MyPages = () => {
  // 일단 모두 빈 값으로 초기값 설정
  const initialSate = {
    avatar: '',
    name: '',
    password: '',
    cf_password: '',
  };

  const [data, setData] = useState(initialSate);
  // const { avatar, name, password, cf_password } = data;

  // const { state, dispatch } = useContext(DataContext);
  // const { auth } = state;

  // 실시간으로 input의 데이터가 입력되도록
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // 선택한 이미지가 저장되도록
  const changeAvatar = (e) => {
    const file = e.target.files[0];
    setData({ ...data, avatar: file });
  };

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

          <div css={[FormGroup]}>
            <label htmlFor='name'>이름</label>
            <input
              type='text'
              name='name'
              css={[FormInput]}
              placeholder='이름을 작성하세요.'
              onChange={handleChange}
            />
          </div>

          <div css={[FormGroup]}>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='email'
              css={[FormInput]}
              placeholder='Email을 작성하세요.'
              // disabled={true}
              onChange={handleChange}
            />
          </div>

          <div css={[FormGroup]}>
            <label htmlFor='password'>비밀번호</label>
            <input
              type='password'
              name='password'
              css={[FormInput]}
              placeholder='새 비밀번호를 작성하세요.'
              onChange={handleChange}
            />
          </div>

          <div css={[FormGroup]}>
            <label htmlFor='cf_password'>비밀번호 확인</label>
            <input
              type='password'
              name='cf_password'
              css={[FormInput]}
              placeholder='새 비밀번호를 한 번 더 작성하세요.'
              onChange={handleChange}
            />
          </div>

          <div css={[BtnContainer]}>
            <button css={[Button]}>업데이트</button>
          </div>
        </div>

        <div className='detailSection'>
          <h2 css={[Text]}>예약한 공연</h2>
        </div>
      </section>
    </div>
  );
};

export default MyPages;
