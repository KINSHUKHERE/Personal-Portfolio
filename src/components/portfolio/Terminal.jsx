export function Terminal() {
  return (
    <div className="font-mono-ui overflow-hidden rounded-xl border border-border bg-surface/80 text-sm shadow-2xl backdrop-blur">
      <div className="flex items-center gap-2 border-b border-border bg-surface-hi/80 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-yellow-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-[11px] text-muted-foreground">~/kinshuk - zsh</span>
      </div>
      <pre className="whitespace-pre-wrap px-5 py-5 leading-7 text-foreground/90">
<span className="text-cyan-glow">$ whoami</span>{"\n"}
{">"} kinshuk_khandelwal{"\n\n"}
<span className="text-cyan-glow">$ cat stack.txt</span>{"\n"}
{">"} react, node, express,{"\n"}
{">"} mongodb, supabase,{"\n"}
{">"} javascript, java, python{"\n\n"}
<span className="text-cyan-glow">$ echo $DSA</span>{"\n"}
{">"} 70+ problems solved{"\n\n"}
<span className="text-cyan-glow">$ echo $STATUS</span>{"\n"}
{">"} shipping production-ready code <span className="cursor-blink">▍</span>
      </pre>
    </div>
  );
}
