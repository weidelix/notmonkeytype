import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import Letter, { LetterData, LetterState } from "./letter";
import Word, { WordData } from "./word";

const wordsUnprocessed =
  "There once was a ship that put to sea The name of the ship was the Billy of Tea The winds blew up, her bow dipped down Oh blow, my bully boys, blow";
const words = wordsUnprocessed.split(" ").map((value): WordData => {
  const word = value.toLowerCase();
  return {
    complete: false,
    word: word,
    letters: word.split("").map((letter): LetterData => {
      return {
        letter: letter,
        state: "" as LetterState.Default,
      };
    }),
    activeLetterIndex: 0,
    extra: [],
    hasError: false,
  };
});

const WordsContainer = () => {
  let activeWord = 0;
  const ref = useRef<HTMLDivElement>(null);
  let childrenCallable: { handleKeyDown: Function }[] = [];

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleKeyDown: any = (event: KeyboardEvent) => {
    // If space is entered and the current word has no input
    // dont allow to go to next word
    // otherwise go to next word
    if (event.key === " ") {
      if (hasInput(words[activeWord])) {
        activeWord = activeWord < words.length - 1 ? activeWord + 1 : 0;
      }
      return;
    }

    // If backspace is entered to a word with an active index is 0
    // and the previous word has errors
    // allow to go back to previous word
    if (
      event.key === "Backspace" &&
      words[activeWord].activeLetterIndex === 0 &&
      activeWord - 1 >= 0
    ) {
      if (hasError(words[activeWord - 1])) {
        activeWord = activeWord < words.length - 1 ? activeWord - 1 : 0;
      }
    }

    childrenCallable[activeWord].handleKeyDown(event);
  };

  const setChildrenCallable = (callable: { handleKeyDown: Function }) => {
    childrenCallable.push(callable);
  };

  return (
    <div
      ref={ref}
      className="flex flex-wrap p-20 focus:outline-none select-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {words.map((value, i) => (
        <Word key={i} wordData={value} setCallable={setChildrenCallable} />
      ))}
    </div>
  );
};

const hasError = (wordData: WordData) => {
  const hasIncorrect = wordData.letters.some(
    (value) => value.state === LetterState.Incorrect
  );
  const isIncomplete = wordData.letters.some(
    (value) => value.state === LetterState.Default
  );
  const hasExtra = wordData.extra.length > 0;

  return hasIncorrect || isIncomplete || hasExtra;
};

const hasInput = (wordData: WordData) => {
  return wordData.letters.some(
    (letter) => letter.state !== LetterState.Default
  );
};

export default WordsContainer;
