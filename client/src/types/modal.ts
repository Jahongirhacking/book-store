import { ReactElement } from "react";

export interface IModal {
  isActive: boolean;
  title: string;
  content: string;
  buttons: ReactElement[];
}
