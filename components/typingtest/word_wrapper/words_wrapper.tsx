import { Fragment, useEffect, useRef, useState } from "react";
import { LetterData, LetterState } from "../letter";
import useTimer from "../timer";
import Word, { WordData } from "../word";
import { hasError, hasInput, IsComplete } from "./word_wrapper_util";

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
  let childrenCallable: { handleKeyDown: Function }[] = [];
  let duration = 10;
  let startTimer = useTimer.getState().start;
  let stopTimer = useTimer.getState().stop;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleKeyDown: any = (event: KeyboardEvent) => {
    if (!useTimer.getState().hasStarted) {
      startTimer(duration, stopTest);
    }

    // If space is entered and the current word has no input
    // dont allow to go to next word otherwise go to next word
    if (event.key === " ") {
      if (hasInput(words[activeWord]) && activeWord + 1 < words.length) {
        IsComplete(words[activeWord]);
        activeWord =
          activeWord + 1 < words.length ? activeWord + 1 : activeWord;
      } else {
        stopTimer(stopTest);
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

  const wordList = words.map((value, i) => (
    <Word key={i} wordData={value} setCallable={setChildrenCallable} />
  ));

  return (
    <div
      ref={ref}
      className="flex flex-wrap focus:outline-none select-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {wordList}
    </div>
  );
};

const stopTest = () => {
  const timer = useTimer.getState();
  const secondsElapsed = timer.duration - timer.seconds;
  const completeWords = words.filter((value) => value.complete);
  const result =
    (completeWords.length / (secondsElapsed / 60)).toFixed(0) + " WPM";
};

export default WordsContainer;
