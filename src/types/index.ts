export interface FileObject {
  name: string;
  id: string;
  created_at: string;
  size: number;
}

export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    full_name?: string;
  };
}