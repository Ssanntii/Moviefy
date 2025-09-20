import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "../../components/MovieList";

const Detail = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          {/* Banner */}
          <div
            className="h-[50vh] relative bg-center bg-cover bg-no-repeat before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:bg-opacity-50 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[100px] after:bg-gradient-to-t after:from-gray-900 after:to-transparent"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>

          {/* Movie Content */}
          <div className="flex items-start justify-start max-w-[1260px] mx-auto -mt-[200px] relative px-8 mb-12 container">
            {/* Poster */}
            <div className="flex-1 md:hidden">
              <div
                className="bg-center bg-cover bg-no-repeat rounded-lg pt-[165%]"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.backdrop_path || item.poster_path
                  )})`,
                }}
              ></div>
            </div>

            {/* Info */}
            <div className="w-[70%] pl-8 relative md:w-full md:pl-0 [&>*]:mb-8">
              <h1 className="text-6xl leading-none text-white font-bold">
                {item.title || item.name}
              </h1>
              
              <div className="flex flex-wrap gap-2">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, index) => (
                    <span 
                      key={index} 
                      className="py-2 px-6 border-2 border-white rounded-lg text-sm font-semibold bg-gray-900 text-white"
                    >
                      {genre.name}
                    </span>
                  ))}
              </div>
              
              <p className="tracking-wider text-gray-300 leading-relaxed">
                {item.overview}
              </p>
              
              <div className="cast">
                <div className="section__header">
                  <h2 className="text-3xl font-bold text-white mb-4">Casts</h2>
                </div>
                {/* Cast List Component */}
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          {/* Videos and Similar Content */}
          <div className="container">
            <div className="section mb-12">
              <VideoList id={item.id} />
            </div>
            
            <div className="section mb-12">
              <div className="section__header mb-8">
                <h2 className="text-3xl font-bold text-white">Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const CastListStyles = {
  casts: "grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2.5",
  castsItem: "",
  castsItemImg: "pt-[160px] bg-cover mb-2",
  castsItemName: "text-sm text-gray-300"
};

export const VideoListStyles = {
  video: "mb-12",
  videoTitle: "mb-6 text-2xl font-bold text-white"
};

export default Detail;