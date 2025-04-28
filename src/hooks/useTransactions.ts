import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { useMemo } from "react";

export function useTransactions() {
  const transactions = useContextSelector(
    TransactionsContext,
    (context) => context.transactions
  );

  const transactionsCurrentPage = useContextSelector(
    TransactionsContext,
    (context) => context.transactionsCurrentPage
  );

  const currentPage = useContextSelector(
    TransactionsContext,
    (context) => context.currentPage
  );

  const setCurrentPage = useContextSelector(
    TransactionsContext,
    (context) => context.setCurrentPage
  );

  const fetchTransactionsCurrentPage = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactionsCurrentPage
  );

  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => context.createTransaction
  );

  const limitPage = useContextSelector(
    TransactionsContext,
    (context) => context.limitPage
  );

  const maxPage = useMemo(
    () => Math.ceil(transactions.length / limitPage) || 1,
    [transactions]
  );

  return {
    transactions,
    transactionsCurrentPage,
    currentPage,
    maxPage,
    setCurrentPage,
    fetchTransactionsCurrentPage,
    createTransaction,
  };
}
