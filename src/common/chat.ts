export interface CreatedBy {
    _id: string;
    userName: string;
    email: string;
}

export interface UserChatByEmail {
    _id?: string;
    username: string;
    secret: string;
    create_by?: CreatedBy;
    id_chat?: number;
    updatedAt?: string;
    createdAt?: string;
    __v?: number;
}
