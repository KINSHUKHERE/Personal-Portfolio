import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";
import { profile } from "./data";
import { trackEvent } from "../../lib/analytics";

// Served from our own origin so the browser's PDF viewer renders it inline.
// raw.githubusercontent.com sends text/plain, which an <iframe> will not display.
const INLINE_PDF = "/Kinshuk_Khandelwal_Resume.pdf";

export function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    // Lock the page behind the modal.
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
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            className="flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <span className="font-mono-ui text-xs uppercase tracking-wider text-cyan-glow/85">
                Kinshuk_Khandelwal_Resume.pdf
              </span>

              <div className="ml-auto flex items-center gap-2">
                <a
                  href={profile.resumeUrl}
                  download="Kinshuk_Khandelwal_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("resume_download", { location: "preview_modal" })}
                  className="font-mono-ui inline-flex items-center gap-1.5 rounded-full border border-cyan-glow/40 bg-cyan-glow/10 px-3 py-1.5 text-[11px] font-semibold text-cyan-glow transition-colors hover:border-cyan-glow hover:bg-cyan-glow/20"
                >
                  <Download className="size-3.5" />
                  Download
                </a>
                <a
                  href={INLINE_PDF}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open resume in a new tab"
                  className="rounded-full border border-border p-1.5 text-muted-foreground transition-colors hover:border-cyan-glow/60 hover:text-cyan-glow"
                >
                  <ExternalLink className="size-3.5" />
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="rounded-full border border-border p-1.5 text-muted-foreground transition-colors hover:border-red-400/60 hover:text-red-400 cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>

            <iframe
              src={`${INLINE_PDF}#view=FitH`}
              title="Kinshuk Khandelwal resume"
              className="w-full flex-1 bg-neutral-800"
            />

            <div className="border-t border-border px-4 py-2">
              <p className="font-mono-ui text-[10px] text-muted-foreground">
                Can&apos;t see it? Some mobile browsers block inline PDFs -{" "}
                <a
                  href={INLINE_PDF}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-glow underline underline-offset-2"
                >
                  open it in a new tab
                </a>
                .
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
