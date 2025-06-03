export type Debtor = {
  id: string;
  name: string;
  phone?: string;
  totalDebt: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type Payment = {
  id: string;
  debtorId: string;
  amount: number;
  paidAt: string;
};
