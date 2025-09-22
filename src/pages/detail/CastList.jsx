import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import tmdbApi from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"
import { useLanguage } from "../../context/LanguageContext"

const CastList = (props) => {
    const { category } = useParams()
    const { language } = useLanguage()

    const [casts, setCasts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const langKey = language.startsWith("es") ? "es" : "en"
    
    const translations = {
        en: {
            loadingCast: "Loading cast...",
            errorLoadingCast: "Error loading cast",
            noCastAvailable: "No cast information available"
        },
        es: {
            loadingCast: "Cargando reparto...",
            errorLoadingCast: "Error al cargar reparto",
            noCastAvailable: "No hay información de reparto disponible"
        }
    };

    const t = translations[langKey]

    useEffect(() => {
        const getCredits = async () => {
            try {
                setLoading(true)
                setError(false)
                const res = await tmdbApi.credits(category, props.id)
                
                if (res && res.cast && Array.isArray(res.cast)) {
                    setCasts(res.cast.slice(0, 5))
                } else {
                    console.error('Invalid cast response:', res)
                    setCasts([])
                }
            } catch (error) {
                console.error('Error fetching cast:', error)
                setError(true)
                setCasts([])
            } finally {
                setLoading(false)
            }
        }
        getCredits()
    }, [category, props.id, language])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-4">
                <div className="text-white text-lg">{t.loadingCast}</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-4">
                <div className="text-red-500 text-lg">{t.errorLoadingCast}</div>
            </div>
        )
    }

    if (casts.length === 0) {
        return (
            <div className="flex items-center justify-center py-4">
                <div className="text-gray-500 text-lg">{t.noCastAvailable}</div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {casts.map((cast, index) => (
                <div key={index} className="text-center">
                    <div 
                        className="w-20 h-20 mx-auto mb-2 rounded-full bg-cover bg-center bg-gray-300"
                        style={{ 
                            backgroundImage: cast.profile_path 
                                ? `url(${apiConfig.w500Image(cast.profile_path)})` 
                                : 'none'
                        }}
                    >
                        {!cast.profile_path && (
                            <div className="w-full h-full flex items-center justify-center rounded-full bg-gray-600">
                                <span className="text-white text-xs font-bold">
                                    {cast.name ? cast.name.charAt(0).toUpperCase() : '?'}
                                </span>
                            </div>
                        )}
                    </div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                        {cast.name}
                    </p>
                    {cast.character && (
                        <p className="text-xs text-gray-500 truncate mt-1">
                            {cast.character}
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default CastList