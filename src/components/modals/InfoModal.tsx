import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the word in 6 tries. After each guess, the color of the tiles will
        change to show how close your guess was to the word.
      </p>
      <br />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The word will consist of a sequence of nonmetal and metalloid
        elemental symbols from the periodic table.
        All valid guesses must be words made from these symbols as well.
        (Note: keyboard typing has not yet been implemented on PC.)
      </p>
      {/* These symbols are all listed on the keyboard.*/}

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="Xe"
          status="correct"
        />
        <Cell value="N" />
        <Cell value="O" />
        <Cell value="N" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The symbol Xe is in the word and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="C" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="H"
          status="present"
        />
        <Cell value="Ar" />
        <Cell value="Ge" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The symbol H is in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="P" />
        <Cell value="At" />
        <Cell value="Te" />
        <Cell isRevealing={true} isCompleted={true} value="Rn" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The symbol Rn is not in the word in any spot.
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/Compsciler/Metalloidle"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
