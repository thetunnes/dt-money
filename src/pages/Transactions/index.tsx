import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { priceFormatter, dateFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from './../../contexts/TransactionContext'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const transactions = useContextSelector(TransactionContext, (ctx) => {
    return ctx.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          {transactions && (
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td width="40%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' ? '- ' : `  `}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
