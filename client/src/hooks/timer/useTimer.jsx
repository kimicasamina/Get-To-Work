import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth } from "../auth/useAuth";

const TimerContext = createContext({});

export const ProvideTimer = ({ children }) => {
  const { user } = useAuth();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [selected, setSelected] = useState(null);
  const timerRef = useRef();

  useEffect(() => {
    if (isRunning && !isPause) {
      console.log("start timer");
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1000);
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isRunning, isPause]);

  return (
    <TimerContext.Provider
      value={{
        time,
        setTime,
        isRunning,
        setIsRunning,
        isPause,
        setIsPause,
        timerRef,
        selected,
        setSelected,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  return useContext(TimerContext);
};
