import React, { useEffect, useState } from "react"

import { useParams } from "react-router"

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
        <div className="casts">
            {casts.map((casts, index) => (
                <div key={index} className="casts_item">
                    <div className="casts_item_img"
                        style={{ backgroundImage: `url(${apiConfig.w500Image(casts.profile_path)})` }}
                    ></div>
                    <p className="casts_item_name">{cast.name}</p>
                </div>
            ))}
        </div>
    )
}

export default CastList