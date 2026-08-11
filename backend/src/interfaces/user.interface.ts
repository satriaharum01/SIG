export interface IUser {
    id: string;
    role_id: string;
    fullname: string;
    username: string;
    email: string | null;
    password?: string; // Optional ketika dikirim balik ke response API (demi keamanan)
    phone: string | null;
    avatar: string | null;
    is_active: number; // tinyint(1) -> 0 atau 1
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
  }