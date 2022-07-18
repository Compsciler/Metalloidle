import { KEY_CHAR_LENGTH } from '../constants/settings'
import { VALID_CHARS } from '../constants/validChars'
import { unicodeSplit } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export const getStatuses = (
  solution: string,
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = unicodeSplit(solution)

  guesses.forEach((word) => {
    const correctIndices = new Array(solution.length).fill(false)
    unicodeSplit(word).forEach((letter, i) => {
      VALID_CHARS.forEach((validChar) => {
        if (!splitSolution.includes(letter)) {
          // make status absent
          if (validChar.includes(letter)) {
            return (charObj[validChar] = 'absent')
          }
        }
        if (letter === splitSolution[i]) {
          correctIndices[i] = true
        }
      })
    })
    outerLoop:
    for (let i = 0; i < solution.length; i += KEY_CHAR_LENGTH) {
      let j = i
      while (j < i + KEY_CHAR_LENGTH) {
        if (!correctIndices[j]) {
          continue outerLoop
        }
        j++
      }
      // make status present
      charObj[solution.substring(i, j)] = 'correct'
    }
  })

  return charObj
}

export const getGuessStatuses = (
  solution: string,
  guess: string
): CharStatus[] => {
  const splitSolution = unicodeSplit(solution)
  const splitGuess = unicodeSplit(guess)

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}
