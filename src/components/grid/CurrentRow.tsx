import { Cell } from './Cell'
import { unicodeSplit, unicodeLength } from '../../lib/words'

type Props = {
  guess: string
  solution: string
  className: string
}

export const CurrentRow = ({ guess, solution, className }: Props) => {
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(unicodeLength(solution) - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
