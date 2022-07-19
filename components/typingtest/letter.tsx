export type LetterData = {
  letter: string;
  state: LetterState;
};

export enum LetterState {
  Default = "",
  Correct = "text-gray-300",
  Incorrect = "text-red-400",
  Extra = "text-red-600",
}

type LetterProps = {
  letterData: LetterData;
};

const Letter = ({ letterData }: LetterProps) => {
  return <div className={letterData.state}>{letterData.letter}</div>;
};

export default Letter;
