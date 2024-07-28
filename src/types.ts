import { z } from "zod";

export const ApiSearchResultSchema = z.union([
  z.object({
    Response: z.literal("True"),
    totalResults: z.string(),
    Search: z.array(
      z.object({
        Title: z.string(),
        Year: z.string(),
        imdbID: z.string(),
        Type: z.string(),
        Poster: z.string(),
      }),
    ),
  }),
  z.object({
    Response: z.literal("False"),
    Error: z.string(),
  }),
]);

export type ApiSearchResult = z.infer<typeof ApiSearchResultSchema>;

export type SearchResult = Extract<
  ApiSearchResult,
  { Response: "True" }
>["Search"];

export type ArrayItem<T> = T extends Array<infer Item> ? Item : T;
