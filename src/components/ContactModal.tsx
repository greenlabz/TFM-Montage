'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  origin?: { x: number; y: number } | null;
};

export default function ContactModal({ isOpen, onClose, origin }: ContactModalProps) {
  const reduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<HTMLTextAreaElement>(null);

  const viewportCenter = typeof window === 'undefined'
    ? { x: 0, y: 0 }
    : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const originOffset = origin
    ? { x: origin.x - viewportCenter.x, y: origin.y - viewportCenter.y }
    : { x: 0, y: 20 };
  const collapsedState = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0.15, scale: 0.12, x: originOffset.x, y: originOffset.y, borderRadius: '999px' };

  const timeouts = useRef<number[]>([]);

  const closeModal = () => {
    setSubmitted(false);
    setError(null);
    setLoading(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', closeOnEscape);
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 80);
    timeouts.current.push(focusTimer);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      clearTimeout(focusTimer);
      timeouts.current = timeouts.current.filter((t) => t !== focusTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const request = String(data.get('request') || '').trim();

    if (!name || !email || !request) {
      setError('Bitte alle Felder ausfüllen.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, request })
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.error || 'Versand fehlgeschlagen.');
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);
      form.reset();
    } catch {
      setError('Technischer Fehler. Bitte später erneut versuchen.');
      setLoading(false);
    }
  };

  const inputClasses =
    'min-h-11 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-base text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/30 focus:border-[#86aaa6] focus:shadow-[0_0_0_3px_rgba(134,170,166,0.15)] disabled:opacity-60';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.24 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
        >
          <button
            type="button"
            aria-label="Kontaktfenster schließen"
            className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-sm"
            onClick={closeModal}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={collapsedState}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0, borderRadius: '2rem' }}
            exit={collapsedState}
            transition={reduceMotion
              ? { duration: 0.16 }
              : { type: 'spring', stiffness: 235, damping: 27, mass: 0.82 }}
            style={{ transformOrigin: 'center', willChange: 'transform, opacity' }}
            className="relative max-h-[calc(100dvh-1rem)] w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#212121]/95 p-4 text-white shadow-[0_32px_90px_-28px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:max-h-[calc(100dvh-2rem)] sm:p-6"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Kontaktfenster schließen"
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-[#86aaa6] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#86aaa6] sm:right-4 sm:top-4"
            >
              <X size={21} />
            </button>

            <div className="mx-auto mb-2 h-11 w-32 sm:mb-3 sm:h-14 sm:w-40">
              <div className="relative h-full w-full">
                <Image src="/Tom Logo.png" alt="Thomas Frenzel Montage" fill className="object-contain brightness-0 invert opacity-90" sizes="192px" />
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28 }}
                  className="flex min-h-[18rem] flex-col items-center justify-center text-center"
                  aria-live="polite"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#86aaa6]/50 bg-[#3f6f6b]/25 text-[#a9cbc7] shadow-[0_0_35px_rgba(63,111,107,0.28)]">
                    <Check size={30} strokeWidth={1.8} />
                  </div>
                  <span className="mb-4 font-display text-xs uppercase tracking-[0.28em] text-[#86aaa6]">Vielen Dank</span>
                  <h2 id="contact-modal-title" className="font-display text-2xl font-bold leading-tight sm:text-4xl">Danke für deine Anfrage.</h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
                    Ich habe deine Nachricht erhalten und melde mich schnellstmöglich bei dir.
                  </p>
                  <button type="button" onClick={closeModal} className="conversion-cta mt-6 rounded-full px-8 py-3 font-display text-xs uppercase tracking-[0.18em]">
                    Fenster schließen
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0 : 0.24 }}
                >
                  <div className="mb-4 text-center">
                    <span className="mb-2 block font-display text-[0.68rem] uppercase tracking-[0.28em] text-[#86aaa6] sm:text-xs">E-Mail-Anfrage</span>
                    <h2 id="contact-modal-title" className="font-display text-2xl font-bold leading-tight sm:text-4xl">Worum geht es?</h2>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/60">Drei Angaben reichen für den ersten Kontakt.</p>
                  </div>

                  <form ref={formRef} className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="modal-name" className="mb-1 block font-display text-xs uppercase tracking-widest text-white/65">Name</label>
                      <input
                        ref={nameRef}
                        autoFocus
                        type="text"
                        id="modal-name"
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="Dein Name"
                        className={inputClasses}
                        minLength={2}
                        maxLength={120}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-email" className="mb-1 block font-display text-xs uppercase tracking-widest text-white/65">E-Mail</label>
                      <input
                        ref={emailRef}
                        type="email"
                        id="modal-email"
                        name="email"
                        autoComplete="email"
                        required
                        placeholder="name@beispiel.de"
                        className={inputClasses}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-request" className="mb-1 block font-display text-xs uppercase tracking-widest text-white/65">Anliegen</label>
                      <textarea
                        ref={requestRef}
                        id="modal-request"
                        name="request"
                        rows={3}
                        required
                        placeholder="Beschreibe kurz dein Projekt oder deine Frage …"
                        className={inputClasses}
                        disabled={loading}
                      />
                    </div>

                    {error ? (
                      <p className="text-center text-sm text-red-400">{error}</p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={loading}
                      aria-disabled={loading}
                      className="conversion-cta inline-flex items-center justify-center gap-2 min-h-11 w-full rounded-full px-10 py-3 font-display text-sm font-bold uppercase tracking-widest disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          <span>Senden …</span>
                        </>
                      ) : (
                        <span>Anfrage senden</span>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
