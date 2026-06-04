import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, Check } from "lucide-react";

function AnimatedText({ text, className, delayStep = 0.014 }) {
  const chars = text.split("");

  return (
    <span className={className} style={{ display: "inline-flex" }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          style={{ display: "inline-flex", willChange: "transform" }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{
                y: 10,
                opacity: 0,
                scale: 0.5,
                filter: "blur(2px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                y: -10,
                opacity: 0,
                scale: 0.5,
                filter: "blur(2px)",
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 16,
                mass: 1.2,
                delay: i * delayStep,
              }}
              style={{
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : undefined,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const spring = {
  type: "spring",
  stiffness: 260,
  damping: 22,
  mass: 0.8,
};

export function RunActionButton({
  steps,
  idleText = "Run Action",
  doneText = "Action Done",
  onComplete,
  idleIcon: IdleIcon = Zap,
  doneIcon: DoneIcon = Check
}) {
  const [status, setStatus] = useState("idle");
  const [currentStep, setCurrentStep] = useState(0);

  const startAction = () => {
    setStatus("running");
    setCurrentStep(0);
  };

  const reset = () => {
    setStatus("idle");
    setCurrentStep(0);
  };

  useEffect(() => {
    if (status !== "running") return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        setStatus("done");
        onComplete?.();
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [status, steps.length, onComplete]);

  const widths = {
    idle: 180,
    running: 260,
    done: 180,
  };

  return (
    <div className="flex items-center justify-center font-mono-ui">
      <motion.div
        initial={{ width: 180 }}
        animate={{ width: widths[status] }}
        transition={spring}
        className={`relative flex h-[46px] items-center justify-between overflow-hidden rounded-full ${
          status === "running"
            ? "border border-dashed border-[#cbd5e1] dark:border-white/20 bg-surface/40 backdrop-blur"
            : "border border-cyan-glow/40 bg-surface/60 hover:border-cyan-glow transition-colors"
        } `}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {status === "idle" && (
            <motion.button
              key="idle"
              onClick={startAction}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={spring}
              className="flex flex-1 items-center gap-2 rounded-full px-5 py-3 whitespace-nowrap cursor-pointer justify-center text-foreground hover:text-cyan-glow"
            >
              <IdleIcon className="h-4 w-4" />

              <AnimatedText
                text={idleText}
                className="text-xs font-semibold"
              />
            </motion.button>
          )}

          {status === "running" && (
            <motion.div
              key="running"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={spring}
              className="flex flex-1 items-center justify-between gap-3 px-4 whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0, filter: "blur(4px)" }}
                    transition={spring}
                  >
                    {React.createElement(steps[currentStep].icon, {
                      className: "w-4 h-4 text-foreground/80",
                    })}
                  </motion.div>
                </AnimatePresence>
                <AnimatedText
                  text={steps[currentStep].label}
                  className="text-xs font-bold text-foreground"
                />
              </div>

              <motion.button
                onClick={reset}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                transition={{ ...spring, delay: 0.15 }}
                className="ml-1 rounded-full bg-border/60 hover:bg-border p-1 cursor-pointer flex items-center justify-center"
              >
                <X className="h-3 w-3 text-foreground" />
              </motion.button>
            </motion.div>
          )}

          {status === "done" && (
            <motion.button
              key="done"
              onClick={reset}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={spring}
              className="flex flex-1 items-center gap-2 rounded-full px-5 py-3 whitespace-nowrap cursor-pointer justify-center text-emerald-500"
            >
              <Check className="h-4 w-4 text-emerald-500" />

              <AnimatedText
                text={doneText}
                className="text-xs font-bold"
              />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
