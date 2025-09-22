import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import tmdbApi, { category } from "../api/tmdbApi";
import { useLanguage } from "../context/LanguageContext";

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        setError(false);
        let response = null;
        const params = { language };

        if (props.type !== "similar") {
          switch (props.category) {
            case category.movie:
              response = await tmdbApi.getMoviesList(props.type, { params });
              break;
            default:
              response = await tmdbApi.getTvList(props.type, { params });
          }
        } else {
          response = await tmdbApi.similar(props.category, props.id);
        }

        if (response && response.results) {
          setItems(response.results);
        } else {
          console.error('MovieList API response is invalid:', response);
          setItems([]);
        }
      } catch (error) {
        console.error('Error fetching movie list:', error);
        setError(true);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    getList();
  }, [props.category, props.id, props.type, language])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-white text-lg">
          {language === "en" ? "Loading movies..." : "Cargando películas..."}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500 text-lg">
          {language === "en" ? "Error loading movies" : "Error al cargar películas"}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500 text-lg">
          {language === "en" ? "No movies found" : "No se encontraron películas"}
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list-swiper">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView="auto"
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 15 },
          768: { slidesPerView: 4, spaceBetween: 15 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
          1280: { slidesPerView: 7, spaceBetween: 20 },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default MovieList;
