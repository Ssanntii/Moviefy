import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Button, { OutlineButton } from "./Button";
import Modal, { ModalContent } from "./Modal";
import tmdbApi, { category, movieType } from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import { useNavigate } from "react-router-dom";
import * as Config from "../constants/Config";
import { useLanguage } from "../context/LanguageContext";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [modalState, setModalState] = useState({});
  const { language } = useLanguage(); // <-- Tomamos el idioma
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1, language }; // <-- enviamos el idioma a la API
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, { params });
        setMovieItems(response.results.slice(0, 4));
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };
    getMovies();
  }, [language]); // <-- el efecto se dispara al cambiar idioma

  const openModal = (itemId) => {
    setModalState({ ...modalState, [itemId]: true });
  };

  const closeModal = (itemId) => {
    setModalState({ ...modalState, [itemId]: false });
  };

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
            <HeroSlideItem
              item={item}
              onOpenModal={() => openModal(item.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item) => (
        <TrailerModal
          key={item.id}
          item={item}
          isActive={modalState[item.id] || false}
          onClose={() => closeModal(item.id)}
        />
      ))}
    </div>
  );
};

const HeroSlideItem = ({ item, onOpenModal }) => {
  const navigate = useNavigate();
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
      className={`py-36 w-full relative bg-center bg-cover bg-no-repeat before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:bg-opacity-50 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[100px] after:bg-gradient-to-t after:from-gray-900 after:to-transparent`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex items-center justify-center relative max-w-7xl mx-auto px-4">
        <div className="w-[55%] px-12 relative space-y-12 lg:w-full">
          <h2 className="text-8xl font-bold leading-none lg:text-6xl">
            {item.title}
          </h2>
          <div className="font-bold tracking-wide">{item.overview}</div>
          <div className="flex space-x-4">
            <Button onClick={() => navigate(`/${Config.HOME_PAGE}/movie/${item.id}`)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item, isActive, onClose }) => {
  const [videoSrc, setVideoSrc] = useState("");
  const { language } = useLanguage(); // <-- agregamos idioma si quieres filtrar trailers subtitulados (opcional)

  useEffect(() => {
    if (isActive) {
      const loadVideo = async () => {
        try {
          const videos = await tmdbApi.getVideos(category.movie, item.id);
          if (videos.results && videos.results.length > 0) {
            setVideoSrc(`https://www.youtube.com/embed/${videos.results[0].key}`);
          } else {
            setVideoSrc("");
          }
        } catch (err) {
          setVideoSrc("");
        }
      };
      loadVideo();
    } else {
      setVideoSrc("");
    }
  }, [isActive, item.id, language]); // <-- dependemos del idioma también si hace falta

  const handleClose = () => {
    setVideoSrc("");
    onClose();
  };

  return (
    <Modal active={isActive} id={`modal_${item.id}`} onClose={handleClose}>
      <ModalContent>
        {videoSrc ? (
          <iframe
            src={videoSrc}
            width="100%"
            height="500px"
            title={`${item.title} trailer`}
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <div className="text-white text-xl">No trailer available</div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
