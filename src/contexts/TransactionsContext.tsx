import { ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";
import { number } from "zod";

export interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: Transaction[];
  transactionsCurrentPage: Transaction[];
  currentPage: number;
  limitPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchTransactionsCurrentPage: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsCurrentPage, setTransactionsCurrentPage] = useState<
    Transaction[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPage = 5;

  async function fetchTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        _sort: "createAt",
        _order: "desc",
        q: query,
      },
    });
    setTransactions(response.data);
  }

  async function fetchTransactionsCurrentPage(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        _page: currentPage,
        _limit: limitPage,
        _sort: "createAt",
        _order: "desc",
        q: query,
      },
    });
    setTransactionsCurrentPage(response.data);
    fetchTransactions(query);
  }

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data;
      const response = await api.post("transactions", {
        description,
        price,
        category,
        type,
        createAt: new Date(),
      });

      setTransactions((state) => [response.data, ...state]);
    },
    []
  );

  useEffect(() => {
    fetchTransactionsCurrentPage();
  }, []);

  useEffect(() => {
    fetchTransactionsCurrentPage();
  }, [currentPage]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionsCurrentPage,
        currentPage,
        limitPage,
        setCurrentPage,
        fetchTransactionsCurrentPage,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
