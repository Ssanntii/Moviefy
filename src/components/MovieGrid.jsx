import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import tmdbApi, { category, movieType, tvType } from "../api/tmdbApi";
import Button, { OutlineButton } from "./Button";
import Input from "./Input";
import * as Config from "../constants/Config";
import { useLanguage } from "../context/LanguageContext";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const fetchData = async (pageNum = 1) => {
    const params = { page: pageNum, language };
    let response = null;

    try {
      if (!keyword) {
        if (props.category === category.movie) {
          response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
        } else {
          response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        response = await tmdbApi.search(props.category, { params: { ...params, query: keyword } });
      }

      if (response && response.results) {
        if (pageNum === 1) setItems(response.results);
        else setItems((prev) => [...prev, ...response.results]);
        setTotalPage(response.total_pages || 0);
        setPage(pageNum);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (pageNum === 1) setItems([]);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [keyword, props.category, language]);

  const loadMore = () => fetchData(page + 1);

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
      {page < totalPage && (
        <div className="text-center">
          <OutlineButton className="small" onClick={loadMore}>
            {language === "en" ? "Load more..." : "Cargar más..."}
          </OutlineButton>
        </div>
      )}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const [keyword, setKeyword] = useState(props.keyword || "");

  useEffect(() => {
    setKeyword(props.keyword || "");
  }, [props.keyword, language])

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
    if (props.category === category.movie) return language === "en" ? "Search movies..." : "Buscar películas...";
    if (props.category === category.tv) return language === "en" ? "Search TV series..." : "Buscar series...";
    return language === "en" ? "Search..." : "Buscar...";
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
        {language === "en" ? "Search" : "Buscar"}
      </Button>
    </div>
  );
};

export default MovieGrid;
