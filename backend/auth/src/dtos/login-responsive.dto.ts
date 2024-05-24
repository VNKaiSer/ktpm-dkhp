import { Account } from 'src/entities/Account';

export interface LoginResponse {
  account?: Account;
  status: string;
  token: string;
  mess?: string;
}
