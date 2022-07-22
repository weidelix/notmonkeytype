import { LetterState } from "../letter";
import { WordData } from "../word";

export const hasError = (wordData: WordData) => {
  const hasIncorrect = wordData.letters.some(
    (value) => value.state === LetterState.Incorrect
  );
  const isIncomplete = wordData.letters.some(
    (value) => value.state === LetterState.Default
  );
  const hasExtra = wordData.extra.length > 0;

  return hasIncorrect || isIncomplete || hasExtra;
};

export const IsComplete = (wordData: WordData) => {
  const hasIncorrect = wordData.letters.some(
    (value) => value.state === LetterState.Incorrect
  );

  const isComplete = wordData.letters.length === wordData.activeLetterIndex;

  const hasExtra = wordData.extra.length > 0;

  const result = !hasExtra && isComplete && !hasIncorrect;
  wordData.complete = result;
  return result;
};

export const hasInput = (wordData: WordData) => {
  return wordData.letters.some(
    (letter) => letter.state !== LetterState.Default
  );
};

const WordsWrapperUtil = {
  hasError,
  hasInput,
  IsComplete,
};

export default WordsWrapperUtil;
