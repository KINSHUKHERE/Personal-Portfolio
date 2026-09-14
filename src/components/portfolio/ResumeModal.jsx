import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download } from "lucide-react";
import { profile } from "./data";
import { trackEvent } from "../../lib/analytics";

const RESUME_IMAGE = "/Kinshuk_Khandelwal_Resume.png";

export function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    // Lock background scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            className="relative flex h-full max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-2xl backdrop-blur sm:rounded-3xl"
          >
            {/* Header: Only Download and Cross button */}
            <div className="flex items-center justify-end gap-2 border-b border-border/40 bg-surface/90 px-4 py-2.5 backdrop-blur-sm sm:px-5">
              <a
                href={profile.resumeUrl}
                download="Kinshuk_Khandelwal_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("resume_download", { location: "preview_modal" })}
                aria-label="Download resume"
                title="Download Resume"
                className="flex size-9 items-center justify-center rounded-full border border-border bg-surface-hi/40 text-foreground/80 transition-all duration-150 hover:border-cyan-glow/60 hover:bg-cyan-glow/10 hover:text-cyan-glow hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Download className="size-4" />
              </a>
              <button
                onClick={onClose}
                aria-label="Close resume preview"
                title="Close"
                className="flex size-9 items-center justify-center rounded-full border border-border bg-surface-hi/40 text-foreground/80 transition-all duration-150 hover:border-red-400/60 hover:bg-red-400/10 hover:text-red-400 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Resume Content Body: Just the clean resume sheet with rounded corners */}
            <div className="relative flex-1 overflow-y-auto overflow-x-hidden bg-neutral-900/60 p-3 sm:p-6 flex justify-center items-start">
              <img
                src={RESUME_IMAGE}
                alt="Kinshuk Khandelwal Resume"
                className="mx-auto w-full max-w-[820px] rounded-xl sm:rounded-2xl shadow-2xl bg-white select-none"
                loading="eager"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
