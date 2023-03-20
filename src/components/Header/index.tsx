import { memo } from 'react'
import { Logo } from '../../Logo'
import { useDialogState } from 'ariakit/dialog'
import { NewTransactionModal } from '../NewTransactionModal'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

export function Header() {
  const dialog = useDialogState()

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo />
        <NewTransactionButton onClick={dialog.toggle}>
          Nova transação
        </NewTransactionButton>
        <NewTransactionModal dialog={dialog} />
      </HeaderContent>
    </HeaderContainer>
  )
}
