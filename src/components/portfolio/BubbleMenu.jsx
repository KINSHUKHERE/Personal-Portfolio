import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { Sun, Moon } from 'lucide-react';

import './BubbleMenu.css';

const DEFAULT_ITEMS = [
  {
    label: 'about',
    href: '#about',
    ariaLabel: 'About',
    rotation: -8,
    hoverStyles: { bgColor: '#06b6d4', textColor: '#ffffff' }
  },
  {
    label: 'skills',
    href: '#skills',
    ariaLabel: 'Skills',
    rotation: 8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  },
  {
    label: 'experience',
    href: '#experience',
    ariaLabel: 'Experience',
    rotation: -6,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'projects',
    href: '#projects',
    ariaLabel: 'Projects',
    rotation: 6,
    hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' }
  },
  {
    label: 'education',
    href: '#education',
    ariaLabel: 'Education',
    rotation: -8,
    hoverStyles: { bgColor: '#eab308', textColor: '#ffffff' }
  },
  {
    label: 'contact',
    href: '#contact',
    ariaLabel: 'Contact',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  }
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = 'var(--surface)',
  menuContentColor = 'var(--foreground)',
  useFixedPosition = false,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12,
  theme,
  toggleTheme
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;
  const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;

        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, menuItems]);

  return (
    <>
      <nav className={containerClassName} style={style} aria-label="Main navigation">
        <div className="bubble logo-bubble" aria-label="Logo" style={{ background: menuBg, border: '1px solid var(--border)' }}>
          <span className="logo-content">
            {typeof logo === 'string' ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {toggleTheme && (
            <button
              type="button"
              className="bubble theme-bubble cursor-pointer"
              onClick={toggleTheme}
              style={{ background: menuBg, border: '1px solid var(--border)', color: menuContentColor }}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          )}

          <button
            type="button"
            className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={handleToggle}
            aria-label={menuAriaLabel}
            aria-pressed={isMenuOpen}
            style={{ background: menuBg, border: '1px solid var(--border)' }}
          >
            <span className="menu-line" style={{ background: menuContentColor }} />
            <span className="menu-line short" style={{ background: menuContentColor }} />
          </button>
        </div>
      </nav>
      {showOverlay && (
        <div
          ref={overlayRef}
          className={`bubble-menu-items ${useFixedPosition ? 'fixed' : 'absolute'}`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="pill-list" role="menu" aria-label="Menu links">
            {menuItems.map((item, idx) => (
              <li key={idx} role="none" className="pill-col">
                <a
                  role="menuitem"
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className="pill-link"
                  style={{
                    '--item-rot': `${item.rotation ?? 0}deg`,
                    '--pill-bg': menuBg,
                    '--pill-color': menuContentColor,
                    '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                    '--hover-color': item.hoverStyles?.textColor || menuContentColor
                  }}
                  ref={el => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                  onClick={handleToggle}
                >
                  <span
                    className="pill-label"
                    ref={el => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
