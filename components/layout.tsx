import type { PropsWithChildren } from "react";
import WordsContainer from "./typingtest/words_wrapper";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <main className="h-screen px-36 py-10">
        <div className="grid grid-cols-2">
          <h1 className="text-4xl font-bold">
            <span className="text-sm font-bold">not</span>MonkeyType
          </h1>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
