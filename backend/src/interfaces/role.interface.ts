export interface IRole {
    uuid: string;
    name: string;
    description: string | null;
    created_at?: Date;
    updated_at?: Date;
  }