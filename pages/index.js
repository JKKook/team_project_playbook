import React from 'react';
/** @jsxImportSource @emotion/react **/
import { css } from '@emotion/react';
import {
  AiOutlineGithub,
  AiFillFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import Image from 'next/image';
import Banner1 from '../public/asset/Banner1.svg';
import Banner2 from '../public/asset/Banner2.svg';
import Banner3 from '../public/asset/Banner3.svg';
import Banner4 from '../public/asset/Banner4.svg';
import Banner5 from '../public/asset/Banner5.svg';
import PhoneA from '../public/asset/phoneA.gif';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Home = () => {
  const router = useRouter();

  const onClickBanner = (e) => {
    console.log(e.target.value);
  };

  const HeaderVars = {
    initial: { y: 100, opacity: 0, scale: 0.5 },
    whileInView: { x: 0, opacity: 1, scale: 1 },
    transition: { duration: 0.7 },
  };

  const DetailImage = [
    {
      id: 0,
      imageUrl: Banner1,
    },
    {
      id: 1,
      imageUrl: Banner2,
    },
    {
      id: 2,
      imageUrl: Banner3,
    },
    {
      id: 3,
      imageUrl: Banner4,
    },
    {
      id: 4,
      imageUrl: Banner5,
    },
  ];

  return (
    <>
      <header css={[Header]}>
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.5 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          css={[HeaderTextContainer]}
        >
          <h1>우리의 공연을 깨우는</h1>
          <h1>
            <span css={[Black]}>공연 예약</span>
            페이지
          </h1>
          <p>우리는 공연을 예약한다.</p>
        </motion.div>
      </header>
      <motion.section
        css={[BannerSection]}
        variants={HeaderVars}
        initial='initial'
        whileInView='whileInView'
        transition='transition'
      >
        <h2 css={[Heading]}>NOTICE</h2>
        <div>
          <Image src={Banner1} alt='배너2' width={1100} />
        </div>
        <div css={[DetailBanner]}>
          {DetailImage.map((imgIdx) => (
            <Image
              src={imgIdx.imageUrl}
              key={imgIdx.id}
              alt='상세 배너'
              width={45}
              height={55}
              onClick={onClickBanner}
              style={{
                objectFit: 'cover',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </motion.section>

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
            <Image src={PhoneA} alt='phone' width={400} />

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
            <div>
              <h2 css={[AboutHead]}>
                Web Developer, <br />
                Cyber Security & Web Designer
              </h2>
            </div>
            <div css={[AboutText]}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                atque soluta natus, vitae tempora quasi voluptate, eaque vel
                maiores necessitatibus consequatur voluptatum esse doloribus
                nulla, perferendis eius! Eaque, minus totam.
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
                quibusdam in aut pariatur, odit impedit praesentium optio
                eligendi quam voluptatum numquam nam eius reiciendis fuga
                voluptates. Animi eos fuga maiores.
              </p>
              <p>Get your project book with contact button.</p>
            </div>
          </div>
        </motion.section>
      </div>

      <footer css={[FooterContainer]}>
        <div css={[FooterBanner]}>
          <div css={[Container]}>
            <h2 css={[FooterHead]}>더 알고 싶으세요?</h2>
            <div css={[FooterText]}>
              <p css={[Text]}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                atque soluta natus, vitae tempora quasi voluptate, eaque vel
                maiores necessitatibus consequatur voluptatum esse doloribus
                nulla, perferendis eius! Eaque, minus totam.
              </p>
              <p css={[Text]}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                atque soluta natus, vitae tempora quasi voluptate, eaque vel
                maiores necessitatibus consequatur voluptatum esse doloribus
                nulla, perferendis eius! Eaque, minus totam.
              </p>
              <p css={[Text]}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                atque soluta natus, vitae tempora quasi voluptate, eaque vel
                maiores necessitatibus consequatur voluptatum esse doloribus
                nulla, perferendis eius! Eaque, minus totam.
              </p>
            </div>
            <button type='button' css={[FooterBtn]}>
              고객센터
            </button>
          </div>
        </div>

        <div css={[SocialContainer]}>
          <div css={[SocialIcons]}>
            <a href='#' css={[SocialIconsDetail]}>
              <AiFillFacebook />
            </a>
            <a href='#' css={[SocialIconsDetail]}>
              <AiOutlineTwitter />
            </a>
            <a href='#' css={[SocialIconsDetail]}>
              <AiOutlineGithub />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;

const Progress = css`
  position: fixed;
  left: 0;
  right: 0;
  height: 5px;
  background: #fafafa;
  bottom: 100px;
`;

const Container = css`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Header = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.7rem;
  color: #fff;
  height: 100vh;
  background: #adc5c5;
`;

const HeaderTextContainer = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  p {
    text-align: center;
    font-size: 1rem;
  }
`;

const Black = css`
  color: #1d5054;
  font-size: 3.5rem;
`;

const BannerSection = css`
  // padding: 40rem 1.5rem 60rem 1.5rem;
  text-align: center;
  height: 80vh;
  position: relative;
  margin-bottom: 3rem;

  h2 {
    margin-top: 10rem;
  }
`;

const DetailBanner = css`
  display: flex;
  gap: 2rem;
  left: 37rem;
  top: 25rem;
  position: absolute;
`;

const IntroContent = css`
  display: flex;
  align-items: center;
  gap: 10rem;
`;

const Text = css`
  font-size: 1.1rem;
  margin: 1.2rem 0;
  padding: 0 2rem;
  line-height: 1.7;
  opacity: 0.7;
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

  &:first-of-child {
    color: #fff;
    background: #e99c2f;
  }

  &:last-child:hover {
    background: #e99c2f;
    color: #fff;
  }

  &:first-of-child:hover {
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
    margin-top: 10rem;
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

    &:nth-of-child(2) {
      margin-left: 5rem;

      strong {
        color: #feb54d;
      }
    }
  }
`;

const FooterContainer = css`
  width: 100%;
  background-color: #33383c;
`;

const FooterBanner = css`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))
    center/cover no-repeat;
  padding: 3rem 0;
  color: #fff;
  text-align: center;
`;

const FooterHead = css`
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #bcc1c1;
`;

const FooterText = css`
  display: flex;
  padding: 1rem;
`;

const FooterBtn = css`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid #e99c2f;
  background: transparent;
  color: #e99c2f;
  padding: 0.95rem 0;
  letter-spacing: 2px;
  display: block;
  width: 180px;
  margin: 0.6rem auto;
  transition: all 0.5s ease-in-out;

  &:hover {
    color: #fff;
    background: #e99c2f;
  }
`;

const SocialContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialIcons = css`
  display: flex;
  padding: 3rem 0;
`;

const SocialIconsDetail = css`
  color: #626a6a;
  margin: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-size: 1.5rem;
  transition: all 0.5s ease-in-out;

  &:hover {
    color: #fff;
  }
`;

const Section = css`
  padding: 3rem 0 2rem;
`;

const Heading = css`
  color: #bcc1c1;
  text-align: center;
  font-size: 3rem;
  font-family: 'Cute Font', cursive;
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

const AboutHead = css`
  font-size: 2rem;
  line-height: 2.6rem;
  font-weight: 700;
  // margin: 1rem 0;
`;

const AboutText = css`
  p {
    font-size: 0.938rem;
    letter-spacing: 1px;
    /* 양쪽 정렬 */
    text-align: justify;
    margin-bottom: 1.5rem;
  }
`;
