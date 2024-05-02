export interface ISendNoti {
  message: string;
  type: string;
  recipientType: string;
}

export interface INotification extends ISendNoti {
  _id: string;
  userId: string;
  isRead: boolean;
  createdAt: string;
}
