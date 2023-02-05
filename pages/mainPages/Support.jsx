/** @jsxImportSource @emotion/react */
import React from 'react';
import { MdSupportAgent } from 'react-icons/md';
import { HiOutlineTicket } from 'react-icons/hi';
import { BsSearch } from 'react-icons/bs';
import { AiFillPhone, AiFillEdit } from 'react-icons/ai';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
const Support = () => {
  const router = useRouter();

  const handleAccount = () => {
    return router.push('/subPages/MyPages');
  };

  // 추후, 게시판 만들게 되면
  // 1:1 상담 컴포넌트를 만들 예정

  return (
    <>
      <section css={[Section]}>
        <header css={[SupportHeader]}>
          <div css={[SupportHeaderTitleIcon]}>
            <MdSupportAgent />
          </div>
          <h2 css={[SupportHeaderTitleTxt]}>Support</h2>
        </header>
        <div css={[SupportMain]}>
          <div css={[SupportMainCon]}>
            <div css={[SupportMainTitleCon]}>
              <h3 css={[SupportMainTitle]}>예매 도움</h3>
              <h3 css={[SupportMainSubTitle]}>받기</h3>
            </div>
            <div css={[SupportMainDescription]}>
              플레이북 예매 방법이 궁금하신가요? 예매 안내를 통해서 편리한
              예매방법을 알아보세요.
            </div>
            <div css={[SupportMainIconBox]}>
              <HiOutlineTicket />
            </div>
          </div>
          <a href='https://www.kopis.or.kr/por/main/main.do'>
            <div css={[SupportMainCon]}>
              <div css={[SupportMainTitleCon]}>
                <h3 css={[SupportMainTitle]}>공연 소식</h3>
                <h3 css={[SupportMainSubTitle]}>알아보기</h3>
              </div>
              <div css={[SupportMainDescription]}>
                다가 올 공연소식이 궁금하신가요? 새로운 소식들을 빠르게
                접해보세요.
              </div>
              <div css={[SupportMainIconBox]}>
                <BsSearch />
              </div>
            </div>
          </a>

          <a href='tel:02-2098-2942'>
            <div css={[SupportMainCon]}>
              <div css={[SupportMainTitleCon]}>
                <h3 css={[SupportMainTitle]}>고객문의</h3>
                <h3 css={[SupportMainSubTitle]}>하기</h3>
              </div>
              <div css={[SupportMainDescription]}>
                <p css={[SupportMainDiffrentDescription]}>02-2098-2942</p>
                <span css={[SupportMainDescription]}>
                  09:00 ~ 18:00 (월 ~ 금)
                </span>
              </div>
              <div css={[SupportMainIconBox]}>
                <AiFillPhone />
              </div>
            </div>
          </a>

          <div css={[SupportMainCon]} onClick={handleAccount}>
            <div css={[SupportMainTitleCon]}>
              <h3 css={[SupportMainTitle]}>개인정보</h3>
              <h3 css={[SupportMainSubTitle]}>변경 하기</h3>
            </div>
            <div css={[SupportMainDescription]}>
              개인정보를 변경하고 싶나요? 마이페이지를 통해서 개인정보를
              변경해보세요.
            </div>
            <div css={[SupportMainIconBox]}>
              <AiFillEdit />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Support;

const Section = css`
  width: 1000px;
`;

const SupportHeader = css`
  display: flex;
  margin: 5rem;
`;

const SupportHeaderTitleIcon = css`
  font-size: 1.5rem;
`;

const SupportHeaderTitleTxt = css`
  color: #ce7777;

  margin-left: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const SupportMain = css`
  display: grid;
  justify-items: center;
  justify-self: center;
  align-self: center;
  grid-template-columns: repeat(2, 3fr);
  // column-gap: 1rem;
  row-gap: 5rem;
`;

const SupportMainCon = css`
  position: relative;
  // margin-bottom: 5rem;
`;
const SupportMainTitleCon = css`
  display: flex;
  margin-bottom: 3rem;
  cursor: pointer;
`;

const SupportMainTitle = css`
  color: #3c6255;
  font-weight: bold;
  font-size: 1.5rem;
`;

const SupportMainSubTitle = css`
  color: #52616b;
  font-weight: bold;
  font-size: 1.5rem;
  padding-left: 0.5rem;
  text-decoration: underline;
  &::after {
    context: '>';
  }
`;

const SupportMainDescription = css`
  color: #52616b;
  width: max-content;
  max-width: 150px;
  word-break: break-all;
  font-size: 0.9em;
`;

const SupportMainIconBox = css`
  position: absolute;
  font-size: 5rem;
  color: #52616b;
  transform: translate(170px, -70px);
`;

const SupportMainDiffrentDescription = css`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #222222;
`;
