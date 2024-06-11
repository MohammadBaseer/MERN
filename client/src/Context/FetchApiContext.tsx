import { ReactNode, createContext, useEffect, useState } from "react";
import { ApiResponse, BooksDataType } from "../@Types/Types";

type FetchApiContextType = {
  data: BooksDataType[] | null;
};

const initFetchApiContext = {
  data: [] as BooksDataType[] | null,
};

export const FetchApiContext = createContext<FetchApiContextType>(initFetchApiContext);
type FetchApiContextProvider = {
  children: ReactNode;
};
const FetchApiContextProvider = ({ children }: FetchApiContextProvider) => {
  const [data, setData] = useState<BooksDataType[] | null>(null);

  const ApiURL = "http://localhost:5000/api/books/all";
  const ApiData = async (ApiURL: string) => {
    try {
      const url = await fetch(ApiURL);
      const result = (await url.json()) as ApiResponse;

      setData(result.allBooks);
    } catch (error) {}
  };

  useEffect(() => {
    ApiData(ApiURL);
  }, []);

  return <FetchApiContext.Provider value={{ data }}> {children}</FetchApiContext.Provider>;
};

export default FetchApiContextProvider;
