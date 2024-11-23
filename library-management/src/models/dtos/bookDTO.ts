

export interface BookGetDTO {
    id: number;
    name: string;
}

export interface SingleBookGetDTO extends BookGetDTO {
    score: number;
}

export interface UserBooksDTO{
    past: PastBookDTO[];
    present: PresentBookDTO[];
}
export interface PastBookDTO {
    name: string;
    userScore: number;
}

export interface PresentBookDTO {
    name: string;
}