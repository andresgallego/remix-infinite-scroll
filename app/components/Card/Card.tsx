import { useReducer } from "react";

import { useGrid } from "../Grid";
import { Image as ImageProps } from "../../types/Image";

type CardProps = {
  item: ImageProps;
};

function Card() {
  const { item } = useGrid<CardProps>();

  return (
    <div>
      <figure>
        <figcaption>
          <img src={item.download_url} alt={item.author} />
        </figcaption>
        <figcaption>
          Photo by
          <span>{item.author}</span>
        </figcaption>
      </figure>
    </div>
  );
}

export default Card;
