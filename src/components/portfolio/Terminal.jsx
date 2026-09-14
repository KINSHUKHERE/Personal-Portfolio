import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile, skills, featuredProjects, secondaryProjects, education, experience } from "./data";
import { trackEvent } from "../../lib/analytics";

const BANNER = [
  { type: "out", text: "kinshuk.sh - interactive shell" },
  { type: "out", text: "Type 'help' to see what I can do, or just poke around." },
];

const PROMPT = "visitor@kinshuk:~$";

function useCommands() {
  return useMemo(() => {
    const allProjects = [...featuredProjects, ...secondaryProjects];

    const commands = {
      help: () => [
        "Available commands:",
        "  whoami       who you're talking to",
        "  stack        languages, frameworks, tools",
        "  projects     everything I've shipped",
        "  experience   where I've worked",
        "  education    degrees and certifications",
        "  contact      how to reach me",
        "  resume       open my resume",
        "  socials      github / linkedin / instagram",
        "  clear        wipe the screen",
        "",
        "Tip: use arrow keys for history, Tab to autocomplete.",
      ],

      whoami: () => [
        profile.name,
        profile.role + " - " + profile.location,
        "",
        profile.tagline,
      ],

      stack: () => skills.map((g) => `${g.group.padEnd(12)} ${g.items.join(", ")}`),

      projects: () => [
        `${allProjects.length} projects:`,
        "",
        ...allProjects.map((p) => `  ${p.title}`),
        "",
        "Scroll to the projects section for the full breakdown.",
      ],

      experience: () =>
        experience.flatMap((e) => [`${e.role} - ${e.company}`, `  ${e.period} - ${e.location}`, ""]),

      education: () => education.map((e) => `${e.school} - ${e.detail} (${e.period})`),

      contact: () => [
        `email    ${profile.email}`,
        `phone    ${profile.phone}`,
        `location ${profile.location}`,
        "",
        "Or use the contact form below - it actually works.",
      ],

      socials: () => [
        `github    ${profile.socials.github}`,
        `linkedin  ${profile.socials.linkedin}`,
        `instagram ${profile.socials.instagram}`,
      ],

      resume: () => {
        window.open(profile.resumeUrl, "_blank", "noopener");
        return ["Opening resume in a new tab..."];
      },

      // --- easter eggs ---
      sudo: () => ["Nice try. You don't have permission to do that. :)"],
      "sudo hire me": () => ["Permission granted. Scroll down to the contact form."],
      ls: () => ["about/  skills/  projects/  experience/  education/  contact/"],
      pwd: () => ["/home/kinshuk/portfolio"],
      date: () => [new Date().toString()],
      echo: (args) => [args.join(" ")],
      exit: () => ["There's no escape. Try 'clear' instead."],
      coffee: () => ["    ( (", "     ) )", "  ........", "  |      |]", "  \\      /", "   `----'", "Always brewing."],
    };

    return commands;
  }, []);
}

export function Terminal() {
  const commands = useCommands();
  const [lines, setLines] = useState(BANNER);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
      delete el._lenis;
    }
  }, [lines]);

  const run = useCallback(
    (raw) => {
      const cmd = raw.trim();
      if (!cmd) return;

      setHistory((h) => [...h, cmd]);
      setHistIndex(-1);
      trackEvent("terminal_command", { command: cmd.split(" ")[0].toLowerCase() });

      if (cmd.toLowerCase() === "clear") {
        setLines([]);
        return;
      }

      const [name, ...args] = cmd.split(/\s+/);
      const key = cmd.toLowerCase();
      const handler = commands[key] || commands[name.toLowerCase()];

      const output = handler
        ? handler(args)
        : [`command not found: ${name}`, "Type 'help' for the list."];

      setLines((prev) => [
        ...prev,
        { type: "cmd", text: cmd },
        ...output.map((text) => ({ type: "out", text })),
      ]);
    },
    [commands],
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setInput(history[next]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === -1) return;
      const next = histIndex + 1;
      if (next >= history.length) {
        setHistIndex(-1);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(history[next]);
      }
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const match = Object.keys(commands).find((c) => c.startsWith(partial));
      if (match) setInput(match);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="font-mono-ui cursor-text overflow-hidden rounded-xl border border-border bg-surface/80 text-sm shadow-2xl backdrop-blur transition-colors hover:border-cyan-glow/40"
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-hi/80 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-yellow-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-[11px] text-muted-foreground">~/kinshuk - zsh</span>
        <span className="ml-auto text-[10px] uppercase tracking-wider text-cyan-glow/70">
          interactive
        </span>
      </div>

      <div
        ref={scrollRef}
        className="terminal-scroll h-[320px] overflow-y-auto px-5 py-4 leading-6 text-foreground/90"
      >
        {lines.map((l, i) =>
          l.type === "cmd" ? (
            <div key={i} className="mt-2">
              <span className="text-cyan-glow">{PROMPT}</span>{" "}
              <span className="text-foreground">{l.text}</span>
            </div>
          ) : (
            <div key={i} className="whitespace-pre-wrap text-muted-foreground">
              {l.text || " "}
            </div>
          ),
        )}

        <div className="mt-2 flex items-center">
          <span className="shrink-0 text-cyan-glow">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
            className="ml-2 w-full flex-1 bg-transparent text-foreground caret-cyan-glow outline-none"
          />
        </div>
      </div>
    </div>
  );
}
