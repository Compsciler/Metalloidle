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
        Guess the word in 8 tries. After each guess, the color of the tiles will
        change to show how close your guess was to the word.
      </p>
      <br />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The word will consist of a sequence of the bigrams (2-letter combinations) 
        listed on the keyboard. 
        All valid guesses must be words made from these bigrams as well. 
        (If you are on PC, try typing them out!)
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="SE"
          status="correct"
        />
        <Cell value="MA" />
        <Cell value="NT" />
        <Cell value="IC" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The bigram SE is in the word and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="AL" />
        <Cell value="TE" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="RI"
          status="present"
        />
        <Cell value="NG" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The bigram RI is in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="DE" />
        <Cell value="LE" />
        <Cell value="TI" />
        <Cell isRevealing={true} isCompleted={true} value="ON" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The bigram ON is not in the word in any spot.
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/Compsciler/Bigramle-Plus"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
