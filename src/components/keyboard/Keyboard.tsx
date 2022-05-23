import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'
import { localeAwareUpperCase } from '../../lib/words'
import { VALID_CHARS } from '../../constants/validChars'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  solution: string
  guesses: string[]
  isRevealing?: boolean
  letterSequence: string
  setLetterSequence: Dispatch<SetStateAction<string>>
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
  isRevealing,
  letterSequence,
  setLetterSequence,
}: Props) => {
  const charStatuses = getStatuses(solution, guesses)

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = localeAwareUpperCase(e.key)
        const newLetterSequence = letterSequence + key
        setLetterSequence(newLetterSequence)
        if (isValidKey(newLetterSequence)) {
          onChar(newLetterSequence)
          setLetterSequence('')
        } else {
          if (!isValidPrefix(newLetterSequence)) {
            setLetterSequence(key)
          }
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1">
        {['AL', 'AN', 'AR', 'CA', 'CH', 'CO', 'DE', 'EN', 'ER', 'ET', 'IC'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            solution={solution}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {['IN', 'LA', 'LE', 'LI', 'LL', 'LY', 'MA', 'ND', 'NE', 'NG', 'NT'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            solution={solution}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick} solution={solution}>
          {ENTER_TEXT}
        </Key>
        {['ON', 'OR', 'RA', 'RE', 'RI', 'SE', 'SH', 'ST', 'TA', 'TE'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            solution={solution}
          />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick} solution={solution}>
          {DELETE_TEXT}
        </Key>
      </div>
    </div>
  )
}

export const isValidKey = (key: string) => {
  return VALID_CHARS.includes(key)
}

const isValidPrefix = (s: string) => {
  return VALID_CHARS.filter(valid_char => valid_char.indexOf(s) == 0).length > 0
}
