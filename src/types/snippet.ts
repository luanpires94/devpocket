import { CodeLanguage } from "../constants/languages";

export type Snippet = {
  id: string;
  title: string;
  code: string;
  language: CodeLanguage;
  tags: string[];
  createdAt: number;
  updatedAt: number;
};
