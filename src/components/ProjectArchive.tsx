'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, useSyncExternalStore } from 'react';

const subscribeToHydration = () => () => undefined;

const projects = [
  {
    id: 'wohninterieur',
    image: '/projekt-kueche.png',
    title: 'Arbeitsplatte sauber gefolgt',
    category: 'Folierung',
    detail: 'Nahtlose Oberflächenoptik, präzise Übergänge und saubere Randabschlüsse ohne Montage.',
    layout: 'md:col-span-8',
    aspect: 'aspect-[16/10]'
  },
  {
    id: 'bodenverlegung',
    image: '/projekt-moebelmontage.png',
    title: 'Möbel präzise montiert',
    category: 'Möbelmontage',
    detail: 'Korpusse, Auszüge und Fronten Schritt für Schritt sauber ausgerichtet.',
    layout: 'md:col-span-4 md:mt-24',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'akustikpaneele',
    image: '/projekt-akustikpaneele.png',
    title: 'Paneele als klare Raumkante',
    category: 'Akustikpaneele',
    detail: 'Gleichmäßige Lamellen, saubere Sockelanschlüsse und präzise Ausschnitte.',
    layout: 'md:col-span-5',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'kellerausbau',
    image: '/projekt-keller.png',
    title: 'Kellerausbau mit klarer Raumaufteilung',
    category: 'Innenausbau',
    detail: 'Passgenaue Holzabtrennungen nutzen den vorhandenen Raum sinnvoll aus.',
    layout: 'md:col-span-7',
    aspect: 'aspect-[16/10]'
  },
  {
    id: 'modernisierung',
    image: '/projekt-treppengelaender.png',
    title: 'Geländer klar geführt',
    category: 'Treppen & Geländer',
    detail: 'Saubere Anschlüsse und eine ruhige Linienführung geben sicheren Halt.',
    layout: 'md:col-span-5 md:mt-24',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'kellerdetail',
    image: '/projekt-treppenbau.png',
    title: 'Installation von Massivholzstufen',
    category: 'Montage',
    detail: 'Massive Holzstufen präzise auf der Stahlkonstruktion ausgerichtet.',
    layout: 'md:col-span-4',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 'kellerausbau',
    image: '/projekt-keller.png',
    title: 'Kellerausbau mit klarer Raumaufteilung',
    category: 'Innenausbau',
    detail: 'Passgenaue Holzabtrennungen nutzen den vorhandenen Raum sinnvoll aus.',
    layout: 'md:col-span-7',
    aspect: 'aspect-[16/10]'
  },
] as const;

type Project = (typeof projects)[number];

function ProjectLightbox({
  project,
  onClose,
  reduceMotion
}: {
  project: Project | null;
  onClose: () => void;
  reduceMotion: boolean;
}) {
  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#111]/92 p-4 md:p-10"
          onClick={onClose}
        >
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Projektansicht schließen"
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#212121] text-white transition-colors hover:border-[#3f6f6b] hover:text-[#86aaa6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#86aaa6] md:right-8 md:top-8"
          >
            <X size={22} />
          </button>

          <motion.div
            layoutId={reduceMotion ? undefined : `archive-image-${project.id}`}
            className="relative h-[min(68vh,50rem)] w-full max-w-6xl overflow-hidden bg-[#181818]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image src={project.image} alt={project.title} fill className="object-contain" sizes="100vw" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-6 pb-6 pt-24 md:px-10 md:pb-9">
              <span className="font-display text-[10px] uppercase tracking-[0.28em] text-[#86aaa6]">{project.category}</span>
              <h3 className="mt-2 max-w-3xl font-display text-2xl font-semibold tracking-[-0.035em] text-white md:text-4xl">{project.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">{project.detail}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProjectArchive() {
  const shouldReduceMotion = useReducedMotion();
  const hasHydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const reduceMotion = hasHydrated && Boolean(shouldReduceMotion);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="project-archive" className="relative scroll-mt-20 overflow-hidden bg-[#181818] px-6 py-24 text-white md:px-16 md:py-36">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.65fr)_minmax(18rem,0.55fr)] md:items-end md:gap-16">
            <div>
              <span className="font-display text-xs uppercase tracking-[0.3em] text-[#86aaa6]">Projektarchiv</span>
              <h2 className="mt-6 max-w-5xl font-display text-[clamp(3.25rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
                Arbeiten, die man nicht erklären muss.
              </h2>
            </div>
            <p className="border-l border-white/20 pl-6 text-base leading-[1.75] text-white/60 md:pl-8 md:text-lg">
              Montage, Innenausbau und Reparaturen. Im Ganzen betrachtet. Im Detail geprüft.
            </p>
          </div>

          <div className="relative mt-16 md:mt-24">
            <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-white/12">
              <motion.span
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px origin-left bg-[#3f6f6b]"
              />
              {[0, 25, 50, 75, 100].map((position) => (
                <span key={position} className="absolute top-[-4px] h-[9px] w-px bg-[#3f6f6b]" style={{ left: `${position}%` }} />
              ))}
            </div>

            <div className="grid grid-cols-12 gap-x-4 gap-y-14 pt-14 md:gap-x-8 md:gap-y-24 md:pt-20">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  type="button"
                  initial={reduceMotion ? false : { opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
                  transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedProject(project)}
                  className={`group col-span-12 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#86aaa6] ${project.layout}`}
                  aria-label={`${project.title} öffnen`}
                >
                  <motion.div
                    layoutId={reduceMotion ? undefined : `archive-image-${project.id}`}
                    initial={reduceMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
                    whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                    viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                    transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.08, ease: [0.76, 0, 0.24, 1] }}
                    className={`relative overflow-hidden bg-white/5 ${project.aspect}`}
                    style={{ willChange: reduceMotion ? undefined : 'clip-path' }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]`}
                      sizes="(max-width: 767px) 100vw, 66vw"
                    />
                    <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#181818]/75 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <ArrowUpRight size={19} />
                    </span>
                  </motion.div>

                  <div className="mt-5 grid grid-cols-[3rem_1fr] gap-4 border-t border-white/12 pt-4 md:grid-cols-[4rem_1fr]">
                    <span className="font-display text-[10px] tracking-[0.24em] text-[#86aaa6]">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <span className="font-display text-[10px] uppercase tracking-[0.24em] text-white/45">{project.category}</span>
                      <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.025em] text-white md:text-2xl">{project.title}</h3>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-24 flex flex-col items-start justify-between gap-8 border-t border-white/12 pt-10 md:flex-row md:items-center">
            <p className="max-w-xl text-base leading-relaxed text-white/60">Ein Foto reicht für den ersten Schritt. Ich prüfe, was möglich und sinnvoll ist.</p>
            <a
              href="https://wa.me/491709980942?text=Hallo%20Thomas%2C%20ich%20m%C3%B6chte%20dir%20ein%20Foto%20von%20meinem%20Projekt%20schicken."
              target="_blank"
              rel="noopener noreferrer"
              className="conversion-cta rounded-full px-9 py-4 font-display text-xs uppercase tracking-[0.18em]"
            >
              Projektfoto senden
            </a>
          </div>
        </div>
      </section>

      <ProjectLightbox project={selectedProject} reduceMotion={reduceMotion} onClose={() => setSelectedProject(null)} />
    </>
  );
}
