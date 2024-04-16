import axios from "axios";

export  interface RegisterRequest {
    username: string;
    secret: string;
    email?: string;
    first_name?: string;
    last_name?: string;
  }
  export   interface LoginRequest {
    username: string;
    secret: string;
  }
  interface APIResponse {
    message: string;
  }
  export  const registerUserChat = async (userData: RegisterRequest) => {
    try {
      const response = await axios.post('/signup', userData);
      return response.data as APIResponse;
    } catch (error:any) {
      throw new Error(error.response.data.message);
    }
  }
  export   const loginUserChat = async (userData: LoginRequest) => {
    try {
      const response = await axios.post('/login', userData);
      return response.data as APIResponse;
    } catch (error:any) {
      throw new Error(error.response.data.message);
    }
  }
 
  