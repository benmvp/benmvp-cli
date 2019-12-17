import React, { FunctionComponent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick?: () => void
}

const Button: FunctionComponent<Props> = ({ onClick, children }) => (
  <button type="button" onClick={() => onClick && onClick()}>
    {children}
  </button>
)

export default Button
