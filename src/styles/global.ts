import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
  }
  body {
    background-color: ${(props) => props.theme['gray-800']};
    color: ${(props) => props.theme['gray-100']};
  }

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
  }

  [data-backdrop] {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: hsl(204 10% 10% / 0.1);
    backdrop-filter: blur(4px);
  }
`

export const ContainerFixed = styled.div`
  width: 100%;
  max-width: 1120px;

  margin: 0 auto;
  padding: 0 1.5rem;
`
