import { useEffect, useState } from "react";
import { MatchState } from "@/types";

interface EventTimerProps {
  startTime: string;
  isLive: boolean;
  minute?: number;
  matchState?: MatchState;
  period?: number;
}

export function EventTimer({
  startTime,
  isLive,
  minute,
  matchState,
  period,
}: EventTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [currentMinute, setCurrentMinute] = useState(minute || 0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isLive) {
      const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const start = new Date(startTime).getTime();
        const difference = start - now;

        if (difference <= 0) {
          setTimeLeft("Starting...");
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m`);
        } else if (minutes > 0) {
          setTimeLeft(`${minutes}m ${seconds}s`);
        } else {
          setTimeLeft(`${seconds}s`);
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, isLive]);

  // Handle live minute counter
  useEffect(() => {
    if (!isLive || !matchState) return;

    // Only increment time during active play states
    const shouldIncrementTime = [
      MatchState.FIRST_HALF,
      MatchState.SECOND_HALF,
      MatchState.EXTRA_TIME,
      MatchState.QUARTER,
      MatchState.PERIOD,
    ].includes(matchState);

    if (shouldIncrementTime) {
      const timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 59) {
            setCurrentMinute((currentMin) => currentMin + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000); // Update every second
      return () => clearInterval(timer);
    }
  }, [isLive, matchState]);

  // Reset current minute and seconds when the provided minute changes
  useEffect(() => {
    if (minute !== undefined) {
      setCurrentMinute(minute);
      setSeconds(0);
    }
  }, [minute]);

  if (isLive) {
    let statusText = "";
    let timeText = "";

    switch (matchState) {
      case MatchState.FIRST_HALF:
        timeText = `${currentMinute}:${seconds.toString().padStart(2, "0")}`;
        break;
      case MatchState.HALF_TIME:
        statusText = "Half Time";
        break;
      case MatchState.SECOND_HALF:
        timeText = `${currentMinute}:${seconds.toString().padStart(2, "0")}`;
        break;
      case MatchState.EXTRA_TIME:
        timeText = `${currentMinute}:${seconds.toString().padStart(2, "0")}`;
        statusText = "Extra Time";
        break;
      case MatchState.PENALTIES:
        statusText = "Penalties";
        break;
      case MatchState.FULL_TIME:
        statusText = "Full Time";
        break;
      case MatchState.BREAK:
        statusText = "Break";
        break;
      case MatchState.TIMEOUT:
        statusText = "Timeout";
        break;
      case MatchState.QUARTER:
      case MatchState.PERIOD:
        timeText = `${currentMinute}:${seconds.toString().padStart(2, "0")}`;
        statusText = period ? `P${period}` : "";
        break;
      default:
        timeText = currentMinute
          ? `${currentMinute}:${seconds.toString().padStart(2, "0")}`
          : "";
    }

    return (
      <div className="flex items-center gap-2">
        <span className="bg-[#ff4e64]/20 text-popo text-xs font-semibold px-1 py-1 rounded">
          {"LIVE"}
        </span>
        {timeText && <span className="text-sm">{timeText}</span>}
        {statusText && <span className="text-[10px] text-piccolo">{statusText}</span>}
      </div>
    );
  }

  return <span className="text-sm text-gray-400">{timeLeft}</span>;
}
