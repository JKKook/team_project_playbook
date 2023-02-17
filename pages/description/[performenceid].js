/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Loading from '../../src/components/atoms/Loading';
import useGetDescription from '../../src/store/server/useGetDescription';
import {
  AiOutlineUser,
  AiOutlineClockCircle,
  AiOutlineCalendar,
  AiOutlineCreditCard,
  AiOutlineEnvironment,
  AiOutlineHourglass,
} from 'react-icons/ai';


// 여기서 공연 상세정보 API 불러오기

const Post = () => {
  const router = useRouter();
  // path 아디 정보
  const { performenceid } = router.query;

  const { data, isLoading } = useGetDescription(performenceid);

  return (
    <>
      {!isLoading && data ? (
        <div css={[Container]}>
          <h1 css={[PerformenceName]}>{data.name}</h1>
          <div css={[ImageContainer]}>
            <Image
              src={data.posterImage}
              alt={data.name}
              width={350}
              height={500}
            />
          </div>
          <div css={[InfoContainer]}>
            <h2 css={[InfoName]}>공연 정보</h2>
            <ul css={[List]}>
              <li>
                <AiOutlineEnvironment css={[Icons]} />
                <span>{data.place}</span>
              </li>
              <li>
                <AiOutlineUser css={[Icons]} />
                <span>{data.actor}</span>
              </li>
              <li>
                <AiOutlineCalendar css={[Icons]} />
                <span>
                  {data.from} ~ {data.to}
                </span>
              </li>
              <li>
                <AiOutlineCreditCard css={[Icons]} />
                <span>{data.price}</span>
              </li>
              <li>
                <AiOutlineHourglass css={[Icons]} />
                <span>{data.genre}</span>
              </li>
              <li>
                <AiOutlineClockCircle css={[Icons]} />
                <span>{data.runtime}</span>
              </li>
            </ul>
          </div>

          <h2 css={[InfoName]}>상세 이미지</h2>
          <div css={[DescriptionImage]}>
            {/* {data.descripImage.length !== 0 ? (
              data.descripImage.map((item, idx) => {
                return ( */}
            <Image
              css={[Images]}
              // key={idx}
              src={data.descriptImage}
              alt={'image'}
              width={800}
              height={5000}
            />
            {/* );
              })
            ) : (
              <div>상세정보 이미지가 없습니다.</div>
            )} */}
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </>
  );
};

export default Post;

const Container = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ImageContainer = css`
  margin: 20px auto;
  width: 350px;
  height: 500px;
  background-color: black;
`;

const PerformenceName = css`
  font-size: 2rem;
  font-weight: 900;
  text-align: center;
  margin: 3rem 0;

  @media screen and (max-width: 500px) {
    font-size: 18px;

    &:after {
      content: '';
      display: block;
      width: 200px;
      height: 5px;
      border-bottom: 1px solid #bcbcbc;
      margin: 20px;
    }
  }
`;

const List = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  gap: 2rem;
  margin: 0 3rem 3rem 20rem;

  li {
    display: flex;
    // justify-content: center;
    align-items: center;
  }
`;

const Icons = css`
  font-size: 25px;
  margin-right: 1rem;
`;

const InfoContainer = css`
  display: flex;
  flex-direction: column;
`;

const InfoName = css`
  font-size: 20px;
  margin: 20px 0 5rem 8rem;
`;

const ButtonContainer = css`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

const Btn = css`
  width: 100px;
  padding: 0.7rem;
  border: none;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
  }

  &:first-of-type {
    background: #17a2b8;
    color: #fff;
  }
`;

const DescriptionImage = css`
  margin: 20px auto;
`;

const Images = css`
  height: 100%;
  object-fit: fill;
`;
