import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Map } from 'lucide-react';

export function ViewOnMap({
  address = 'Poornima University, Jaipur',
  mapImageUrl = 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2000&auto=format&fit=crop',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) setIsMapLoaded(false);
  };

  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={`${className}`}>
      {/* --- PILL BUTTON (Always static in page flow to avoid layout shifts) --- */}
      <motion.div
        onClick={toggleOpen}
        className="group relative flex cursor-pointer items-center justify-center overflow-hidden border border-cyan-glow/40 bg-surface/60 hover:border-cyan-glow transition-all"
        style={{ width: 180, height: 46, borderRadius: 23 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div
          className="absolute inset-0 opacity-20 brightness-110 grayscale transition-opacity dark:opacity-10 dark:brightness-50"
          style={{
            backgroundImage: `url(${mapImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-10 flex items-center space-x-3 px-4 py-2 font-mono-ui text-xs font-semibold text-foreground">
          <Map className="h-4 w-4 text-cyan-glow" />
          <span>View on Map</span>
        </div>
      </motion.div>

      {/* --- FLOATING MODAL OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleOpen}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-[550px] h-[380px] overflow-hidden border border-white/10 bg-neutral-900 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] p-2 z-10"
            >
              {/* Corner Cyber HUD Brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-lg pointer-events-none z-20" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-lg pointer-events-none z-20" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-lg pointer-events-none z-20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50 rounded-br-lg pointer-events-none z-20" />

              {/* Close Button */}
              <button
                onClick={toggleOpen}
                aria-label="Close Map"
                className="absolute top-4 right-4 z-35 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white border border-white/10 hover:bg-cyan-500 hover:text-neutral-950 transition-colors active:scale-95 cursor-pointer shadow-md"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>

              {/* Address Title HUD indicator */}
              <div className="absolute top-4 left-4 z-30 bg-black/75 border border-white/15 backdrop-blur px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] text-cyan-400 font-mono tracking-wider flex items-center gap-1.5 pointer-events-none shadow-md max-w-[80%] truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                <span>{address.toUpperCase()}</span>
              </div>

              {/* Loader */}
              {!isMapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 z-10">
                  <Loader2 className="h-8 w-8 animate-spin text-cyan-glow" />
                </div>
              )}

              {/* Map Iframe */}
              <div className="w-full h-full rounded-xl overflow-hidden">
                <iframe
                  title="Google Map"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'var(--map-filter, invert(90%) hue-rotate(180deg))',
                  }}
                  src={publicMapUrl}
                  allowFullScreen
                  onLoad={() => setIsMapLoaded(true)}
                  className={`transition-opacity duration-700 ${isMapLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
