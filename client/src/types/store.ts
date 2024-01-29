import { IBooksList } from "./book";
import { IModal } from "./modal";

export interface IStore {
  storeBooks: {
    isLoading: boolean;
    booksList: IBooksList;
  };
  modal: IModal;
}
