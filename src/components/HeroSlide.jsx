import React, { useEffect, useRef, useState } from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button, { OutlineButton } from "./../button/Button";
import Modal, { ModalContent } from "./../modal/Modal";
import tmdbApi, { category, movieType } from "./../../api/tmdbApi";
import apiConfig from "./../../api/apiConfig";
import { useHistory } from "react-router";
import * as Config from "./../../constants/Config";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(0, 4));
        console.log(response);
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="mb-12">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
      >
        {movieItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, index) => (
        <TrailerModal key={index} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {
  let history = useHistory();
  const item = props.item;
  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const videos = await tmdbApi.getVideos(category.movie, item.id);
    if (videos.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videoSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }
    modal.classList.toggle("active");
  };

  return (
    <div
      className={`py-36 w-full relative bg-center bg-cover bg-no-repeat before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:bg-opacity-50 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[100px] after:bg-gradient-to-t after:from-gray-900 after:to-transparent ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex items-center justify-center relative container">
        {/* Content Info */}
        <div className="w-[55%] px-12 relative space-y-12 lg:w-full">
          <h2 className={`text-8xl font-bold leading-none lg:text-6xl transition-all duration-500 ease-in-out ${
            props.className === 'active' 
              ? 'opacity-100 transform translate-y-0 delay-300' 
              : 'opacity-0 transform -translate-y-[100px]'
          }`}>
            {item.title}
          </h2>
          
          <div className={`font-bold tracking-wide transition-all duration-500 ease-in-out ${
            props.className === 'active' 
              ? 'opacity-100 transform translate-y-0 delay-600' 
              : 'opacity-0 transform -translate-y-[100px]'
          }`}>
            {item.overview}
          </div>
          
          <div className={`flex space-x-4 transition-all duration-500 ease-in-out ${
            props.className === 'active' 
              ? 'opacity-100 transform translate-y-0 delay-[900ms]' 
              : 'opacity-0 transform -translate-y-[100px]'
          }`}>
            <Button
              onClick={() =>
                history.push(`/${Config.HOME_PAGE}/movie/` + item.id)
              }
            >
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>

        {/* Poster */}
        <div className="flex-1 relative flex items-center justify-center lg:hidden">
          <img 
            src={apiConfig.w500Image(item.poster_path)} 
            alt=""
            className={`w-96 rounded-lg shadow-lg transition-transform duration-700 ease-in-out ${
              props.className === 'active' ? 'transform scale-100' : 'transform scale-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;
  const iframeRef = useRef(null);
  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;