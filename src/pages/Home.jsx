import { Link } from 'react-router-dom'

import { OutlineButton } from '../components/Button'
import HeroSlide from '../components/HeroSlide'
import MovieList from '../components/MovieList'

import { category, movieType, tvType } from '../api/tmdbApi'
import { useLanguage } from '../context/LanguageContext'

import * as Config from '../constants/Config'

const Home = () => {
    const { language } = useLanguage()
    
    const langKey = language.startsWith("es") ? "es" : "en"

    const translations = {
        en: {
            trendingMovies: "Trending Movies",
            topRatedMovies: "Top Rated Movies", 
            trendingTV: "Trending TV",
            topRatedTV: "Top Rated TV",
            viewMore: "View more"
        },
        es: {
            trendingMovies: "Películas Populares",
            topRatedMovies: "Películas Mejor Valoradas",
            trendingTV: "Series Populares", 
            topRatedTV: "Series Mejor Valoradas",
            viewMore: "Ver más"
        }
    }

    const t = translations[langKey];

    return (
       <>
        <HeroSlide key={language} />

        <div className='max-w-7xl mx-auto px-8'>
            <div className='mb-12'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-3xl font-bold text-white'>{t.trendingMovies}</h2>
                    <Link to={`/${Config.HOME_PAGE}/movie`}>
                        <OutlineButton className='small'>{t.viewMore}</OutlineButton>
                    </Link>
                </div>
                <MovieList key={`trending-movies-${language}`} category={category.movie} type={movieType.popular} />
            </div>

            <div className='mb-12'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-3xl font-bold text-white'>{t.topRatedMovies}</h2>
                    <Link to={`/${Config.HOME_PAGE}/movie`}>
                        <OutlineButton className='small'>{t.viewMore}</OutlineButton>
                    </Link>
                </div>
                <MovieList key={`top-movies-${language}`} category={category.movie} type={movieType.top_rated} />
            </div>

            <div className='mb-12'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-3xl font-bold text-white'>{t.trendingTV}</h2>
                    <Link to={`/${Config.HOME_PAGE}/tv`}>
                        <OutlineButton className='small'>{t.viewMore}</OutlineButton>
                    </Link>
                </div>
                <MovieList key={`trending-tv-${language}`} category={category.tv} type={tvType.popular} />
            </div>

            <div className='mb-12'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-3xl font-bold text-white'>{t.topRatedTV}</h2>
                    <Link to={`/${Config.HOME_PAGE}/tv`}>
                        <OutlineButton className='small'>{t.viewMore}</OutlineButton>
                    </Link>
                </div>
                <MovieList key={`top-tv-${language}`} category={category.tv} type={tvType.top_rated} />
            </div>
        </div>
       </> 
    )
}

export default Home