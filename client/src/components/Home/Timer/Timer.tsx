"use client";

import CountdownCounter from "@/utils/countdownCounter";
import Tags from "./TimerTags";
import { useEffect, useState } from "react";

const Timer = () => {
  const [countdown, setCountdown] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }>({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  useEffect(() => {
    const Int = setInterval(() => {
      setCountdown(CountdownCounter(new Date(2026, 2, 5, 0, 1, 0)));
    }, 1000);

    return () => {
      clearInterval(Int);
    };
  }, []);
  return (
    <section className="relative flex w-full flex-col items-center justify-center py-20 2xl:min-h-[40vh] overflow-hidden">
      <img
        src="./beyondthehorizon.jpg"
        className="absolute left-0 top-0 -z-10 h-full w-[100vw] opacity-20"
        alt="Beyond the Horizon Background"
      />
      
      <h1 className="title mb-0 2xl:mb-10 relative z-10">BEYOND THE HORIZON</h1>
      <div className="relative z-10 grid max-w-[750px] scale-75 grid-cols-2 grid-rows-2 items-end justify-items-center gap-x-6 md:grid-cols-4 md:grid-rows-none md:gap-16 lg:scale-90 2xl:scale-100">
        <div className="absolute top-0 h-1 w-full bg-primary-200"></div>
        <Tags text="Days" rotate={2} val={countdown.days} />
        <Tags text="Hours" rotate={-1} val={countdown.hours} />
        <Tags text="Minutes" rotate={1} val={countdown.minutes} />
        <Tags text="Seconds" rotate={-2} val={countdown.seconds} />
      </div>
    </section>
  );
};

export default Timer;
