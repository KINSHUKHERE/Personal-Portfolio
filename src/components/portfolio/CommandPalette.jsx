import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, User, Wrench, FolderGit2, Briefcase, GraduationCap, HelpCircle,
  Mail, FileText, Github, Linkedin, Sun, Moon, BookOpen, CornerDownLeft,
} from "lucide-react";
import { profile } from "./data";
import { trackEvent } from "../../lib/analytics";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleTheme() {
  const root = document.documentElement;
  const next = root.classList.contains("dark") ? "light" : "dark";
  root.classList.toggle("dark", next === "dark");
  localStorage.setItem("theme", next);
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
        // Let the home route mount before hunting for the section.
        setTimeout(() => scrollToId(id), 80);
      } else {
        scrollToId(id);
      }
    };

    return [
      { group: "Navigate", label: "About", icon: User, run: go("about") },
      { group: "Navigate", label: "Skills", icon: Wrench, run: go("skills") },
      { group: "Navigate", label: "Experience", icon: Briefcase, run: go("experience") },
      { group: "Navigate", label: "Projects", icon: FolderGit2, run: go("projects") },
      { group: "Navigate", label: "Education", icon: GraduationCap, run: go("education") },
      { group: "Navigate", label: "FAQ", icon: HelpCircle, run: go("faq") },
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
        group: "Actions",
        label: "Toggle theme",
        icon: document.documentElement.classList.contains("dark") ? Sun : Moon,
        run: toggleTheme,
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
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) trackEvent("command_palette_open");
          return !o;
        });
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // Focus after the entry animation starts, or the caret jumps.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

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
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
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
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Jump to a section, grab my resume..."
                aria-label="Search commands"
                className="font-mono-ui w-full bg-transparent py-4 text-sm text-foreground caret-cyan-glow outline-none placeholder:text-muted-foreground/60"
              />
              <kbd className="font-mono-ui shrink-0 rounded border border-border bg-surface-hi/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="font-mono-ui px-3 py-6 text-center text-xs text-muted-foreground">
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
                        <div className="font-mono-ui px-3 pb-1 pt-3 text-[10px] uppercase tracking-wider text-muted-foreground/70">
                          {item.group}
                        </div>
                      )}
                      <button
                        data-index={i}
                        onMouseMove={() => setActive(i)}
                        onClick={() => select(item)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                          i === active
                            ? "bg-cyan-glow/10 text-cyan-glow"
                            : "text-foreground/85 hover:bg-surface-hi/40"
                        }`}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="flex-1">{item.label}</span>
                        {i === active && <CornerDownLeft className="size-3.5 opacity-60" />}
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
