import { IBooksList } from "./book";

export interface IStore {
  storeBooks: {
    isLoading: boolean;
    booksList: IBooksList;
  };
}
