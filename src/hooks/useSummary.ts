import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from './../contexts/TransactionContext'

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, (ctx) => {
    return ctx.transactions
  })

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else if (transaction.type === 'outcome') {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }
        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return summary
}
