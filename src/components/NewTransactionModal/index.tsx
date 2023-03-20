import { DialogHeading, DialogDismiss, DialogState } from 'ariakit/dialog'
import { Radio, useRadioState } from 'ariakit/radio'
import { ArrowCircleUp, ArrowCircleDown, X } from 'phosphor-react'
import z from 'zod'
import { NewTransactionButton } from '../Header/styles'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ModalContainer,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from '../../contexts/TransactionContext'
import { memo } from 'react'

interface Props {
  dialog: DialogState
}

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

function NewTransactionModalComponent({ dialog }: Props) {
  const radio = useRadioState()
  const createNewTransaction = useContextSelector(TransactionContext, (ctx) => {
    return ctx.createNewTransaction
  })

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await createNewTransaction(data)
    reset()
  }

  return (
    <ModalContainer state={dialog} className="dialog">
      <DialogDismiss className="buttonClose">
        <X size={20} />
      </DialogDismiss>
      <DialogHeading className="heading">Nova transação</DialogHeading>

      <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
        <input
          type="text"
          placeholder="Descrição"
          required
          {...register('description')}
        />
        <input
          type="number"
          placeholder="Preço"
          required
          {...register('price', { valueAsNumber: true })}
        />
        <input
          type="text"
          placeholder="Categoria"
          required
          {...register('category')}
        />

        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <TransactionType state={radio} onChange={field.onChange}>
              <TransactionTypeButton
                htmlFor="income"
                variant="income"
                isActive={radio.value}
              >
                <ArrowCircleUp size={32} />
                Entrada
                <Radio value="income" id="income" />
              </TransactionTypeButton>
              <TransactionTypeButton
                htmlFor="outcome"
                variant="outcome"
                isActive={radio.value}
              >
                <ArrowCircleDown size={32} />
                Saída
                <Radio value="outcome" id="outcome" />
              </TransactionTypeButton>
            </TransactionType>
          )}
        />

        <NewTransactionButton type="submit" disabled={isSubmitting}>
          Cadastrar
        </NewTransactionButton>
      </form>
    </ModalContainer>
  )
}

export const NewTransactionModal = memo(NewTransactionModalComponent)
