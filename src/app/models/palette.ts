import { ColorInPalette } from "./colorInPalette";
import { Tag } from "./tag";
import { User } from "./user";

export interface Palette {
    id?: number,
    name: string,
    private: boolean,
    modelType: string,
    creator?: User,
    tags: Tag[],
    colorInPalettes: ColorInPalette[]
}