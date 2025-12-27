"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

type CountdownLabels = {
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
};

type CountdownProps = {
  targetDate: Date;
  labels?: CountdownLabels;
  className?: string;
  showSeconds?: boolean;
  expiredContent?: ReactNode;
};

function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, expired: false };
}

export function Countdown({
  targetDate,
  labels = {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },
  className,
  showSeconds = true,
  expiredContent,
}: CountdownProps): ReactNode {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(targetDate),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeRemaining.expired) {
    if (expiredContent) {
      return <>{expiredContent}</>;
    }
    return (
      <div
        className={cn(
          "text-center text-3xl md:text-5xl font-heading font-bold",
          className,
        )}
        role="timer"
        aria-live="polite"
      >
        The event has started!
      </div>
    );
  }

  const timeUnits = [
    { value: timeRemaining.days, label: labels.days },
    { value: timeRemaining.hours, label: labels.hours },
    { value: timeRemaining.minutes, label: labels.minutes },
  ];

  if (showSeconds) {
    timeUnits.push({ value: timeRemaining.seconds, label: labels.seconds });
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto",
        !showSeconds && "md:grid-cols-3",
        className,
      )}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="sr-only">Time until kickoff:</span>
      {timeUnits.map((unit, index) => (
        <div
          key={index}
          className="bg-linear-to-br from-green-900/90 to-green-700/90 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-2xl text-center border-2 border-green-400"
        >
          <div className="text-5xl md:text-7xl font-bold font-heading text-white drop-shadow-lg">
            {mounted ? unit.value : "–"}
          </div>
          <div className="text-sm md:text-lg text-green-100 uppercase tracking-widest mt-2 font-semibold">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
