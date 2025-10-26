
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

export interface Budget {
  category: string;
  amount: number;
}

export interface SavingsAccount {
    id: string;
    name: string;
    balance: number;
}
