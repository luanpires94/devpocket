import { CodeLanguage } from "../constants/languages";

export type Snippet = {
  id: string;
  title: string;
  code: string;
  language: CodeLanguage;
  tags: string[];
  isFavorite?: boolean;
  createdAt: number;
  updatedAt: number;
};
