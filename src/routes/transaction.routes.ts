import { Router } from 'express';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);

transactionRouter.get('/', (request, response) => {
  try {
    const transactionsAndBalance = {
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    };
    return response.json(transactionsAndBalance);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, type, value } = request.body;
    const transactional = new Transaction({
      title,
      type,
      value,
    });
    createTransactionService.execute(transactional);
    return response.json(transactional);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
