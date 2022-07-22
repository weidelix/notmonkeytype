// type CountdownTimerProps = {
// 	timer:

import useTimer from "./timer";

// }
const CountdownTimer = () => {
  const seconds = useTimer((state) => state.seconds);
  const hasStarted = useTimer((state) => state.hasStarted);

  return (
    <div
      className={`${
        hasStarted ? "visible" : "hidden"
      } justify-left text-4xl text-yellow-300 font-mono`}
    >
      {seconds}
    </div>
  );
};
export default CountdownTimer;
