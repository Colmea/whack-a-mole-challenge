import { Tag } from "./Tag";

export interface IWhackable {
  isActive?: boolean;
  tags: Tag[];
  onWhack: () => void;
}
