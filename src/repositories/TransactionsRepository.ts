import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce<number>((total, transaction) => {
      return transaction.type === 'income'
        ? total + transaction.value
        : total + 0;
    }, 0);
    const outcome = this.transactions.reduce<number>((total, transaction) => {
      return transaction.type === 'outcome'
        ? total + transaction.value
        : total + 0;
    }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ id, title, value, type }: Transaction): Transaction {
    const transaction = {
      id,
      title,
      value,
      type,
    };
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
