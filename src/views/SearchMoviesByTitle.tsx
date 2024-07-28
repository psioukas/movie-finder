import { Flex, Input, Typography } from "antd";
import SearchResultCard from "../components/SearchResultCard.tsx";
import { useState } from "react";
import { SearchResult } from "../types.ts";
import useSearchHistory from "../hooks/useSearchHistory.ts";
import { SearchOutlined } from "@ant-design/icons";

function SearchMoviesByTitle() {
  const { isLoading, handleSearchApi, error, clearError } = useSearchHistory();

  const [results, setResults] = useState<SearchResult>([]);

  async function handleSearch(value: string) {
    const data = await handleSearchApi(value);

    if (data !== undefined && data.Response === "True") {
      setResults(data.Search);
    }
  }

  return (
    <Flex vertical className="h-full overflow-y-auto" align={"center"}>
      <Typography.Title level={5} copyable={false} unselectable={"on"}>
        Search for movies
      </Typography.Title>

      <Input.Search
        name={"searchTerm"}
        onSearch={handleSearch}
        loading={isLoading}
        placeholder={"i.e Star Wars"}
        variant={"filled"}
        size={"large"}
        status={error !== null ? "error" : undefined}
        onChange={() => error !== null && clearError()}
        disabled={isLoading}
        enterButton={<SearchOutlined />}
      />
      {error !== null && (
        <Typography.Title level={5} type={"danger"} className={"my-2"}>
          {error}
        </Typography.Title>
      )}
      <Flex
        gap={32}
        className="w-full p-1 mt-4 overflow-hidden"
        justify={"center"}
        align={"center"}
      >
        {!isLoading &&
          results.slice(0, 3).map((result) => {
            return <SearchResultCard key={result.imdbID} {...result} />;
          })}
      </Flex>
    </Flex>
  );
}

export default SearchMoviesByTitle;
