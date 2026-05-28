import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePersistentBoolean } from "@/hooks";

interface FadeInOutProps {
  children: ReactNode;
  isVisible: boolean;
  isPersistent?: boolean;
}

const layoutDuration = 0.3;
const opacityDuration = 0.2;

const animationConfig = {
  initial: {
    height: 0,
    width: 0,
    scale: 0.95,
    opacity: 0,
  },
  animate: {
    height: "auto",
    width: "auto",
    scale: 1,
    opacity: 1,
    transition: {
      height: { type: "spring" as const, duration: layoutDuration, bounce: 0 },
      width: { type: "spring" as const, duration: layoutDuration, bounce: 0 },
      scale: { type: "spring" as const, duration: layoutDuration, bounce: 0 },
      opacity: { duration: opacityDuration, delay: layoutDuration },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    width: 0,
    scale: 0.95,
    transition: {
      opacity: { duration: opacityDuration },
      height: {
        type: "spring" as const,
        duration: layoutDuration,
        bounce: 0,
        delay: opacityDuration,
      },
      width: {
        type: "spring" as const,
        duration: layoutDuration,
        bounce: 0,
        delay: opacityDuration,
      },
      scale: {
        type: "spring" as const,
        duration: layoutDuration,
        bounce: 0,
        delay: opacityDuration,
      },
    },
  },
};

export const FadeInOut = ({
  children,
  isVisible,
  isPersistent = false,
}: FadeInOutProps) => {
  const persistentVisibility = usePersistentBoolean(isVisible);
  const shouldBeRendered = isPersistent ? persistentVisibility : isVisible;

  return (
    <AnimatePresence>
      {shouldBeRendered && (
        <motion.div
          initial={animationConfig.initial}
          animate={animationConfig.animate}
          exit={animationConfig.exit}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
