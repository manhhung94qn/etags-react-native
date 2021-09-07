import { UserGuid } from "./models/UserGuid";
import { Word } from "./models/Word";

export type AddNewWordType = {
    word: Word,
    userGuids?: UserGuid[] | undefined
}