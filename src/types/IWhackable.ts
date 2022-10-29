import { Tag } from "./Tag";

export interface IWhackable {
  tags: Tag[]
  onWhack: () => void;
}