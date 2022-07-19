import { KeyboardEventHandler, useEffect, useState } from "react";
import Letter, { LetterData, LetterState } from "./letter";

export type WordData = {
  complete: false;
  word: string;
  letters: LetterData[];
  activeLetterIndex: number;
  extra: LetterData[];
  hasError: boolean;
};

type WordProps = {
  wordData: WordData;
  setCallable: (callable: {
    handleKeyDown: KeyboardEventHandler<HTMLDivElement>;
  }) => void;
};

const Word = ({ wordData, setCallable }: WordProps) => {
  const [letters, setLetters] = useState(
    wordData.letters.map((value, i) => <Letter key={i} letterData={value} />)
  );

  const [extra, setExtra] = useState(
    wordData.extra.map((value, i) => <Letter key={i} letterData={value} />)
  );

  useEffect(() => {
    setCallable({
      handleKeyDown: (event) => {
        handleCharacterInput(event.key, wordData);
        handleBackSpace(event.key, wordData);

        setLetters(
          wordData.letters.map((value, i) => (
            <Letter key={i} letterData={value} />
          ))
        );

        setExtra(
          wordData.extra.map((value, i) => (
            <Letter key={i} letterData={value} />
          ))
        );
      },
    });
  }, []);

  return (
    <div
      className={
        "flex flex-cols text-gray-500 text-5xl font-bold leading-normal"
      }
    >
      {letters}
      {extra}&nbsp;
    </div>
  );
};

const handleCharacterInput = (key: string, wordData: WordData) => {
  if (wordData.activeLetterIndex < wordData.letters.length) {
    if (isValidCharacter(key)) {
      const letter = wordData.letters[wordData.activeLetterIndex].letter;
      wordData.letters[wordData.activeLetterIndex].state =
        key === letter ? LetterState.Correct : LetterState.Incorrect;
      wordData.activeLetterIndex = wordData.activeLetterIndex + 1;
    }
  } else {
    if (isValidCharacter(key)) {
      if (wordData.extra.length < 7) {
        wordData.extra.push({
          letter: key,
          state: LetterState.Extra,
        });
        wordData.activeLetterIndex = wordData.activeLetterIndex + 1;
      }
    }
  }
};

const handleBackSpace = (key: string, wordData: WordData) => {
  if (key === "Backspace" && wordData.activeLetterIndex - 1 >= 0) {
    wordData.activeLetterIndex = wordData.activeLetterIndex - 1;
    if (wordData.activeLetterIndex < wordData.letters.length) {
      wordData.letters[wordData.activeLetterIndex].state = LetterState.Default;
    } else {
      wordData.extra.pop();
    }
  }
};

const isValidCharacter = (key: string) =>
  "abcdefghijklmnopqrstuvwxyz,.?".includes(key);

export default Word;
