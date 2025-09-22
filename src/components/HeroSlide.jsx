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
  const { language } = useLanguage();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const params = { page: 1, language };
        const response = await tmdbApi.getMoviesList(movieType.popular, { params });
        setMovieItems(response.results.slice(0, 4));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, [language]);

  const openModal = (itemId) => setModalState({ ...modalState, [itemId]: true });
  const closeModal = (itemId) => setModalState({ ...modalState, [itemId]: false });

  if (!movieItems.length)
    return (
      <div className="py-36 w-full bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );

  return (
    <div className="mb-12">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
      >
        {movieItems.map((item) => (
          <SwiperSlide key={item.id}>
            <HeroSlideItem item={item} onOpenModal={() => openModal(item.id)} />
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const background = apiConfig.originalImage(item.backdrop_path || item.poster_path);

  return (
    <div className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
      {/* Imagen de fondo */}
      {background && (
        <img
          src={background}
          alt={item.title || item.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      )}

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-gray-900 to-transparent z-20"></div>

      {/* Contenido textual */}
      <div className="relative z-30 flex items-center justify-center h-full px-4 max-w-7xl mx-auto">
        <div className="w-[55%] px-12 lg:w-full space-y-8">
          <h2 className="text-6xl font-bold leading-tight text-white lg:text-4xl">
            {item.title || item.name}
          </h2>
          <div className="text-white font-medium tracking-wide text-lg leading-relaxed max-w-2xl">
            {item.overview}
          </div>
          <div className="flex space-x-4 pt-4">
            <Button onClick={() => navigate(`/${Config.HOME_PAGE}/movie/${item.id}`)}>
              Watch now
            </Button>
            <OutlineButton onClick={onOpenModal}>Watch trailer</OutlineButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item, isActive, onClose }) => {
  const [videoSrc, setVideoSrc] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isActive) {
      const loadVideo = async () => {
        setLoading(true);
        try {
          const videos = await tmdbApi.getVideos(category.movie, item.id);
          setVideoSrc(videos.results?.[0]?.key ? `https://www.youtube.com/embed/${videos.results[0].key}` : "");
        } catch (err) {
          console.error("Error loading video:", err);
          setVideoSrc("");
        } finally {
          setLoading(false);
        }
      };
      loadVideo();
    } else {
      setVideoSrc("");
      setLoading(false);
    }
  }, [isActive, item.id]);

  const handleClose = () => {
    setVideoSrc("");
    onClose();
  };

  return (
    <Modal active={isActive} id={`modal_${item.id}`} onClose={handleClose}>
      <ModalContent>
        {loading ? (
          <div className="text-white text-xl flex items-center justify-center h-[500px]">
            Loading trailer...
          </div>
        ) : videoSrc ? (
          <iframe
            src={videoSrc}
            width="100%"
            height="500px"
            title={`${item.title} trailer`}
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <div className="text-white text-xl flex items-center justify-center h-[500px]">
            No trailer available
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
