import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import tmdbApi, { category } from "../api/tmdbApi";

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        setError(false);
        let response = null;
        const params = {};
        
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
  }, [props.category, props.id, props.type]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-white text-lg">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500 text-lg">Error loading movies</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500 text-lg">No movies found</div>
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
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
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