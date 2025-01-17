import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { img } from 'framer-motion/client';

const Carousel = () => {

  const slideItems = [
    {
      id: 1,
      title: "Banner 1",
      image: "/images/1.jpg",
      link: "/",
    },
    {
      id: 2,
      title: "Banner 2",
      image: "/images/2.jpg",
      link: "/",
    },
    {
      id: 3,
      title: "Banner 3",
      image: "/images/3.jpg",
      link: '/',
    },
    {
      id: 4,
      title: 'Banner 4',
      image: '/images/4.jpg',
      link: '/',
    },
    {
      id: 5,
      title: 'Banner 5',
      image: '/images/5.jpg',
      link: '/',
    },
    {
      id: 6,
      title: 'Banner 6',
      image: '/images/6.jpg',
      link: '/',
    }
  ]

  return (
    <>
      {/* BANNER*/}

      <div className="banner">
        <div className="container">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: false,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className=""
          >
            {slideItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className=" overflow-hidden shadow-lg ">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full rounded-2xl object-cover h-full "
                  />
                  
                </div>
              </SwiperSlide>
            ))}
            
            {/* <SwiperSlide>
              <div className="slider-item">
                <img
                  src="/templates/banner-2.jpg"
                  alt="modern sunglasses"
                  className="banner-img"
                />
                <div className="banner-content">
                  <p className="banner-subtitle">Tous vos accessoires de mode</p>
                  <h2 className="banner-title">Des paires de lunettes moderne</h2>
                  <Link className="banner-btn">
                    Achetez maintenant
                  </Link>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-item">
                <img
                  src="/templates/banner-3.jpg"
                  alt="new fashion summer sale"
                  className="banner-img"
                />
                <div className="banner-content">
                  <p className="banner-subtitle">Reduction sur les articles</p>
                  <h2 className="banner-title">De nouveaux vêtements pour l'été</h2>

                  <Link className="banner-btn">
                    Achetez maintenant
                  </Link>
                </div>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Carousel;
