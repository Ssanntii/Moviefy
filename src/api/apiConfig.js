const apiConfig = {
  baseURL: "https://api.themoviedb.org/3/",
  apiKey: "a5af826bc512272c8ee6bcc81eeccdfb",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig