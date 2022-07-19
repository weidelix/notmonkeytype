import { NextPage } from "next";
import Link from "next/link";

const About: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">About</h1>
      <Link href="/">
        <button className="bg-blue-300 rounded-xl px-8 py-2">Home</button>
      </Link>
    </div>
  );
};

export default About;
