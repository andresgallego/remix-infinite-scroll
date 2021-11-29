import { useReducer } from "react";

import { useGrid } from "../Grid";
import { Image as ImageProps } from "../../types/Image";

type CardProps = {
  item: ImageProps;
};

function Card() {
  const { item } = useGrid<CardProps>();

  return (
    // <div className="card-wrapper">
    //   <figure className="card-figure">
    //     <figcaption className="card-front">
    //       <img className="card-image" src={item.download_url} alt={item.author} />
    //     </figcaption>
    //     <figcaption>
    //       Photo by
    //       <span>{item.author}</span>
    //     </figcaption>
    //   </figure>
    // </div>
    <div className="card-wrapper">
      <img className="card-image" src={item.download_url} alt={item.author} />
    </div>
  );
}

export default Card;
