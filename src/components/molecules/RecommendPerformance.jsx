/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const RecommendPerformance = ({ performances }) => {
  const images = performances.map((v) => v.image);
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className='mySwiper'
    >
      {images?.map((elem, idx) => (
        <SwiperSlide key={''}>
          <li key={idx} style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href={'/'}>
              <Image src={elem} alt={'images'} height={480} width={400} />
            </Link>
          </li>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecommendPerformance;
