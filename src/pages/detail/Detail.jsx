import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import tmdbApi from "../../api/tmdbApi"
import { setLanguageForApi } from "../../api/axiosClient"
import apiConfig from "../../api/apiConfig"
import CastList from "./CastList"
import VideoList from "./VideoList"
import MovieList from "../../components/MovieList"
import { useLanguage } from "../../context/LanguageContext"

const Detail = () => {
  const { category, id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { language } = useLanguage()

  const langKey = language.startsWith("es") ? "es" : "en"
  
  const translations = {
    en: {
      loading: "Loading...",
      errorLoadingDetails: "Error loading movie details",
      releaseDate: "Release Date:",
      runtime: "Runtime:",
      rating: "Rating:",
      status: "Status:",
      cast: "Cast",
      similarMovies: "Similar Movies",
      similarTVShows: "Similar TV Shows",
      minutes: "minutes"
    },
    es: {
      loading: "Cargando...",
      errorLoadingDetails: "Error al cargar detalles de la película",
      releaseDate: "Fecha de estreno:",
      runtime: "Duración:",
      rating: "Calificación:",
      status: "Estado:",
      cast: "Reparto",
      similarMovies: "Películas Similares",
      similarTVShows: "Series Similares",
      minutes: "minutos"
    }
  }

  const t = translations[langKey]

  useEffect(() => {
    const getDetail = async () => {
      try {
        setLoading(true)
        setError(false)
        setItem(null)
        
        setLanguageForApi(language)
        
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const response = await tmdbApi.detail(category, id, { params: {} })
        if (response) {
          setItem(response)
          window.scrollTo(0, 0)
        } else {
          setError(true)
        }
      } catch (error) {
        console.error("Error fetching detail:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getDetail()
  }, [category, id, language])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl">{t.loading}</div>
      </div>
    )

  if (error || !item)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-2xl">{t.errorLoadingDetails}</div>
      </div>
    )

  return (
    <>
      <div className="relative h-[75vh]">
        <img
          src={apiConfig.originalImage(item.backdrop_path || item.poster_path)}
          alt={item.title || item.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>

      <div className="flex items-start justify-start max-w-7xl mx-auto -mt-[200px] relative px-8 mb-12">
        <div className="flex-1 md:hidden">
          <img
            src={apiConfig.originalImage(item.poster_path || item.backdrop_path)}
            alt={item.title || item.name}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>

        <div className="w-[70%] pl-8 relative md:w-full md:pl-0 space-y-8">
          <h1 className="text-6xl leading-none text-white font-bold md:text-4xl">
            {item.title || item.name}
          </h1>

          {item.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.genres.slice(0, 5).map((genre, index) => (
                <span
                  key={index}
                  className="py-2 px-6 border-2 border-white rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-white hover:text-gray-900 transition-colors"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {item.overview && (
            <p className="tracking-wider text-gray-300 leading-relaxed text-lg">
              {item.overview}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {item.release_date && (
              <div>
                <span className="font-semibold text-white">{t.releaseDate} </span>
                {new Date(item.release_date).getFullYear()}
              </div>
            )}
            {item.runtime && (
              <div>
                <span className="font-semibold text-white">{t.runtime} </span>
                {item.runtime} {t.minutes}
              </div>
            )}
            {item.vote_average && (
              <div>
                <span className="font-semibold text-white">{t.rating} </span>
                {item.vote_average.toFixed(1)}/10
              </div>
            )}
            {item.status && (
              <div>
                <span className="font-semibold text-white">{t.status} </span>
                {item.status}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-4">{t.cast}</h2>
            <CastList key={`cast-${language}`} id={item.id} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12">
          <VideoList key={`videos-${language}`} id={item.id} />
        </div>
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            {category === "movie" ? t.similarMovies : t.similarTVShows}
          </h2>
          <MovieList key={`similar-${language}`} category={category} type="similar" id={item.id} />
        </div>
      </div>
    </>
  )
}

export default Detail