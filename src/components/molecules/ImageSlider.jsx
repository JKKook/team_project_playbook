import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TOTAL_SLIDE = 7;

// TODO: Indicate whether to send a cookie in a cross-site request by specifying its SameSite attribute
// 에러해결해야 첨부터 부드럽게 넘어간다. 브라우저 정책변경

const ImageSlider = ({ performances }) => {
  const [count, setCount] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((prev) => (prev === TOTAL_SLIDE ? 0 : prev + 1));
    }, 5000);

    return () => {
      clearInterval(timerId);
    };
  }, [count]);

  return (
    <>
      <Container>
        <List ref={slideRef} count={count}>
          {performances?.map((elem, idx) => (
            <ImageList key={`${idx}_${elem.name}`}>
              <Link href={`/description/${elem.id}`}>
                <Image
                  src={elem.image}
                  alt={'images'}
                  height={480}
                  width={400}
                />
              </Link>
            </ImageList>
          ))}
        </List>
        <Label>
          <p>{count + 1} / 8</p>
        </Label>
      </Container>
    </>
  );
};

export default ImageSlider;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 490px;
  overflow: hidden;
  position: relative;
  top: 20px;
  left: 35%;
`;
const List = styled.ul`
  padding: 0;
  display: flex;
  position: absolute;
  left: 10%;
  transition: ${(props) => (!props.count ? '' : 'all 0.7s ease-in-out')};
  transform: ${(props) => 'translateX(-' + props.count * 800 + 'px)'};
  @media screen and (max-width: 500px) {
    left: 0%;
  }
`;
const ImageList = styled.li`
  list-style: none;
  margin-right: 400px;
`;

const Label = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 450px;
  left: 380px;
  width: 50px;
  hight: 0px;
  border-radius: 15px;
  z-index: 10;
  background: gray;
  opacity: 0.7;
  text-align: center;
  color: white;
  p {
    color: white;
    opacity: 1;
  }
`;
