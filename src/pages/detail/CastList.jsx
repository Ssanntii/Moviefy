import React, { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import tmdbApi from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"

const CastList = (props) => {
    const { category } = useParams()

    const [casts, setCasts] = useState([])

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category, props.id)
            setCasts(res.cast.slice(0, 5))
        }
        getCredits()
    }, [category, props.id])

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {casts.map((cast, index) => (
                <div key={index} className="text-center">
                    <div 
                        className="w-20 h-20 mx-auto mb-2 rounded-full bg-cover bg-center bg-gray-300"
                        style={{ backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})` }}
                    ></div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{cast.name}</p>
                </div>
            ))}
        </div>
    )
}

export default CastList