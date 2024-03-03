export interface INotification{
    _id:string,
    userId:string,
    message:string,
    type:string,
    isRead:boolean,
    recipientType:string,
    createdAt:Date
}