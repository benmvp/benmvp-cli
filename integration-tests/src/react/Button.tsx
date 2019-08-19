import React, {FunctionComponent, ReactNode} from 'react'


interface Props {
  onClick: () => void;
  children: ReactNode;
}

const Button: FunctionComponent<Props> = ({
  onClick,
  children,
}) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
)

export default Button
