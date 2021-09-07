import { WordType } from "../enums/WordType";

export type Word = {
    id?: number,
    english: string,
    vietNam: string,
    type: WordType | null,
    pronuncation: string,
    imageUrl?: string
}
