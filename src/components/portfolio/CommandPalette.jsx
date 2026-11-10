import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, User, FolderGit2, Mail, FileText, Github, Linkedin, BookOpen, CornerDownLeft,
} from "lucide-react";
import { profile } from "./data";
import { trackEvent } from "../../lib/analytics";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const items = useMemo(() => {
    const go = (id) => () => {
      if (window.location.pathname !== "/") {
        onNavigate("/");
        setTimeout(() => scrollToId(id), 80);
      } else {
        scrollToId(id);
      }
    };

    return [
      { group: "Navigate", label: "Hero", icon: User, run: go("top") },
      { group: "Navigate", label: "About", icon: User, run: go("about") },
      { group: "Navigate", label: "Projects", icon: FolderGit2, run: go("projects") },
      { group: "Navigate", label: "Contact", icon: Mail, run: go("contact") },

      {
        group: "Read",
        label: "YoCart case study",
        icon: BookOpen,
        run: () => onNavigate("/case-study/yocart"),
      },

      {
        group: "Actions",
        label: "Download resume",
        icon: FileText,
        run: () => window.open(profile.resumeUrl, "_blank", "noopener"),
      },
      {
        group: "Actions",
        label: "Email me",
        icon: Mail,
        run: () => { window.location.href = `mailto:${profile.email}`; },
      },

      {
        group: "Links",
        label: "GitHub",
        icon: Github,
        run: () => window.open(profile.socials.github, "_blank", "noopener"),
      },
      {
        group: "Links",
        label: "LinkedIn",
        icon: Linkedin,
        run: () => window.open(profile.socials.linkedin, "_blank", "noopener"),
      },
    ];
  }, [onNavigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      trackEvent("command_palette_open");
    } else {
      setQuery("");
    }
  }, [open]);

  const select = useCallback(
    (item) => {
      if (!item) return;
      setOpen(false);
      trackEvent("command_palette_action", { action: item.label });
      item.run();
    },
    [],
  );

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(filtered[active]);
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (typeof document === "undefined") return null;

  let lastGroup = null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm font-['Archivo',sans-serif]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#e2ded7] bg-[#ffffff] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-[#e2ded7] px-4">
              <Search className="size-4 shrink-0 text-[#767676]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Jump to a section, grab my resume..."
                aria-label="Search commands"
                className="w-full bg-transparent py-4 text-sm text-[#111111] caret-black outline-none placeholder:text-[#767676]/60 font-['Archivo',sans-serif]"
              />
              <kbd className="shrink-0 rounded border border-[#e2ded7] bg-[#f2eee8] px-1.5 py-0.5 text-[10px] text-[#767676] font-mono">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-6 text-center text-xs text-[#767676] font-mono">
                  Nothing matches "{query}"
                </p>
              ) : (
                filtered.map((item, i) => {
                  const Icon = item.icon;
                  const showGroup = item.group !== lastGroup;
                  lastGroup = item.group;
                  return (
                    <div key={item.group + item.label}>
                      {showGroup && (
                        <div className="px-3 pb-1 pt-3 text-[10px] uppercase tracking-wider text-[#767676] font-mono">
                          {item.group}
                        </div>
                      )}
                      <button
                        data-index={i}
                        onMouseMove={() => setActive(i)}
                        onClick={() => select(item)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                          i === active
                            ? "bg-[#111111] text-[#F4F1ED]"
                            : "text-[#111111] hover:bg-[#f2eee8]"
                        }`}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="flex-1 font-medium">{item.label}</span>
                        {i === active && <CornerDownLeft className="size-3.5 opacity-70" />}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
