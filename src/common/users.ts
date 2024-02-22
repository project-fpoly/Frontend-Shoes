export interface IUsers {
  _id: string;
  userName: string;
  email: string;
  role: string;
  deliveryAddress: string;
  phoneNumbers: string;
  lastActivity?: string;
  avt: string;
  dateOfBirth: string;
  gender: string;
  password?: string;
}
