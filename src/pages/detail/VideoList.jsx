import { useEffect, useRef, useState } from "react"

import { useParams } from "react-router-dom"

import tmdbApi from "../../api/tmdbApi"
import { useLanguage } from "../../context/LanguageContext"

const VideoList = (props) => {
    const { category } = useParams()
    const { language } = useLanguage()

    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const langKey = language.startsWith("es") ? "es" : "en"
    
    const translations = {
        en: {
            videosTrailers: "Videos & Trailers",
            loadingVideos: "Loading videos...",
            errorLoadingVideos: "Error loading videos",
            noVideosAvailable: "No videos available"
        },
        es: {
            videosTrailers: "Videos y Trailers",
            loadingVideos: "Cargando videos...",
            errorLoadingVideos: "Error al cargar videos",
            noVideosAvailable: "No hay videos disponibles"
        }
    }

    const t = translations[langKey]

    useEffect(() => {
        const getVideos = async () => {
            try {
                setLoading(true)
                setError(false)
                const res = await tmdbApi.getVideos(category, props.id)
                
                if (res && res.results && Array.isArray(res.results)) {
                    setVideos(res.results.slice(0, 5))
                } else {
                    console.error('Invalid videos response:', res)
                    setVideos([])
                }
            } catch (error) {
                console.error('Error fetching videos:', error)
                setError(true)
                setVideos([])
            } finally {
                setLoading(false)
            }
        }
        getVideos()
    }, [category, props.id, language])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-white text-lg">{t.loadingVideos}</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-red-500 text-lg">{t.errorLoadingVideos}</div>
            </div>
        )
    }

    if (videos.length === 0) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-gray-500 text-lg">{t.noVideosAvailable}</div>
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-8">{t.videosTrailers}</h2>
            <div className="space-y-8">
                {videos.map((item, index) => (
                    <Video key={index} item={item} />
                ))}
            </div>
        </div>
    )
}

const Video = (props) => {
    const item = props.item
    const iframeRef = useRef(null)
    const { language } = useLanguage()

    const langKey = language.startsWith("es") ? "es" : "en";
    
    const translations = {
        en: {
            video: "Video"
        },
        es: {
            video: "Video"
        }
    };

    const t = translations[langKey];

    useEffect(() => {
        const updateHeight = () => {
            if (iframeRef.current) {
                const height = (iframeRef.current.offsetWidth * 9) / 16 + "px"
                iframeRef.current.style.height = height
            }
        }

        updateHeight()

        window.addEventListener('resize', updateHeight)

        return () => {
            window.removeEventListener('resize', updateHeight)
        }
    }, [])

    if (!item || !item.key) {
        return null
    }

    return (
        <div className="mb-8">
            <div className="mb-4">
                <h3 className="text-xl font-semibold text-white">
                    {item.name || t.video}
                </h3>
                {item.type && (
                    <p className="text-gray-400 text-sm mt-1">{item.type}</p>
                )}
            </div>
            <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <iframe 
                    src={`https://www.youtube.com/embed/${item.key}`}
                    ref={iframeRef}
                    width="100%"
                    title={item.name || t.video}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full"
                />
            </div>
        </div>
    )
}

export default VideoList