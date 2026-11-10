import React from "react";

/**
 * 3D Metallic Star Accent with iridescent rim lighting
 * Matching the brutalist chrome 4-point star in the reference
 */
export function MetallicStar({ className = "" }) {
  return (
    <div
      className={`inline-block select-none pointer-events-none transition-transform duration-500 hover:scale-110 hover:rotate-12 ${className}`}
      style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.35))" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Main Metallic Chrome Gradient */}
          <linearGradient id="chrome-body" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#2e2e33" />
            <stop offset="25%" stopColor="#1a1a1c" />
            <stop offset="48%" stopColor="#0a0a0c" />
            <stop offset="52%" stopColor="#3a3a42" />
            <stop offset="70%" stopColor="#18181a" />
            <stop offset="100%" stopColor="#050507" />
          </linearGradient>

          {/* Top highlight facet */}
          <linearGradient id="chrome-top" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#a3a3b0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1c1c20" stopOpacity="0.1" />
          </linearGradient>

          {/* Iridescent Rim Lighting (Chromatic Aberration) */}
          <linearGradient id="iridescent-rim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#ec4899" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* 3D Extruded Depth Underlayer */}
        <path
          d="M 50 2 C 50 28, 72 50, 98 50 C 72 50, 50 72, 50 98 C 50 72, 28 50, 2 50 C 28 50, 50 28, 50 2 Z"
          transform="translate(4, 7)"
          fill="#000000"
          opacity="0.6"
        />

        {/* Chromatic edge flare / rim */}
        <path
          d="M 50 2 C 50 28, 72 50, 98 50 C 72 50, 50 72, 50 98 C 50 72, 28 50, 2 50 C 28 50, 50 28, 50 2 Z"
          stroke="url(#iridescent-rim)"
          strokeWidth="3.5"
          strokeLinejoin="round"
          className="opacity-90"
        />

        {/* Metallic Body */}
        <path
          d="M 50 4 C 50 28, 72 50, 96 50 C 72 50, 50 72, 50 96 C 50 72, 28 50, 4 50 C 28 50, 50 28, 50 4 Z"
          fill="url(#chrome-body)"
        />

        {/* Top-Right Facet Shading */}
        <path
          d="M 50 4 C 50 28, 72 50, 96 50 L 50 50 Z"
          fill="url(#chrome-top)"
        />

        {/* Bottom-Left Specular Refraction */}
        <path
          d="M 50 96 C 50 72, 28 50, 4 50 L 50 50 Z"
          fill="url(#chrome-top)"
          opacity="0.3"
        />

        {/* Center Specular Glint */}
        <circle cx="50" cy="50" r="1.5" fill="#ffffff" filter="blur(0.5px)" />
      </svg>
    </div>
  );
}

/**
 * 3D Metallic Lightning Bolt Accent with iridescent side facets
 * Matching the angled chromatic bolt next to ENGINEER in the reference
 */
export function MetallicLightning({ className = "" }) {
  return (
    <div
      className={`inline-block select-none pointer-events-none transition-transform duration-500 hover:scale-110 hover:-rotate-6 ${className}`}
      style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.35))" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="bolt-body" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#2b2b30" />
            <stop offset="30%" stopColor="#151518" />
            <stop offset="55%" stopColor="#08080a" />
            <stop offset="70%" stopColor="#303038" />
            <stop offset="100%" stopColor="#0d0d0f" />
          </linearGradient>

          <linearGradient id="bolt-side" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="30%" stopColor="#818cf8" />
            <stop offset="60%" stopColor="#c084fc" />
            <stop offset="85%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <linearGradient id="bolt-sheen" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 3D Extrusion Side Wall (The colorful chromatic facet seen in the reference) */}
        <path
          d="M 64 6 L 18 64 L 46 64 L 28 114 L 84 52 L 54 52 Z"
          transform="translate(6, 8)"
          fill="url(#bolt-side)"
        />

        {/* Ambient occlusion shadow */}
        <path
          d="M 64 6 L 18 64 L 46 64 L 28 114 L 84 52 L 54 52 Z"
          transform="translate(3, 4)"
          fill="#000000"
          opacity="0.5"
        />

        {/* Metallic Front Face */}
        <path
          d="M 64 6 L 18 64 L 46 64 L 28 114 L 84 52 L 54 52 Z"
          fill="url(#bolt-body)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />

        {/* Bevel highlight along top crest */}
        <path
          d="M 64 6 L 18 64 L 46 64"
          stroke="url(#bolt-sheen)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
