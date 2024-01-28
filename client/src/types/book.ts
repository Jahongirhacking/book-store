export interface IBook {
  _id?: string;
  title: string;
  author: string;
  publishYear: number;
}

export interface IBooksList {
  count: number;
  books: IBook[];
}
