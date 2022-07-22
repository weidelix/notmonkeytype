import create from "zustand";

interface TimerState {
  id?: NodeJS.Timer;
  seconds: number;
  duration: number;
  hasStarted: boolean;
  start: (duration: number, onStop: () => void | null) => void;
  stop: (callback: () => void | null) => void;
}

const useTimer = create<TimerState>()((set, get) => ({
  seconds: 0,
  duration: 0,
  hasStarted: false,
  start: (duration, onStop) =>
    set((state) => ({
      hasStarted: true,
      seconds: duration,
      duration: duration,
      id: setInterval(() => {
        if (get().seconds > 0) set((state) => ({ seconds: state.seconds - 1 }));
        else state.stop(onStop);
      }, 1000),
    })),
  stop: (callback) => {
    clearInterval(get().id);
    callback();
  },
}));

export default useTimer;
