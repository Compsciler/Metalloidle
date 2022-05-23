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
        The word will consist of a sequence of the bigrams (2-letter combinations) 
        listed on the keyboard. 
        All valid guesses must be made from these bigrams as well. 
        (If you are on PC, try typing them out!)
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="T"
          status="correct"
        />
        <Cell value="A" />
        <Cell value="N" />
        <Cell value="G" />
        <Cell value="L" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter T is in the word and in the correct spot. 
        (However, the first bigram could be TE instead.)
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="D" />
        <Cell value="E" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="A"
          status="present"
        />
        <Cell value="R" />
        <Cell value="L" />
        <Cell value="Y" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter A is in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="R" />
        <Cell value="I" />
        <Cell value="C" />
        <Cell isRevealing={true} isCompleted={true} value="H" status="absent" />
        <Cell value="E" />
        <Cell value="R" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter H is not in the word in any spot.
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/Compsciler/Bigramle"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
