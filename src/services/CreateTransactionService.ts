import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Transaction): Transaction {
    const balance = this.transactionsRepository.getBalance().total;

    if (type === 'outcome' && value > balance) {
      throw Error('This balance is insufficient');
    }

    const transaction = new Transaction({ title, value, type });
    this.transactionsRepository.create(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
