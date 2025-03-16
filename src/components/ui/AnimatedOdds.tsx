import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedOddsProps {
  odds: number;
  className?: string;
}

export function AnimatedOdds({ odds, className }: AnimatedOddsProps) {
  const [previousOdds, setPreviousOdds] = useState(odds);
  const [movement, setMovement] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (odds !== previousOdds) {
      setMovement(odds > previousOdds ? "up" : "down");
      setPreviousOdds(odds);

      const timer = setTimeout(() => {
        setMovement(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [odds, previousOdds]);

  return (
    <div className={cn("flex items-center gap-1 justify-center", className)}>
      <motion.span
        initial={{ color: "white" }}
        animate={{
          color:
            movement === "up"
              ? "#22c55e"
              : movement === "down"
              ? "#ef4444"
              : "white",
        }}
        transition={{ duration: 0.5 }}
      >
        {odds.toFixed(2)}
      </motion.span>
      <AnimatePresence>
        {movement && (
          <motion.div
            initial={{ opacity: 0, y: movement === "up" ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "",
              movement === "up" ? "-top-4" : "-bottom-4"
            )}
          >
            {movement === "up" ? (
              <ArrowUp className="w-3 h-3 text-green-500" />
            ) : (
              <ArrowDown className="w-3 h-3 text-red-500" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
