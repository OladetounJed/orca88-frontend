import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedNumber({
  value,
  decimals = 2,
  prefix,
  suffix,
  className,
}: AnimatedNumberProps) {
  const count = useMotionValue(value);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== count.get()) {
      setIsAnimating(true);

      const animation = animate(count, value, {
        duration: 0.5,
        ease: "easeOut",
        onComplete: () => setIsAnimating(false),
      });

      return () => animation.stop();
    }
  }, [value, count]);

  return (
    <motion.div
      className={cn(
        "transition-colors duration-300",
        isAnimating && "text-piccolo",
        className
      )}
    >
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.div>
  );
}
