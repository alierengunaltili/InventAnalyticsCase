

export interface BookGetDTO {
    id: number;
    name: string;
}

export interface SingleBookGetDTO extends BookGetDTO {
    score: number;
}