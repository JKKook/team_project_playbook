import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const RecommendPerformance = ({ performances }) => {
  const images = performances.map((v) => v.image);

  return (
    <Swiper
      navigation={true}
      effect={'coverflow'}
      grabCursor={true}
      spaceBetween={8}
      centeredSlides={true}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[EffectCoverflow, Pagination]}
      className='mySwiper'
    >
      {images?.map((elem, idx) => (
        <SwiperSlide key={''}>
          <li key={idx} style={{ display: 'flex', justifyContent: 'center' }}>
            <Image src={elem} alt={'images'} height={480} width={400} />
          </li>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecommendPerformance;
