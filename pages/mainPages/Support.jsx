/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { MdSupportAgent } from 'react-icons/md';
import { HiOutlineTicket } from 'react-icons/hi';
import { BsSearch } from 'react-icons/bs';
import { AiFillPhone, AiFillEdit } from 'react-icons/ai';

const Support = () => {
  const router = useRouter();

  const handleAccount = () => {
    return router.push('/subPages/MyPages');
  };

  const handleBookTicket = () => {
    return router.push({
      pathname: '/subPages/HelpInquiry',
      query: router.query,
    });
  };

  return (
    <>
      <section css={[Section]}>
        <header css={[SupportHeader]}>
          <h2 css={[SupportHeaderTitleTxt]}>Support</h2>
          <div css={[SupportHeaderTitleIcon]}>
            <MdSupportAgent />
          </div>
        </header>
        <div css={[SupportMain]}>
          <div css={[SupportMainCon]}>
            <div css={[SupportMainTitleCon]} onClick={handleBookTicket}>
              <h3 css={[SupportMainTitle]}>상담 도움</h3>
              <h3 css={[SupportMainSubTitle]}>받기</h3>
            </div>
            <div css={[SupportMainDescription]}>
              플레이북 이용 방법이 궁금하신가요? 궁금하신 사항이 있다면 1:1
              상담을 이용해보세요.
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

export const SupportHeader = css`
  display: flex;
  margin: 5rem;
`;

const SupportHeaderTitleIcon = css`
  color: #ce7777;
  font-size: 2rem;
  margin-left: 1rem;
`;

const SupportHeaderTitleTxt = css`
  color: #ce7777;
  margin-left: 1rem;
  font-size: 2rem;
  font-weight: bold;
`;

const SupportMain = css`
  display: grid;
  justify-items: center;
  justify-self: center;
  align-self: center;
  grid-template-columns: repeat(2, 4fr);
  row-gap: 5rem;
`;

const SupportMainCon = css`
  position: relative;
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
