

export interface BookGetDTO {
    id: number;
    name: string;
}

export interface SingleBookGetDTO extends BookGetDTO {
    score: number;
}

export interface PastBookDTO {
    name: string;
    score: number;
}

export interface PresentBookDTO {
    name: string;
}