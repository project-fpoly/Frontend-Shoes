interface IUser {
  _id: string;
  key: string;
  userName: string;
  email: string;
  password: string;
  role: "admin" | "member";
  deliveryAddress?: array;
  gender?: string;
  phoneNumbers?: string;
  dateOfBirth: string;
  avt?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export default IUser;

export interface RegisterResponse {
  message: string;
  user: {
    name: string;
    address?: string;
    email: string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
