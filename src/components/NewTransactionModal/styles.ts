import { Dialog } from 'ariakit/dialog'
import { RadioGroup } from 'ariakit/radio'
import styled, { css } from 'styled-components'

export const ModalContainer = styled(Dialog)`
  min-width: 32rem;
  background: ${(props) => props.theme['gray-800']};
  border-radius: 6px;
  padding: 2.5rem 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .buttonClose {
    align-self: flex-end;
    background: none;
    border: 0;
    color: ${(props) => props.theme['gray-500']};
    font-size: 0;
  }

  .heading {
    align-self: flex-start;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }
    }

    button[type='submit'] {
      margin-top: 2.25rem;

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
`

export const TransactionType = styled(RadioGroup)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'
  isActive: null | string | number
}

export const TransactionTypeButton = styled.label<TransactionTypeButtonProps>`
  background: ${(props) => props.theme['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border-radius: 6px;
  cursor: pointer;

  border: 0;
  color: ${(props) => props.theme['gray-100']};

  input {
    appearance: none;
    background: transparent !important;
    padding: 0 !important;
    :focus {
      box-shadow: unset;
    }
  }

  :focus-within {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
  }

  &:hover {
    background: ${(props) => props.theme['gray-600']};
  }

  svg {
    color: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-500']
        : props.theme['red-500']};
  }

  ${(props) =>
    props.isActive === props.variant &&
    css`
      background: ${props.variant === 'income'
        ? props.theme['green-700']
        : props.theme['red-700']};

      color: ${(props) => props.theme.white};
      svg {
        color: ${(props) => props.theme.white};
      }
      &:hover {
        background: ${props.variant === 'income'
          ? props.theme['green-700']
          : props.theme['red-700']};
      }
    `}
`
