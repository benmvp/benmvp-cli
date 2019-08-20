import React, {FunctionComponent, useState} from 'react'

import Button from './Button'

interface Props {
  initialCount?: number;
}

const Counter: FunctionComponent<Props> = ({
  initialCount = 0,
}) => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(initialCount)
  const onClick = () => setCount(count + 1)

  return (
    <div>
      <p className="text--medium">You clicked {count} times</p>
      <Button onClick={onClick}>
        Click me
      </Button>
    </div>
  )
}

export default Counter
