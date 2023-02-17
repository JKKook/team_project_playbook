/** @jsxImportSource @emotion/react **/
import React from 'react';
import { css } from '@emotion/react';
import {
  AiOutlineGithub,
  AiFillFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { Container } from '../../../pages/index';

const Footer = () => {
  return (
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
        <div css={[FooterTextContainer]}>
          <p css={[FooterCopyright]}>
            Copyright © 2023 playbook cooperation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const Text = css`
  font-size: 1.1rem;
  margin: 1.2rem 0;
  padding: 0 2rem;
  line-height: 1.7;
  opacity: 0.7;
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
  flex-direction: column;
`;

const SocialIcons = css`
  display: flex;
  margin-top: 3rem;
  margin-bottom: 2rem;
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

const FooterTextContainer = css`
  display: flex;
  padding-bottom: 2rem;
`;
const FooterCopyright = css`
  color: #bcc1c1;
`;
