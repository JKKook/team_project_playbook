/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import PhoneA from '../public/asset/phone.gif';
import Gallery from '../performanceImage/Gallery';
import Footer from '../src/components/organisms/Footer';

const Home = () => {
  const router = useRouter();

  const HeaderVars = {
    initial: { y: 100, opacity: 0, scale: 0.5 },
    whileInView: { x: 0, opacity: 1, scale: 1 },
    transition: { duration: 0.7 },
  };

  return (
    <>
      <header css={[Header]}>
        <Gallery />
      </header>

      <div css={[Container]}>
        <motion.section
          css={[IntroSection]}
          variants={HeaderVars}
          initial='initial'
          whileInView='whileInView'
          transition='transition'
        >
          <h2 css={[Heading]}>INTRODUCTION</h2>
          <div css={[IntroContent]}>
            <Image src={PhoneA} alt='phone' width={300} height={600} />

            <div css={[IntroTextContainer]}>
              <p>공연 예약은</p>
              <p>
                역시 <strong>플레이북</strong>
              </p>

              <div css={[Btns]}>
                <button
                  type='button'
                  css={[Btn]}
                  onClick={() => router.push('/mainPages/Performance')}
                >
                  예약하러 가기
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          css={[Section, AboutSection]}
          variants={HeaderVars}
          initial='initial'
          whileInView='whileInView'
          transition='transition'
        >
          <h2 css={[Heading]}>About</h2>
          <div css={[AboutContent]}>
            <div css={[AboutText]}>
              <div css={[AboutSubTitle]}>
                <strong>플레이북은요</strong>
              </div>
              <p>
                영단어 Play(공연 하다, 놀이, 즐기다)와 Book(예약 하다)의 의미를
                착안하여{' '}
                <span css={[AboutHighlight]}>놀이처럼 즐기면서 예약하자</span>의
                의미를 덧붙여 만든 합성어입니다. 공연을 즐기려고 예약하는 만큼,
                공연 예약하는 과정도 즐거워야 한다는 취지로 사이트를 제작하게
                되었습니다
              </p>
              <p>그럼 플레이북을 마음 껏 즐겨보세요 :)</p>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default Home;

export const Container = css`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Header = css`
  position: relative;
  display: flex;
  text-align: center;
  width: 100%;
  height: 100vh;
`;

const IntroContent = css`
  display: flex;
  align-items: center;
  gap: 10rem;
`;

const Btns = css`
  margin: 1.5rem 0;
`;

const Btn = css`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid #e99c2f;
  background: #e99c2f;
  color: #fff;
  padding: 0.95rem 0;
  letter-spacing: 2px;
  display: block;
  width: 180px;
  margin: 0.6rem auto;
  transition: all 0.5s ease-in-out;

  &:first-of-type {
    color: #fff;
    background: #e99c2f;
  }

  &:first-of-type:hover {
    background: transparent;
    color: #e99c2f;
  }
`;

const IntroSection = css`
  position: relative;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem 0 10rem 0;

  h2 {
    margin-top: 2rem;
    margin-bottom: 5rem;
  }
`;

const IntroTextContainer = css`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  p {
    font-size: 2.5rem;
    font-weight: bold;

    &:nth-of-type(2) {
      margin-left: 5rem;

      strong {
        color: #feb54d;
      }
    }
  }
`;

const Section = css`
  padding: 3rem 0 2rem;
`;

const Heading = css`
  color: #bcc1c1;
  text-align: center;
  font-size: 2.5rem;
  font-family: 'Open Sans', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5rem;
`;

const AboutSection = css`
  position: relative;
  max-width: 960px;
  margin: 5rem auto;
  width: 100%;
  height: 70vh;
`;

const AboutContent = css`
  display: flex;
  // flex: 1;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const AboutText = css`
  font-family: 'Open Sans', sans-serif;

  p {
    font-family: 'Open Sans', sans-serif;
    font-size: 1.3rem;
    font-weight: 400;
    letter-spacing: 1px;
    margin-bottom: 1.5rem;
    line-height: 2rem;
  }
`;

const AboutSubTitle = css`
  font-size: 1.6rem;
  padding-bottom: 1rem;
  font-weight: 700;
`;

const AboutHighlight = css`
  text-decoration: underline;
`;
