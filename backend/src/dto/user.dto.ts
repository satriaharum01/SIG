export interface CreateUserDTO {
    role_uuid: string;
    fullname: string;
    username: string;
    email?: string;
    password: string;
    phone?: string;
    avatar?: string;
    is_active?: number;
  }
  
  export interface UpdateUserDTO {
    role_uuid?: string;
    fullname?: string;
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    avatar?: string;
    is_active?: number;
  }