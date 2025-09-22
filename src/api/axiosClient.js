import axios from "axios"
import queryString from "query-string"
import apiConfig from "./apiConfig"

let currentLanguage = "en-US"

export const setLanguageForApi = (lang) => {
  currentLanguage = lang;
}

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${apiConfig.apiKey}`
  },
  paramsSerializer: (params) =>
    queryString.stringify({
      ...params,
      api_key: apiConfig.apiKey,
      language: currentLanguage
    })
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response
  },
  (error) => {
    throw error
  }
)

export default axiosClient
