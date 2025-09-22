import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import Button, { OutlineButton } from "./Button"
import Modal, { ModalContent } from "./Modal"
import tmdbApi, { category, movieType } from "../api/tmdbApi"
import { setLanguageForApi } from "../api/axiosClient"
import apiConfig from "../api/apiConfig"
import { useNavigate } from "react-router-dom"
import * as Config from "../constants/Config"
import { useLanguage } from "../context/LanguageContext"

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([])
  const [modalState, setModalState] = useState({})
  const { language } = useLanguage()

  useEffect(() => {
    // Limpiar movies al cambiar idioma
    setMovieItems([]);
    
    const getMovies = async () => {
      // Sincronizar el idioma antes de hacer la llamada
      setLanguageForApi(language);
      
      try {
        // Pequeño delay para asegurar que axiosClient se actualice
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const response = await tmdbApi.getMoviesList(movieType.popular, { 
          params: { page: 1 } 
        });
        console.log("Movies loaded with language:", language, response.results.slice(0, 4));
        setMovieItems(response.results.slice(0, 4));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, [language]);

  const openModal = (itemId) => {
    setModalState({ ...modalState, [itemId]: true })
  }

  const closeModal = (itemId) => {
    setModalState({ ...modalState, [itemId]: false })
  }

  if (!movieItems.length) {
    return (
      <div className="py-36 w-full bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

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
  )
}

const HeroSlideItem = ({ item, onOpenModal }) => {
  const { language } = useLanguage()
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const navigate = useNavigate()
  
  const langKey = language.startsWith("es") ? "es" : "en";
  
  const translations = {
    en: {
      watchNow: "Watch now",
      watchTrailer: "Watch trailer",
      imageFailedLoad: "Image failed to load",
      noImageAvailable: "No image available"
    },
    es: {
      watchNow: "Ver ahora",
      watchTrailer: "Ver trailer",
      imageFailedLoad: "Error al cargar imagen",
      noImageAvailable: "No hay imagen disponible"
    }
  };

  const t = translations[langKey];
  
  const background = apiConfig.originalImage(
    item.backdrop_path || item.poster_path
  )

  return (
    <div className="w-full h-[100vh] sm:h-[80vh] md:h-[70vh] lg:h-[65vh] xl:h-[60vh] relative overflow-hidden bg-gray-900">
      {background && !imageError && (
        <img
          src={background}
          alt={item.title || item.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-0 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => {
            console.log("Image loaded successfully:", background)
            setImageLoaded(true)
          }}
          onError={(e) => {
            console.error("Image failed to load:", background)
            setImageError(true)
          }}
        />
      )}

      {(!background || imageError) && (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-800 to-gray-900 flex items-center justify-center z-0">
          <div className="text-white text-lg opacity-50">
            {imageError ? t.imageFailedLoad : t.noImageAvailable}
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-opacity-40 z-10"></div>

      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-gray-900 to-transparent z-20"></div>
      
      <div className="flex items-center justify-center absolute inset-0 max-w-7xl mx-auto px-4">
        <div className="w-[55%] px-12 relative space-y-4 md:space-y-6 lg:space-y-8 lg:w-full z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white lg:text-4xl">
            {item.title || item.name}
          </h2>
          <div className="text-white font-medium tracking-wide text-base sm:text-lg leading-relaxed max-w-2xl">
            {item.overview}
          </div>
          <div className="flex space-x-4 pt-2 sm:pt-4">
            <Button onClick={() => navigate(`/${Config.HOME_PAGE}/movie/${item.id}`)}>
              {t.watchNow}
            </Button>
            <OutlineButton onClick={onOpenModal}>
              {t.watchTrailer}
            </OutlineButton>
          </div>
        </div>
      </div>
    </div>
  )
}

const TrailerModal = ({ item, isActive, onClose }) => {
  const [videoSrc, setVideoSrc] = useState("")
  const [loading, setLoading] = useState(false)
  const { language } = useLanguage()

  const langKey = language.startsWith("es") ? "es" : "en";
  
  const translations = {
    en: {
      loadingTrailer: "Loading trailer...",
      noTrailerAvailable: "No trailer available"
    },
    es: {
      loadingTrailer: "Cargando trailer...",
      noTrailerAvailable: "No hay trailer disponible"
    }
  };

  const t = translations[langKey];

  useEffect(() => {
    if (isActive) {
      const loadVideo = async () => {
        setLoading(true)
        try {
          setLanguageForApi(language);
          await new Promise(resolve => setTimeout(resolve, 100));
          
          const videos = await tmdbApi.getVideos(category.movie, item.id)
          if (videos.results && videos.results.length > 0) {
            setVideoSrc(`https://www.youtube.com/embed/${videos.results[0].key}`)
          } else {
            setVideoSrc("")
          }
        } catch (err) {
          console.error("Error loading video:", err)
          setVideoSrc("")
        } finally {
          setLoading(false)
        }
      }
      loadVideo()
    } else {
      setVideoSrc("")
      setLoading(false)
    }
  }, [isActive, item.id, language])

  const handleClose = () => {
    setVideoSrc("")
    onClose()
  }

  return (
<Modal active={isActive} id={`modal_${item.id}`} onClose={handleClose}>
  <ModalContent>
    {loading ? (
      <div className="text-white text-xl flex items-center justify-center h-[500px]">
        {t.loadingTrailer}
      </div>
    ) : videoSrc ? (
      <div className="relative w-full aspect-video bg-black">
        <iframe
          src={videoSrc}
          className="w-full h-full"
          title={`${item.title} trailer`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    ) : (
      <div className="text-white text-xl flex items-center justify-center h-[500px]">
        {t.noTrailerAvailable}
      </div>
    )}
  </ModalContent>
</Modal>
  )
}

export default HeroSlide