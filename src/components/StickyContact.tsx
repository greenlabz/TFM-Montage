'use client';

import { Mail } from 'lucide-react';
import { useEffect, useState, type MouseEventHandler } from 'react';

export default function StickyContact({ revealed = true, onEmailClick }: { revealed?: boolean; onEmailClick?: MouseEventHandler<HTMLButtonElement> }) {
  const [mobileVisible, setMobileVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setMobileVisible(window.scrollY > window.innerHeight * 0.72);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting);
    });

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!revealed}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[90] items-center gap-2 rounded-full border border-white/10 bg-[#181818]/82 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-opacity duration-700 ease-out ${revealed ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} ${mobileVisible && !footerVisible ? 'flex' : 'hidden'} md:bottom-auto md:right-6 md:top-1/2 md:flex md:-translate-y-1/2 md:flex-col md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none`}
    >
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/491709980942"
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Projektfoto per WhatsApp senden"
        tabIndex={revealed ? 0 : -1}
        className="sticky-contact-link group relative flex h-12 w-12 items-center justify-center overflow-clip rounded-full border border-white/10 bg-[#3f6f6b]/75 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#86aaa6] md:h-16 md:w-16 md:hover:scale-110"
      >
        <div className="absolute inset-[2px] z-10 rounded-full bg-[#3f6f6b]/90 backdrop-blur-xl" />
        
        {/* Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 16 16" className="relative z-20 drop-shadow-[0_0_8px_rgba(134,170,166,0.7)] transition-all group-hover:drop-shadow-[0_0_15px_rgba(134,170,166,1)] md:h-7 md:w-7">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>
      </a>

      {/* Email Button */}
      <button
        type="button"
        onClick={onEmailClick}
        aria-label="E-Mail-Anfrage öffnen"
        tabIndex={revealed ? 0 : -1}
        className="sticky-contact-link group relative flex h-12 w-12 items-center justify-center overflow-clip rounded-full border border-white/10 bg-[#3f6f6b]/75 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#86aaa6] md:h-16 md:w-16 md:hover:scale-110"
      >
        <div className="absolute inset-[2px] z-10 rounded-full bg-[#3f6f6b]/90 backdrop-blur-xl" />
        
        {/* Icon */}
        <Mail className="relative z-20 h-6 w-6 text-white drop-shadow-[0_0_8px_rgba(134,170,166,0.7)] transition-all group-hover:drop-shadow-[0_0_15px_rgba(134,170,166,1)] md:h-7 md:w-7" />
      </button>
    </div>
  );
}
