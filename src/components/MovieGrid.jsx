import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import tmdbApi, { category, movieType, tvType } from "../api/tmdbApi";
import Button, { OutlineButton } from "./Button";
import Input from "./Input";
import * as Config from "../constants/Config";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      try {
        let response = null;
        if (keyword === undefined) {
          const params = {};
          switch (props.category) {
            case category.movie:
              response = await tmdbApi.getMoviesList(movieType.upcoming, {
                params,
              });
              break;
            default:
              response = await tmdbApi.getTvList(tvType.popular, { params });
          }
        } else {
          const params = {
            query: keyword,
          };
          response = await tmdbApi.search(props.category, { params });
        }
        
        if (response && response.results) {
          setItems(response.results);
          setTotalPage(response.total_pages || 0);
        } else {
          console.error('API response is invalid:', response);
          setItems([]);
          setTotalPage(0);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setItems([]);
        setTotalPage(0);
      }
    };
    getList();
  }, [keyword, props.category]);

  const loadMore = async () => {
    try {
      let response = null;
      if (keyword === undefined) {
        const params = {
          page: page + 1,
        };
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          page: page + 1,
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      
      if (response && response.results) {
        setItems([...items, ...response.results]);
        setPage(page + 1);
      } else {
        console.error('Load more API response is invalid:', response);
      }
    } catch (error) {
      console.error('Error loading more data:', error);
    }
  };

  return (
    <>
      <div className="mb-12">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 mb-8 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {items.map((item, index) => (
          <MovieCard key={index} category={props.category} item={item} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="text-center">
          <OutlineButton className="small" onClick={loadMore}>
            Cargar más...
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(
        `/${Config.HOME_PAGE}/${category[props.category]}/search/${keyword}`
      );
    }
  }, [keyword, props.category, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [goToSearch]);

  const getPlaceholder = () => {
    if (props.category === category.movie) {
      return "Buscar películas...";
    } else if (props.category === category.tv) {
      return "Buscar series...";
    } else {
      return "Buscar...";
    }
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-xl mx-auto">
      <Input
        type="text"
        placeholder={getPlaceholder()}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button small onClick={goToSearch}>
        Buscar
      </Button>
    </div>
  );
};

export default MovieGrid;