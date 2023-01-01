export interface UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isDeleting?: boolean;
}

export interface LoginUser {
  username: string;
  password: string;
}
