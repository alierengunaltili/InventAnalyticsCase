

export interface UserGetDTO {
    id: number;
    name: string;
}

export interface UserListDTO {
    users: UserGetDTO[];
}