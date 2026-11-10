import React, { useState } from "react";
import { Command } from "lucide-react";

export function TopPill({ className = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const openCommandPalette = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
    setMenuOpen(false);
  };

  return (
    <div className={`relative z-40 flex flex-col items-center select-none ${className}`}>
      {/* Mobile: wider navbar pill; Desktop: clamp(260px, 22vw, 344px) */}
      <div className="w-[calc(100vw-32px)] max-w-[390px] sm:w-[clamp(260px,22vw,344px)] h-[54px] sm:h-[clamp(52px,4vw,65px)] px-5 sm:px-[19px] bg-[#111111] text-[#ffffff] rounded-[24px] shadow-[0_10px_35px_rgba(0,0,0,0.18)] flex items-center justify-between border border-black/10 transition-transform duration-300 hover:scale-[1.01]">
        <a
          href="#top"
          className="font-['Archivo',sans-serif] text-[19px] sm:text-[clamp(18px,1.35vw,23.5px)] font-bold tracking-tight text-[#ffffff] hover:opacity-90 transition-opacity"
        >
          Kinshuk
        </a>

        {/* Menu button: 48 × 46px, #F5F3EE background, 12px border radius */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Open quick menu"
          aria-expanded={menuOpen}
          className="w-[42px] sm:w-[clamp(40px,3vw,48px)] h-[40px] sm:h-[clamp(38px,2.9vw,46px)] rounded-[12px] bg-[#F5F3EE] text-[#111111] flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 hover:opacity-95"
        >
          <span className="flex items-center gap-[3px] text-[13px] leading-none font-bold text-[#111111]">
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </span>
        </button>
      </div>

      {/* Floating Dropdown Menu when 3-dots is clicked */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/10 backdrop-blur-[1px]"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-[66px] sm:top-[72px] z-40 w-[calc(100vw-32px)] max-w-[390px] sm:w-[clamp(260px,22vw,344px)] rounded-[20px] bg-[#111111] text-[#F5F3EE] border border-white/10 p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#767676]">
              Navigation
            </div>
            <div className="flex flex-col gap-1 font-['Archivo',sans-serif]">
              <a
                href="#top"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Hero
              </a>
              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Contact
              </a>
            </div>

            <div className="my-2 border-t border-white/10" />

            <div className="flex flex-col gap-1 font-['Archivo',sans-serif]">
              <button
                type="button"
                onClick={openCommandPalette}
                className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors text-left cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Command className="size-4 text-neutral-300" />
                  Command Palette
                </span>
                <span className="text-[10px] font-mono text-[#767676]">⌘K</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
