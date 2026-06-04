import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Map } from 'lucide-react';

export function ViewOnMap({
  address = 'Jaipur, Rajasthan',
  mapImageUrl = 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2000&auto=format&fit=crop',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) setIsMapLoaded(false);
  };

  const springConfig = {
    type: 'spring',
    stiffness: 300,
    damping: 25,
    mass: 0.8,
  };

  const publicMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={`w-full ${className}`}>
      <AnimatePresence mode="popLayout">
        {!isOpen ? (
          /* --- PILL BUTTON --- */
          <motion.div
            key="button"
            onClick={toggleOpen}
            className="group relative flex cursor-pointer items-center justify-center overflow-hidden border border-cyan-glow/40 bg-surface/60 hover:border-cyan-glow transition-all"
            style={{ width: 180, height: 46, borderRadius: 23 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={springConfig}
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
        ) : (
          /* --- EXPANDED MAP INLINE (COMPACT RECTANGLE) --- */
          <motion.div
            key="map"
            className="relative w-full max-w-[360px] h-[220px] overflow-hidden border border-border bg-surface shadow-lg transition-colors duration-300"
            style={{ borderRadius: 20 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={springConfig}
          >
            <div
              className="absolute inset-0 h-full w-full brightness-[1.02] contrast-[1.05] grayscale-[0.9] saturate-[0.8] sepia-[0.1]"
            >
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'var(--map-filter, invert(15%) hue-rotate(180deg))',
                }}
                src={publicMapUrl}
                allowFullScreen
                onLoad={() => setIsMapLoaded(true)}
                className={`transition-opacity duration-700 ${isMapLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>

            {!isMapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-surface">
                <Loader2 className="h-6 w-6 animate-spin text-cyan-glow" />
              </div>
            )}

            {/* CLOSE BUTTON */}
            <button
              onClick={toggleOpen}
              className="absolute top-3 right-3 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-surface text-muted-foreground border border-border hover:text-foreground active:scale-90 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" strokeWidth={3} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
