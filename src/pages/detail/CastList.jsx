import React, { useEffect, useState } from "react"

import { useParams } from "react-router"

import tmdbApi from "../../api/tmdbApi"
import apiConfig from "../../api/apiConfig"

const CastList = (props) => {
    const { category } = props

    const [casts, setCasts] = useState([])

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category, props.id)
            setCasts()
        }
    })
}