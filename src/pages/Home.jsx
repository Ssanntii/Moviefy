import { Link } from 'react-router-dom'

import { OutlineButton } from '../components/Button'
import HeroSlide from '../components/HeroSlide'
import MovieList from '../components/MovieList'

import { category, movieType, tvType } from '../api/tmdbApi'

import * as Config from '../constants/Config'

const Home = () => {
    return (
       <>
        <HeroSlide />

        <div className='max-w-7xl mx-auto px-8'>
            <div className='mb-12'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-3xl font-bold text-white'>Trending Movies</h2>
                    <Link to={`/${Config.HOME_PAGE}/movie`}>
                        <OutlineButton className='small'>View more</OutlineButton>
                    </Link>
                </div>
                <MovieList category = {category.movie} type = {movieType.popular} />
            </div>

            <div className='mb-12'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-3xl font-bold text-white'>Top Rated Movies</h2>
                    <Link to = {`/${Config.HOME_PAGE}/movie`}>
                        <OutlineButton className='small'>View more</OutlineButton>
                    </Link>
                </div>
                <MovieList category = {category.movie} type = {movieType.top_rated} />
            </div>

            <div className='mb-12'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-3xl font-bold text-white'>Trending TV</h2>
                    <Link to = {`/${Config.HOME_PAGE}/tv`}>
                        <OutlineButton className='small'>View more</OutlineButton>
                    </Link>
                </div>
                <MovieList category = {category.tv} type = {tvType.popular} />
            </div>

            <div className='mb-12'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-3xl font-bold text-white'>Top Rated TV</h2>
                    <Link to = {`/${Config.HOME_PAGE}/tv`}>
                        <OutlineButton className='small'>View more</OutlineButton>
                    </Link>
                </div>
                <MovieList category = {category.tv} type = {tvType.top_rated} />
            </div>
        </div>
       </> 
    )
}

export default Home