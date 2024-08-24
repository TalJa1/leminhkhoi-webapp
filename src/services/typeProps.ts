export interface Account {
  email: string;
  password: string;
}

export interface AccountState {
  accounts: Account[];
}
