const apiConfig = {
  baseURL: import.meta.env.VITE_URL,
  apiKey: import.meta.env.VITE_TOKEN,
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig