"use client";

import CountdownCounter from "@/utils/countdownCounter";
import Tags from "./TimerTags";
import { useEffect, useState } from "react";

const Timer = () => {
  const [countdown, setCountdown] = useState<{
    months: string;
    days: string;
    hours: string;
    minutes: string;
  }>({ months: "00", days: "00", hours: "00", minutes: "00" });
  useEffect(() => {
    const Int = setInterval(() => {
      setCountdown(CountdownCounter(new Date("03/05/2026")));
    }, 1000);

    return () => {
      clearInterval(Int);
    };
  }, []);
  return (
    <section className="relative flex w-full flex-col items-center justify-center py-20 2xl:min-h-[40vh] overflow-hidden">
      {/* Background with image */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/Background.png"
          className="w-full h-full object-cover"
          alt="Technobit Background"
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-650/50 to-primary-650" />
      </div>
      
      <h1 className="title mb-0 2xl:mb-10 relative z-10">BEYOND THE HORIZON</h1>
      <div className="relative z-10 grid max-w-[750px] scale-75 grid-cols-2 grid-rows-2 items-end justify-items-center gap-x-6 md:grid-cols-4 md:grid-rows-none md:gap-16 lg:scale-90 2xl:scale-100">
        <div className="absolute top-0 h-1 w-full bg-primary-200"></div>
        <Tags text="Months" rotate={2} val={countdown.months} />
        <Tags text="Days" rotate={-1} val={countdown.days} />
        <Tags text="Hours" rotate={1} val={countdown.hours} />
        <Tags text="Minutes" rotate={-2} val={countdown.minutes} />
      </div>
    </section>
  );
};

export default Timer;
