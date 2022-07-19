import type { NextPage } from "next";
import WordsContainer from "../components/typingtest/words_wrapper";

const Home: NextPage = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <WordsContainer />
    </div>
  );
};

export default Home;
