export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--cyan-glow) 30%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-20rem] right-[-10rem] h-[40rem] w-[40rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--violet-glow) 40%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--background)_100%)]" />
    </div>
  );
}
