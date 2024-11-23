import { PastBookDTO, PresentBookDTO } from "./bookDTO";

export interface UserGetDTO {
    id: number;
    name: string;
}

export interface SingleUserGetDTO {
    id: number;
    name: string;
    pastOwnedBooks: PastBookDTO[];
    presentBooks: PresentBookDTO[];
}