import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import Button from "./Button";
import { category } from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import * as Config from "../constants/Config";

const MovieCard = (props) => {
  const item = props.item;
  const link =
    "/" + Config.HOME_PAGE + "/" + category[props.category] + "/" + item.id;
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div 
        className="relative bg-top bg-no-repeat bg-cover pt-[160%] rounded-lg mb-4 before:content-[''] before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:bg-black before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out before:rounded-lg hover:before:opacity-80 group"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-300 ease-in-out group-hover:scale-100">
          <Button>
            <Play size={20} />
          </Button>
        </div>
      </div>
      <h3 className="text-white font-semibold">{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;