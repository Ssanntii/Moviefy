import { Link } from "react-router-dom"
import { Play } from "lucide-react"
import Button from "./Button"
import { category } from "../api/tmdbApi"
import apiConfig from "../api/apiConfig"
import * as Config from "../constants/Config"

const MovieCard = (props) => {
  const item = props.item
  const link = `/${Config.HOME_PAGE}/${category[props.category]}/${item.id}`
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path)

  return (
    <Link to={link}>
      <div
        className="relative bg-top bg-no-repeat bg-cover pt-[160%] rounded-lg mb-4 before:content-[''] before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:bg-black before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out before:rounded-lg hover:before:opacity-80 group"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out">
          <Button>
            <Play size={20} />
          </Button>
        </div>
      </div>
      <h3 className="text-white font-semibold truncate">{item.title || item.name}</h3>
    </Link>
  )
}

export default MovieCard
