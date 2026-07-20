'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useCallback } from 'react';

export type ConsentChoice = 'accepted' | 'rejected';

export default function CookieBanner({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (choice: ConsentChoice) => void;
}) {
  const handleAccept = useCallback(() => {
    onClose('accepted')
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose('rejected');
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60]"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
            onClick={() => onClose('rejected')}
          />
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 bottom-0 md:inset-x-auto md:left-1/2 md:right-auto md:bottom-8 md:w-[min(1100px,calc(100vw-2rem))] md:-translate-x-1/2"
            role="dialog"
            aria-label="Cookie-Einstellungen"
            aria-modal="true"
          >
            <div className="mx-auto max-w-7xl md:mx-0">
              <div className="mx-5 mb-5 rounded-[1.75rem] border border-white/12 bg-[#1a1a1c]/92 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl md:mx-0 md:rounded-2xl md:p-7">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
                  <p className="text-sm leading-relaxed text-white/85 md:text-base">
                    Diese Website verwendet essenzielle Cookies, damit sie reibungslos funktioniert. Mit deiner Zustimmung werden außerdem unterstützende Dienste geladen. Details findest du in der{' '}
                    <a
                      href="/datenschutz"
                      className="text-[#9f9f8c] underline underline-offset-4 transition hover:text-white"
                    >
                      Datenschutzerklärung
                    </a>
                    .
                  </p>
                  <div className="flex flex-wrap items-center gap-3 md:justify-end">
                    <button
                      type="button"
                      onClick={() => onClose('rejected')}
                      className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 px-5 py-3 text-xs font-display uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
                    >
                      Ablehnen
                    </button>
                    <button
                      type="button"
                      onClick={handleAccept}
                      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#3f6f6b] px-6 py-3 text-xs font-display uppercase tracking-[0.2em] text-white transition hover:bg-[#315854]"
                    >
                      Akzeptieren
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
