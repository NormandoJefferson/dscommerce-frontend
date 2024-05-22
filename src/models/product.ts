import { CategoryDTO } from "./categories";

export type productDTO = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  categories: CategoryDTO[];
};
