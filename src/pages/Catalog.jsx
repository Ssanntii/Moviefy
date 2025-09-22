import { useParams } from 'react-router-dom'
import MovieGrid from '../components/MovieGrid'

import PageHeader from '../components/PageHeader'

import { category as cate } from '../api/tmdbApi'
import { useLanguage } from '../context/LanguageContext'

const Catalog = () => {
    const { category } = useParams()
    const { language } = useLanguage()
    
    const langKey = language.startsWith("es") ? "es" : "en"
    
    const translations = {
        en: { movies: "Movies", tvShows: "TV Shows" },
        es: { movies: "Películas", tvShows: "Series" }
    }
    
    const title = category === cate.movie ? translations[langKey].movies : translations[langKey].tvShows

    return (
        <>
            <PageHeader>
                {title}
            </PageHeader>

            <div className='max-w-7xl mx-auto px-8'>
                <div className='mb-12'>
                    <MovieGrid key={`catalog-${category}-${language}`} category={category} />
                </div>
            </div>
        </>
    )
}

export default Catalog