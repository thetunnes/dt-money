import { useCallback, useState, useEffect, ReactNode } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../libs/api'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (q?: string) => Promise<void>
  createNewTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextType)

interface ProviderProps {
  children: ReactNode
}
export function TransactionsProvider({ children }: ProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    // const url = new URL('http://localhost:3000/transactions')
    // if (query) {
    //   url.searchParams.append('q', query)
    // }
    // const response = await fetch(url)
    // const data = await response.json()

    const { data } = await api.get(
      '/transactions?_sort=createdAt&_order=desc',
      {
        params: {
          q: query,
        },
      },
    )
    setTransactions(data)
  }, [])

  const createNewTransaction = useCallback(async (dataInputs: CreateTransactionInput) => {
    const { description, price, category, type } = dataInputs

    const { data } = await api.post('/transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((prev) => [data, ...prev])
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createNewTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
