import type { NextPage } from "next";
import CountdownTimer from "../components/typingtest/countdown_timer";
import WordsContainer from "../components/typingtest/word_wrapper/words_wrapper";

const Home: NextPage = () => {
  // const Timer

  return (
    <div className="h-full flex flex-col justify-center">
      <CountdownTimer />
      <WordsContainer />
    </div>
  );
};

export default Home;
