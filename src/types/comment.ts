export interface IComment {
  id: string;
  nickname: string | null;
  email: string;
  message: string;
  createdAt: string;
  consent: boolean;
}
