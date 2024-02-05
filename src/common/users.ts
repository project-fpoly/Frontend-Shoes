export interface IUsers {
  _id: string;
  userName: string;
  email: string;
  role: string;
  deliveryAddress: { address: string }[];
  phoneNumbers: { phoneNumber: string }[];
  lastActivity?: string;
  avt: string;
  dateOfBirth: string;
  gender: string;
  password?: string;
}
