import bookReducer from "./books/bookSlice";
import modalReducer from "./modals/modalSlice";

export default {
  storeBooks: bookReducer,
  modal: modalReducer,
};
