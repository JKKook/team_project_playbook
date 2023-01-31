import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const RecommendPerformance = ({ performances }) => {
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
      {performances?.map((elem, idx) => (
        <SwiperSlide key={`${idx}_${elem.name}`}>
          <li>
            <Image src={elem.image} alt={'images'} height={480} width={400} />
          </li>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecommendPerformance;
