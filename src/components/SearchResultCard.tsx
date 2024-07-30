import { constructImdbUrl } from "../utils/api.ts";
import { FC } from "react";
import { Card } from "antd";
import { ArrayItem, SearchResult } from "../types.ts";

const SearchResultCard: FC<ArrayItem<SearchResult>> = ({
  imdbID,
  Year,
  Poster,
  Title,
}) => {
  return (
    <Card
      key={imdbID}
      className={"w-72 h-80"}
      bordered
      cover={
        <img
          src={Poster}
          alt={Title + " movie poster"}
          className={"h-56 w-full object-fill object-top"}
        />
      }
      hoverable
      onClick={() => window.open(constructImdbUrl(imdbID))}
    >
      <Card.Meta title={Title} description={Year} />
    </Card>
  );
};

export default SearchResultCard;
