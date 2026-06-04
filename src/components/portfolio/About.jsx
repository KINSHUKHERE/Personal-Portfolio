import { useEffect, useState } from "react";
import { Section } from "./Section";
import { Terminal } from "./Terminal";
import { profile, stats as initialStats } from "./data";
import { CountUp } from "./CountUp";

export function About() {
  const [repoCount, setRepoCount] = useState(10);

  useEffect(() => {
    let active = true;
    async function fetchRepos() {
      try {
        const res = await fetch("https://api.github.com/users/KINSHUKHERE/repos?per_page=100");
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (Array.isArray(data)) {
          const originalRepos = data.filter((repo) => !repo.fork);
          if (active) {
            setRepoCount(originalRepos.length || 10);
          }
        }
      } catch (err) {
        if (active) {
          setRepoCount(10);
        }
      }
    }
    fetchRepos();
    return () => {
      active = false;
    };
  }, []);

  const stats = initialStats.map((s) => {
    if (s.label.toLowerCase() === "github repos") {
      return { ...s, value: repoCount };
    }
    return s;
  });

  return (
    <Section id="about" label="about" title="Building full-stack apps that ship.">
      <div className="grid items-start gap-10 md:grid-cols-2">
        <div className="space-y-5 text-muted-foreground">
          <p className="text-lg leading-relaxed text-foreground/90">
            I am <span className="text-foreground">Kinshuk</span>, a developer based in{" "}
            {profile.location}. I focus on end-to-end web applications, designing the API,
            modeling the data, and shipping a React UI that feels good to use.
          </p>
          <p>{profile.summary}</p>
          <p>
            When I am not coding, I am grinding DSA on LeetCode, exploring databases, and
            iterating on small side projects.
          </p>
        </div>
        <Terminal />
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-surface/60 p-5 backdrop-blur transition-colors hover:border-cyan-glow/40"
          >
            <div className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
              <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <div className="font-mono-ui mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
