'use client';

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue
} from 'framer-motion';
import { Hammer, Wrench, Ruler, Home as HomeIcon, HeartHandshake, MessageCircle, Images, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef, useSyncExternalStore, useCallback, type MouseEvent as ReactMouseEvent } from 'react';
import StructuredData from '@/components/StructuredData';
import ContactModal from '@/components/ContactModal';
import CookieBanner from '@/components/CookieBanner';
import ProjectArchive from '@/components/ProjectArchive';
import StickyContact from '@/components/StickyContact';

const processSteps = [
  {
    num: '01',
    title: 'Foto senden',
    desc: 'Ein Bild und ein kurzer Satz genügen für den Anfang.'
  },
  {
    num: '02',
    title: 'Umfang klären',
    desc: 'Ich prüfe Aufgabe, Ort und sinnvolle nächste Schritte.'
  },
  {
    num: '03',
    title: 'Angebot erhalten',
    desc: 'Leistung und Kosten werden vor dem Start nachvollziehbar festgehalten.'
  },
  {
    num: '04',
    title: 'Sauber abnehmen',
    desc: 'Nach der Montage wird das Ergebnis gemeinsam geprüft.'
  }
];

const services = [
  {
    title: 'Montage & Innenausbau',
    desc: 'Möbelmontage, Zimmertüren, Türrahmen, Laminat- und Vinylböden, Sockelleisten, Paneele, Wandverkleidungen und individuelle Stauraumlösungen.',
    icon: Hammer
  },
  {
    title: 'Reparaturen & Instandhaltung',
    desc: 'Möbel, Scharniere, Beschläge, Türen und Holzbauteile werden sauber instand gesetzt und für den weiteren Einsatz vorbereitet.',
    icon: Wrench
  },
  {
    title: 'Individuelle kleine Holzarbeiten',
    desc: 'Passgenaue Lösungen für Nischen, Übergänge und Details, bei denen Standardmaße nicht weiterhelfen.',
    icon: Ruler
  },
  {
    title: 'Modernisierung',
    desc: 'Sicht- und Trennelemente, Stauraumlösungen sowie Anpassungen bei Umzug oder Renovierung.',
    icon: HomeIcon
  },
  {
    title: 'Service & Kundenbetreuung',
    desc: 'Persönliche Beratung, klare Planung, nachvollziehbare Angebote und eine saubere gemeinsame Abnahme.',
    icon: HeartHandshake
  }
] satisfies { title: string; desc: string; icon: LucideIcon }[];

const serviceStarts = [0.08, 0.22, 0.36, 0.5, 0.64];
const subscribeToHydration = () => () => undefined;

function useHasHydrated() {
  return useSyncExternalStore(subscribeToHydration, () => true, () => false);
}

function ServiceStackCard({
  service,
  index,
  progress,
  compact = false
}: {
  service: (typeof services)[number];
  index: number;
  progress: MotionValue<number>;
  compact?: boolean;
}) {
  const compactStarts = [0.015, 0.17, 0.325, 0.48, 0.635];
  const starts = compact ? compactStarts : serviceStarts;
  const activeStart = starts[index];
  const entryStart = Math.max(0, activeStart - (compact ? 0.055 : 0.08));
  const laterStarts = starts.slice(index + 1);
  const fanStart = 0.82;
  const fanEnd = 0.9;
  const inputs = [entryStart, activeStart, ...laterStarts, fanStart, fanEnd];
  const stackY = laterStarts.map((_, step) => (compact ? -10 : -18) * (step + 1));
  const stackScale = laterStarts.map((_, step) => 1 - (compact ? 0.014 : 0.018) * (step + 1));
  const finalY = stackY[stackY.length - 1] ?? 0;
  const finalScale = stackScale[stackScale.length - 1] ?? 1;
  const fanIndex = index - (services.length - 1) / 2;
  const fromX = index % 2 === 0 ? (compact ? 88 : 150) : compact ? -88 : -150;
  const fromRotate = index % 2 === 0 ? (compact ? 1.8 : 2.4) : compact ? -1.8 : -2.4;

  const x = useTransform(progress, inputs, [fromX, 0, ...laterStarts.map(() => 0), 0, fanIndex * (compact ? 14 : 42)]);
  const y = useTransform(progress, inputs, [compact ? 72 : 100, 0, ...stackY, finalY, Math.abs(fanIndex) * (compact ? 8 : 12)]);
  const scale = useTransform(progress, inputs, [0.94, 1, ...stackScale, finalScale, 0.96]);
  const rotate = useTransform(progress, inputs, [fromRotate, 0, ...laterStarts.map(() => 0), 0, fanIndex * (compact ? 1.4 : 2.2)]);
  const opacity = useTransform(progress, [entryStart, activeStart, 1], [compact && index === 0 ? 0.65 : 0, 1, 1]);
  const copyOpacity = useTransform(progress, [activeStart - 0.015, activeStart + 0.04, 1], [0, 1, 1]);
  const copyY = useTransform(progress, [activeStart - 0.015, activeStart + 0.04], [15, 0]);
  const lineScale = useTransform(progress, [activeStart - 0.02, activeStart + 0.07], [0, 1]);
  const Icon = service.icon;

  return (
    <motion.article
      style={{ x, y, scale, rotate, opacity, willChange: 'transform, opacity' }}
      className="relative flex h-[min(27rem,calc(100svh-13rem))] min-h-[24rem] w-[calc(100vw-3rem)] overflow-hidden rounded-[1.65rem] border border-black/8 bg-white shadow-[0_28px_60px_-26px_rgba(0,0,0,0.42)] md:h-auto md:min-h-[21rem] md:w-[min(78vw,68rem)] md:rounded-[2rem] md:shadow-[0_32px_75px_-28px_rgba(0,0,0,0.38)]"
    >
      <motion.span
        style={{ scaleX: lineScale, transformOrigin: 'left' }}
        className="absolute left-0 right-0 top-0 h-1 bg-[#3f6f6b]"
        aria-hidden="true"
      />
      <div className="grid w-full grid-rows-[5.25rem_1fr] md:grid-cols-[9rem_1fr] md:grid-rows-none">
        <div className="flex items-center justify-between border-b border-black/8 bg-[#f4f5f3] px-6 py-4 md:flex-col md:items-stretch md:border-b-0 md:border-r md:p-9">
          <motion.div
            style={{ opacity: copyOpacity, y: copyY }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#3f6f6b]/25 bg-[#3f6f6b]/10 text-[#3f6f6b] md:h-16 md:w-16"
          >
            <Icon className="h-6 w-6 md:h-[31px] md:w-[31px]" strokeWidth={1.7} />
          </motion.div>
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6d7773]">
            Leistungsbereich
          </span>
        </div>
        <motion.div style={{ opacity: copyOpacity, y: copyY }} className="flex min-w-0 flex-col justify-center px-6 py-7 sm:px-8 md:px-14 md:py-12">
          <h3 className="max-w-3xl font-display text-[clamp(1.75rem,8vw,2.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#212121] md:text-4xl lg:text-5xl">
            {service.title}
          </h3>
          <p className="mt-4 max-w-3xl text-[0.98rem] leading-[1.55] text-[#555b58] md:mt-7 md:text-lg md:leading-[1.75]">{service.desc}</p>
          <span className="mt-6 h-px w-16 bg-[#3f6f6b]/45 md:mt-9 md:w-20" aria-hidden="true" />
        </motion.div>
      </div>
    </motion.article>
  );
}

function StaticServiceCard({ service, index, reduceMotion = false }: { service: (typeof services)[number]; index: number; reduceMotion?: boolean }) {
  const Icon = service.icon;
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: index % 2 === 0 ? 1 : -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[1.5rem] border border-black/8 bg-white p-7 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.34)]"
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-[#3f6f6b]" aria-hidden="true" />
      <div className="mb-8 flex h-13 w-13 items-center justify-center rounded-full bg-[#3f6f6b]/10 text-[#3f6f6b]">
        <Icon size={25} strokeWidth={1.7} />
      </div>
      <h3 className="font-display text-2xl font-semibold tracking-[-0.035em] text-[#212121]">{service.title}</h3>
      <p className="mt-4 leading-relaxed text-[#555b58]">{service.desc}</p>
    </motion.article>
  );
}

function ServiceStack({
  onContact,
  reduceMotion
}: {
  onContact: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });
  const [hasCtaRevealed, setHasCtaRevealed] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 0.98) setHasCtaRevealed(true);
  });

  if (reduceMotion) {
    return (
      <section id="services" className="bg-[#f0f0f0] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-[#3f6f6b]">Angebot</span>
          <h2 className="mt-4 font-display text-5xl font-bold text-[#212121] md:text-7xl">Leistungen.</h2>
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => <StaticServiceCard key={service.title} service={service} index={index} reduceMotion />)}
          </div>
          <button type="button" onClick={onContact} className="conversion-cta mx-auto mt-14 flex rounded-full px-12 py-5 font-display text-sm uppercase tracking-widest">
            Projekt anfragen
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="services" ref={ref} className="relative h-[560svh] bg-[#f0f0f0] md:h-[520vh]">
      <div className="sticky top-0 h-svh overflow-clip md:hidden">
        <div className="absolute inset-x-0 top-0 z-20 px-6 pt-16">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-[#3f6f6b]">Angebot</span>
          <h2 className="mt-3 font-display text-[clamp(2.75rem,13vw,3.75rem)] font-bold leading-none tracking-[-0.045em] text-[#212121]">Leistungen.</h2>
        </div>

        <div className="absolute inset-x-0 bottom-20 top-36">
          {services.map((service, index) => (
            <div key={service.title} className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ zIndex: index + 1 }}>
              <ServiceStackCard service={service} index={index} progress={scrollYProgress} compact />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 flex justify-start px-6">
          <motion.button
            type="button"
            onClick={onContact}
            disabled={!hasCtaRevealed}
            aria-hidden={!hasCtaRevealed}
            tabIndex={hasCtaRevealed ? 0 : -1}
            initial={{ opacity: 0, y: 12 }}
            animate={hasCtaRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="conversion-cta flex rounded-full px-9 py-4 font-display text-xs uppercase tracking-widest"
          >
            Projekt anfragen
          </motion.button>
        </div>
      </div>

      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <div className="absolute left-0 right-0 top-0 z-20 mx-auto flex max-w-7xl items-end justify-between px-16 pt-20">
          <div>
            <span className="font-display text-xs uppercase tracking-[0.3em] text-[#3f6f6b]">Angebot</span>
            <h2 className="mt-3 font-display text-5xl font-bold tracking-[-0.045em] text-[#212121]">Leistungen.</h2>
          </div>
          <p className="max-w-sm text-right text-sm leading-relaxed text-[#606762]">
            Fünf Bereiche. Eine saubere Ausführung. Scrolle durch den Stapel.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-24 top-28">
          {services.map((service, index) => (
            <div key={service.title} className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ zIndex: index + 1 }}>
              <ServiceStackCard service={service} index={index} progress={scrollYProgress} />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center">
          <motion.button
            type="button"
            onClick={onContact}
            disabled={!hasCtaRevealed}
            aria-hidden={!hasCtaRevealed}
            tabIndex={hasCtaRevealed ? 0 : -1}
            initial={{ opacity: 0, y: 15 }}
            animate={hasCtaRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="conversion-cta flex rounded-full px-12 py-4 font-display text-sm uppercase tracking-widest"
          >
            Projekt anfragen
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function MeasurementTick({
  progress,
  threshold,
  top,
  reduceMotion
}: {
  progress: MotionValue<number>;
  threshold: number;
  top: number;
  reduceMotion: boolean;
}) {
  const opacity = useTransform(progress, [threshold - 0.025, threshold], [0.22, 1]);
  const scaleX = useTransform(progress, [threshold - 0.025, threshold], [0.45, 1]);

  return (
    <motion.span
      style={{ top: `${top}%`, opacity: reduceMotion ? 1 : opacity, scaleX: reduceMotion ? 1 : scaleX, transformOrigin: 'left' }}
      className="absolute left-0 h-px w-3 bg-[#3f6f6b]"
    />
  );
}

function MeasurementLine({ reduceMotion }: { reduceMotion: boolean }) {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed bottom-16 left-7 top-32 z-[45] hidden w-4 md:block">
      <span className="absolute bottom-0 left-0 top-0 w-px bg-[#9f9f8c]/25" />
      <motion.span
        style={{ scaleY: reduceMotion ? 1 : scaleY, transformOrigin: 'top' }}
        className="absolute bottom-0 left-0 top-0 w-px bg-[#3f6f6b] shadow-[0_0_12px_rgba(63,111,107,0.65)]"
      />
      {[16, 37, 61, 84].map((top, index) => (
        <MeasurementTick key={top} progress={scrollYProgress} threshold={(index + 1) * 0.2} top={top} reduceMotion={reduceMotion} />
      ))}
      <span className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full border border-[#3f6f6b] bg-[#212121]" />
      <span className="absolute -bottom-px -left-[3px] h-[7px] w-[7px] rounded-full bg-[#3f6f6b]" />
    </div>
  );
}

function AssembledFooterLogo({ reduceMotion }: { reduceMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [assembled, setAssembled] = useState(reduceMotion);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.08) setAssembled(true);
  });

  const isAssembled = reduceMotion || assembled;
  const leftInitial = reduceMotion ? false : { opacity: 0, x: -34, rotate: -1.5 };
  const rightInitial = reduceMotion ? false : { opacity: 0, x: 34, rotate: 1.5 };

  return (
    <div ref={ref} role="img" aria-label="Tom Logo" className="relative h-24 w-60 scale-[1.22] md:h-28 md:w-72 md:scale-[1.3]">
      <motion.div
        initial={leftInitial}
        animate={isAssembled ? { opacity: 0.5, x: 0, rotate: 0 } : leftInitial || undefined}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
      >
        <Image src="/Tom Logo.webp" alt="" fill className="object-contain object-center" sizes="(max-width: 768px) 240px, 288px" />
      </motion.div>
      <motion.div
        initial={rightInitial}
        animate={isAssembled ? { opacity: 0.5, x: 0, rotate: 0 } : rightInitial || undefined}
        transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{ clipPath: 'inset(0 0 0 50%)' }}
      >
        <Image src="/Tom Logo.webp" alt="" fill className="object-contain object-center" sizes="(max-width: 768px) 240px, 288px" />
      </motion.div>
      {!reduceMotion && (
        <motion.span
          initial={{ opacity: 0, scaleY: 0 }}
          animate={isAssembled ? { opacity: [0, 0.75, 0], scaleY: [0, 1, 0] } : { opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-[18%] left-1/2 top-[18%] w-px bg-[#3f6f6b]"
        />
      )}
    </div>
  );
}

function ProcessStep({
  step,
  index,
  progress,
  reduceMotion
}: {
  step: (typeof processSteps)[number];
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const isLeft = index % 2 === 0;
  const start = 0.08 + index * 0.21;
  const end = start + 0.1;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start, end], [isLeft ? -56 : 56, 0]);
  const y = useTransform(progress, [start, end], [18, 0]);
  const scale = useTransform(progress, [start, end], [0.72, 1]);

  return (
    <div className="relative grid min-h-[5.5rem] grid-cols-[3rem_minmax(0,1fr)] items-center gap-x-5 md:min-h-[6.5rem] md:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] md:gap-x-10">
      <motion.div
        style={reduceMotion ? undefined : { opacity, scale, willChange: 'opacity, transform' }}
        className="relative z-10 col-start-1 row-start-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#212121] bg-[#9f9f8c] md:col-start-2 md:h-14 md:w-14"
      >
        <span className="font-display text-sm font-bold text-[#212121] md:text-base">{step.num}</span>
      </motion.div>

      <motion.article
        style={reduceMotion ? undefined : { opacity, x, y, willChange: 'opacity, transform' }}
        className={`col-start-2 row-start-1 max-w-xl pr-14 md:pr-0 ${
          isLeft
            ? 'md:col-start-1 md:justify-self-end md:pr-2 md:text-right'
            : 'md:col-start-3 md:pl-2 md:text-left'
        }`}
      >
        <span className="mb-1 block font-display text-[10px] uppercase tracking-[0.28em] text-[#9f9f8c]">
          Schritt {step.num}
        </span>
        <h3 className="mb-1 font-display text-xl font-bold text-white md:text-3xl">{step.title}</h3>
        <p className="text-sm leading-relaxed text-[#9f9f8c] md:text-base">{step.desc}</p>
      </motion.article>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHeroRevealed, setIsHeroRevealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const hasHydrated = useHasHydrated();
  const reduceMotion = hasHydrated && Boolean(shouldReduceMotion);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isMobileGallery, setIsMobileGallery] = useState(false);
  const [mobileGalleryWidth, setMobileGalleryWidth] = useState(390);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const syncViewport = () => {
      setIsMobileGallery(query.matches);
      setMobileGalleryWidth(window.innerWidth);
    };
    syncViewport();
    query.addEventListener('change', syncViewport);
    window.addEventListener('resize', syncViewport, { passive: true });
    return () => {
      query.removeEventListener('change', syncViewport);
      window.removeEventListener('resize', syncViewport);
    };
  }, []);
  const { scrollYProgress: galleryProgress } = useScroll({
    target: galleryRef,
    offset: ['start start', 'end end']
  });
  const galleryXDesktop = useTransform(
    galleryProgress,
    [0, 0.9, 1],
    [0, -(mobileGalleryWidth + 720), -(mobileGalleryWidth + 720)]
  );
  const galleryXMobile = useTransform(
    galleryProgress,
    [0, 0.88, 1],
    [0, -(mobileGalleryWidth / 2 + 846), -(mobileGalleryWidth / 2 + 846)]
  );
  const galleryX = isMobileGallery ? galleryXMobile : galleryXDesktop;

  const gallery2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: gallery2Progress } = useScroll({
    target: gallery2Ref,
    offset: ['start start', 'end end']
  });
  const gallery2XDesktop = useTransform(gallery2Progress, [0, 1], ["0%", "-60%"]);
  const gallery2XMobile = useTransform(
    gallery2Progress,
    [0, 0.9, 1],
    [0, -(mobileGalleryWidth / 2 + 846), -(mobileGalleryWidth / 2 + 846)]
  );
  const gallery2X = isMobileGallery ? gallery2XMobile : gallery2XDesktop;


  const gallery4Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: gallery4Progress } = useScroll({
    target: gallery4Ref,
    offset: ['start start', 'end end']
  });
  const gallery4XDesktop = useTransform(gallery4Progress, [0, 1], ["0%", "-60%"]);
  const gallery4XMobile = useTransform(
    gallery4Progress,
    [0, 0.9, 1],
    [0, -(mobileGalleryWidth / 2 + 846), -(mobileGalleryWidth / 2 + 846)]
  );
  const gallery4X = isMobileGallery ? gallery4XMobile : gallery4XDesktop;

  const processRef = useRef<HTMLElement>(null);
  const { scrollYProgress: processProgress } = useScroll({
    target: processRef,
    offset: ['start start', 'end end']
  });
  const processRevealProgress = useMotionValue(0);
  useMotionValueEvent(processProgress, 'change', (latest) => {
    if (latest > processRevealProgress.get()) {
      processRevealProgress.set(latest);
    }
  });
  const processLineScale = useTransform(processRevealProgress, [0.05, 0.86], [0, 1]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openReview, setOpenReview] = useState<number | null>(null);
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'rejected' | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('cookie-consent');
      if (stored === 'accepted' || stored === 'rejected') return stored;
    }
    return null;
  });
  const [cookieBannerRevealed, setCookieBannerRevealed] = useState(false);
  const cookieBannerRevealedRef = useRef(false);
  const [showDownload, setShowDownload] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactOrigin, setContactOrigin] = useState<{ x: number; y: number } | null>(null);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openContact = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setContactOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setIsContactModalOpen(true);
  };

  const handleConsent = useCallback((choice: 'accepted' | 'rejected') => {
    try {
      window.localStorage.setItem('cookie-consent', choice);
    } catch {
      // ignore
    }
    setCookieConsent(choice);
  }, []);


  const [isLightSection, setIsLightSection] = useState(false)
  const leadMagnetRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight
      const threshold = viewportHeight * 0.35
      const mid = viewportHeight * 0.65
      const collapseNav = window.scrollY > 90 || window.innerWidth < 768
      let light = false
      if (aboutRef.current) {
        const aboutRect = aboutRef.current.getBoundingClientRect()
        if (aboutRect.top < threshold && aboutRect.bottom > mid && aboutRect.bottom > 0) light = true
      }
      if (!light && leadMagnetRef.current) {
        const leadRect = leadMagnetRef.current.getBoundingClientRect()
        if (leadRect.top < threshold && leadRect.bottom > mid && leadRect.bottom > 0) light = true
      }
      setIsLightSection(light)
      setIsNavCollapsed(collapseNav)
      if (!collapseNav) setIsMenuOpen(false)

      if (!cookieBannerRevealedRef.current && aboutRef.current) {
        const r = aboutRef.current.getBoundingClientRect()
        if (r.top < viewportHeight && r.bottom > 0) {
          cookieBannerRevealedRef.current = true
          setCookieBannerRevealed(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (isLoading) return;

    // Auf Mobilgeräten sofort den Hero aktivieren, damit die Text-Animation direkt flüssig nach dem Logo startet
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsHeroRevealed(true);
      return;
    }

    const video = heroVideoRef.current;
    if (!video) {
      setIsHeroRevealed(true);
      return;
    }

    const revealStaticHero = () => {
      video.pause();
      if (Number.isFinite(video.duration)) video.currentTime = Math.max(0, video.duration - 0.05);
      setIsHeroRevealed(true);
    };

    if (reduceMotion) {
      if (video.readyState >= 1) revealStaticHero();
      else video.addEventListener('loadedmetadata', revealStaticHero, { once: true });
      return () => video.removeEventListener('loadedmetadata', revealStaticHero);
    }

    video.currentTime = 0;
    video.defaultPlaybackRate = 0.82;
    video.playbackRate = 0.82;
    void video.play().catch(() => setIsHeroRevealed(true));
  }, [isLoading, reduceMotion]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const stagger = {
    animate: {
      transition: {
        delayChildren: 0.05,
        staggerChildren: 0.06
      }
    }
  };

  const triggerDownload = () => {
    const a = document.createElement('a');
    a.href = '/holzpflege-leicht-gemacht.pdf';
    a.download = 'Holzpflege-leicht-gemacht.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const testimonials = [
    {
      quote: `Herr Frenzel hat bei mir in Weil im Schönbuch eine Zimmertür inklusive Zarge ausgetauscht – das Ergebnis ist absolut perfekt! Die Tür sitzt schnurgerade, schleift nicht und schließt butterweich. Die alte Tür wurde fachgerecht demontiert und der Arbeitsbereich blitzblank hinterlassen. Herr Frenzel arbeitet zügig, strukturiert und mit Profi-Werkzeug. Ein klasse Schreiner- und Montageservice für Weil im Schönbuch und die umliegende Region im Kreis Böblingen. Gerne wieder beim nächsten Projekt!`,
      name: 'Roja R.',
      location: 'Weil im Schönbuch',
      initials: 'RR'
    },
    {
      quote: `Herr Frenzel hat bei unserem Projekt hervorragende Arbeit geleistet. Der neue Vinylboden liegt perfekt eben, Übergänge und Sockelleisten sind sauber verarbeitet und das Tempo war wirklich stark. Pünktlich, freundlich und am Ende wurde alles blitzblank hinterlassen. Top Handwerker für den gesamten Kreis Böblingen! absolut empfehlenswert!`,
      name: 'Daniel K.',
      location: 'Böblingen',
      initials: 'DK'
    },
    {
      quote: `Thomas Frenzel hat bei unserem Projekt in Böblingen ein Regalsystem und einen Hängeschrank montiert. Die Ausführung war extrem sauber, durchdacht und zügig. Pünktlich, freundlich, top Werkzeug dabei – das Ergebnis sitzt absolut bombenfest! Wer im Kreis Böblingen einen erfahrenen Handwerker für Möbelmontage sucht, ist hier genau richtig. Gerne wieder!`,
      name: 'V. Tenes',
      location: 'Böblingen',
      initials: 'VT'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--background)] text-[var(--foreground)] font-body">
      <StructuredData
        faq={[
          { question: 'Welche Materialien verwendest du?', answer: 'Ich arbeite ausschließlich mit ausgewählten, hochwertigen Hölzern und Materialien – passend zu deinem Projekt und Budget.' },
          { question: 'Muss ich selbst Material besorgen?', answer: 'Nein, in der Regel übernehme ich die komplette Materialbeschaffung. Du musst dich um nichts kümmern.' },
          { question: 'Bietest du auch kurzfristige Termine an?', answer: 'Bei kleineren Reparatur- oder Montagearbeiten ist oft auch ein kurzfristiger Termin möglich – einfach anfragen.' },
          { question: 'Was passiert, wenn mir die Planung nicht zusagt?', answer: 'Die Beratung und Planung sind unverbindlich. Erst wenn alles passt, geht’s in die Umsetzung.' },
          { question: 'Übernimmst du auch die Entsorgung von Altmaterial?', answer: 'Ja, auf Wunsch übernehme ich auch die fachgerechte Entsorgung von Altmaterial.' }
        ]}
        breadcrumb={[
          { name: 'Start', url: 'https://www.tf-m.de/' }
        ]}
        reviews={testimonials.map(t => ({
          author: t.name,
          reviewBody: t.quote,
          reviewRating: 5,
          location: t.location
        }))}
        localBusiness={{
          name: 'Thomas Frenzel · Montage & Handwerk',
          description: 'Handwerker für Montage, Innenausbau und Holzarbeiten im Kreis Böblingen — persönlich, fachlich, regional.',
          telephone: '+49 170 9980942',
          email: 'info@tf-m.de',
          streetAddress: 'Hohenstaufenstr. 12',
          postalCode: '71032',
          addressLocality: 'Böblingen',
          addressRegion: 'Baden-Württemberg',
          addressCountry: 'DE'
        }}
        person={{
          name: 'Thomas Frenzel',
          jobTitle: 'Holzmechaniker und Montage-Handwerker'
        }}
      />
      
      {!isMenuOpen && <StickyContact revealed={isHeroRevealed} onEmailClick={openContact} />}
      <MeasurementLine reduceMotion={reduceMotion} />
      
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative w-[40rem] h-[40rem] md:w-[56rem] md:h-[56rem]"
            >
              <Image src="/Tom Logo.webp" alt="Tom Logo" fill className="object-contain" priority loading="eager" sizes="(max-width: 768px) 640px, 896px" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-40 bg-black/25"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isHeroRevealed ? 1 : 0, y: isHeroRevealed ? 0 : -20 }}
        transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.05 }}
        aria-label="Hauptnavigation"
        aria-hidden={!isHeroRevealed}
        inert={!isHeroRevealed}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 md:px-8"
      >
        <motion.div
          layout
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 145, damping: 22, mass: 1.05 }}
          className={`pointer-events-auto mx-auto flex items-center justify-between transition-[background-color,border-color,border-radius,box-shadow,color] duration-500 ease-out ${
            isNavCollapsed
              ? 'mt-4 w-[min(17rem,calc(100vw-2rem))] rounded-full border border-[#3f6f6b]/70 bg-[#181818] px-3 py-2 shadow-[0_18px_45px_-18px_rgba(0,0,0,0.72)]'
              : `w-full max-w-[1500px] px-4 py-4 md:px-8 ${isLightSection ? 'text-[#606762]' : 'text-white'}`
          }`}
        >
          <motion.div
            layout
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 165, damping: 24, mass: 0.95 }}
            className={`relative shrink-0 ${isNavCollapsed ? 'h-11 w-28' : 'h-20 w-64 md:h-24 md:w-80'}`}
          >
            <Image
              src="/Tom Logo.webp"
              alt="Tom Logo"
              fill
              className={`object-contain object-left transition-[filter] duration-200 ${isNavCollapsed ? 'brightness-0 invert' : ''}`}
              loading="eager"
              sizes={isNavCollapsed ? '112px' : '(max-width: 768px) 256px, 320px'}
            />
          </motion.div>

          <AnimatePresence initial={false} mode="popLayout">
            {isNavCollapsed ? (
              <motion.button
                key="menu-trigger"
                layout
                type="button"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={isMenuOpen}
                aria-controls="compact-navigation-menu"
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-[#86aaa6] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#86aaa6]"
              >
                <span className="sr-only">Menü</span>
                <span className="relative block h-4 w-5" aria-hidden="true">
                  <motion.span
                    animate={isMenuOpen ? { y: 7, rotate: 45 } : { y: 2, rotate: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    className="absolute left-0 top-0 h-px w-5 bg-current"
                  />
                  <motion.span
                    animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: reduceMotion ? 0 : 0.15 }}
                    className="absolute left-0 top-[7px] h-px w-5 bg-current"
                  />
                  <motion.span
                    animate={isMenuOpen ? { y: -7, rotate: -45 } : { y: -2, rotate: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    className="absolute bottom-0 left-0 h-px w-5 bg-current"
                  />
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="desktop-links"
                initial={reduceMotion ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                className={`hidden items-center gap-8 font-display text-sm font-light uppercase tracking-widest md:flex ${isLightSection ? '' : '[text-shadow:_0_2px_4px_rgba(0,0,0,0.5)]'}`}
              >
                <a href="#about" className="transition-colors hover:text-[#9f9f8c]">Über Mich</a>
                <a href="#services" className="transition-colors hover:text-[#9f9f8c]">Leistungen</a>
                <a href="#project-archive" className="transition-colors hover:text-[#9f9f8c]">Galerie</a>
                <Link href="/ratgeber" className="transition-colors hover:text-[#9f9f8c]">Ratgeber</Link>
                <button type="button" onClick={openContact} className="uppercase transition-colors hover:text-[#9f9f8c]">Kontakt</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {isNavCollapsed && isMenuOpen && (
            <motion.div
              id="compact-navigation-menu"
              initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 31 }}
              className="pointer-events-auto absolute left-1/2 top-[5.75rem] w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#181818] p-3 text-white shadow-[0_28px_70px_-24px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 pb-3 pt-2">
                <span className="font-display text-[10px] uppercase tracking-[0.28em] text-[#86aaa6]">Navigation</span>
                <span className="font-display text-[10px] tracking-[0.2em] text-white/35">TFM</span>
              </div>
              <div className="py-2">
                {[
                  { num: '01', label: 'Über mich', href: '#about' },
                  { num: '02', label: 'Leistungen', href: '#services' },
                  { num: '03', label: 'Galerie', href: '#project-archive' }
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="group grid min-h-12 grid-cols-[2.5rem_1fr] items-center rounded-xl px-4 transition-colors hover:bg-white/6 focus-visible:outline-2 focus-visible:outline-[#86aaa6]"
                  >
                    <span className="font-display text-[9px] tracking-[0.2em] text-[#86aaa6]">{item.num}</span>
                    <span className="font-display text-lg font-medium tracking-[-0.02em]">{item.label}</span>
                  </a>
                ))}
                <Link
                  href="/ratgeber"
                  onClick={() => setIsMenuOpen(false)}
                  className="group grid min-h-12 grid-cols-[2.5rem_1fr] items-center rounded-xl px-4 transition-colors hover:bg-white/6 focus-visible:outline-2 focus-visible:outline-[#86aaa6]"
                >
                  <span className="font-display text-[9px] tracking-[0.2em] text-[#86aaa6]">04</span>
                  <span className="font-display text-lg font-medium tracking-[-0.02em]">Ratgeber</span>
                </Link>
                <button
                  type="button"
                  onClick={(event) => {
                    setIsMenuOpen(false);
                    openContact(event);
                  }}
                  className="group grid min-h-12 w-full grid-cols-[2.5rem_1fr] items-center rounded-xl px-4 text-left transition-colors hover:bg-white/6 focus-visible:outline-2 focus-visible:outline-[#86aaa6]"
                >
                  <span className="font-display text-[9px] tracking-[0.2em] text-[#86aaa6]">05</span>
                  <span className="font-display text-lg font-medium tracking-[-0.02em]">Kontakt</span>
                </button>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  setIsMenuOpen(false);
                  openContact(event);
                }}
                className="conversion-cta mt-1 w-full rounded-full px-6 py-4 font-display text-xs uppercase tracking-[0.2em]"
              >
                Projekt anfragen
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <video
            ref={heroVideoRef}
            className="h-full w-full object-cover object-[42%_center] md:object-center"
            muted
            playsInline
            preload="auto"
            poster="/hero-tfm.webp"
            aria-hidden="true"
            onLoadedMetadata={(event) => {
              event.currentTarget.defaultPlaybackRate = 0.82;
              event.currentTarget.playbackRate = 0.82;
            }}
            onTimeUpdate={(event) => {
              if (!isHeroRevealed && event.currentTarget.currentTime >= 2.45) {
                event.currentTarget.pause();
                setIsHeroRevealed(true);
              }
            }}
            onEnded={() => setIsHeroRevealed(true)}
            onError={() => setIsHeroRevealed(true)}
          >
            <source src="/hero-intro-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
            <source src="/hero-intro.mp4" type="video/mp4" />
          </video>
        </div>

        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHeroRevealed ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-0 z-[1] bg-white/55 backdrop-blur-[1px]"
        />
        
        <motion.div 
          className="relative z-10 isolate max-w-4xl"
          initial="initial"
          animate={isHeroRevealed ? "animate" : "initial"}
          variants={stagger}
          aria-hidden={!isHeroRevealed}
          inert={!isHeroRevealed}
        >
          <div className="relative z-10">
          <motion.span variants={fadeIn} className="font-display text-[#3a3a3a] uppercase tracking-[0.3em] text-sm mb-6 block">
            Thomas Frenzel · Kreis Böblingen
          </motion.span>
          <motion.h1 variants={fadeIn} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-8 max-w-5xl mx-auto">
            <span className="relative inline-block bg-gradient-to-r from-[#212121] to-[#707070] bg-clip-text pb-1 text-transparent">
              Zuverlässige
              <motion.svg
                aria-hidden="true"
                viewBox="0 0 320 24"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-1 left-0 h-4 w-full overflow-visible"
              >
                <motion.path
                  d="M4 17 C82 5 232 5 316 15"
                  fill="none"
                  stroke="#212121"
                  strokeWidth="4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                  animate={isHeroRevealed ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.svg>
            </span><br/>
            <span className="bg-gradient-to-r from-[#212121] to-[#707070] bg-clip-text text-transparent">Montage oder Handwerksleistung gefällig?</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="font-body text-xl font-bold text-[#3a3a3a] max-w-2xl mx-auto mb-12">
            Persönlich, fachlich, regional.
            Mit dem Auge für das Detail
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-start justify-center gap-3">
            <div className="w-full sm:w-auto text-center">
              <div className="inline-flex w-full sm:w-auto">
                <a
                  href="https://wa.me/491709980942?text=Hallo%20Thomas%2C%20ich%20m%C3%B6chte%20dir%20ein%20Foto%20von%20meinem%20Projekt%20schicken."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-primary-cta conversion-cta inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-xs uppercase tracking-widest sm:w-auto"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Projektfoto per WhatsApp senden
                </a>
              </div>
              <p className="mt-2 text-[11px] font-bold text-[#3a3a3a]">
                Einfach klicken und per WhatsApp schicken.
              </p>
            </div>
            <a
              href="#gallery"
              className="hero-secondary-cta inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 border border-[#212121]/30 bg-white/35 text-[#212121] px-8 py-4 rounded-full font-display uppercase tracking-widest text-xs hover:border-[#212121] hover:bg-white/70 transition-colors"
            >
              <Images size={17} aria-hidden="true" />
              Meine Arbeiten
            </a>
          </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Trust Bar direkt unter Hero */}
      <section className="relative bg-[#212121] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6 md:py-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-0 md:divide-x md:divide-white/10">
            <div className="flex items-center gap-3 px-8 md:px-12">
              <span className="font-display text-[#9f9f8c] uppercase tracking-[0.2em] text-xs">Google Bewertungen</span>
              <span className="text-[#9f9f8c] text-sm tracking-wide">★★★★★</span>
            </div>
            <div className="flex items-center gap-3 px-8 md:px-12">
              <span className="font-display text-[#9f9f8c] uppercase tracking-[0.2em] text-xs">Anzahl Projekte</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-white">200+</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="relative bg-[#f0f0f0] py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative aspect-[4/5] bg-[#f0f0f0] rounded-sm overflow-hidden shadow-[0_32px_72px_-18px_rgba(33,33,33,0.58)]"
          >
            <Image src="/tom pic.png" alt="Thomas Frenzel" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <span className="font-display text-[#3a3a3a] uppercase tracking-[0.3em] text-xs mb-4 block">Der Mensch dahinter</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-[#212121]">Thomas Frenzel.</h2>
            <div className="w-12 h-px bg-[#9f9f8c] mb-8"></div>
            <p className="text-[#3a3a3a] text-lg leading-relaxed mb-6">
              Mein Name ist Thomas Frenzel und ich bin in Böblingen beheimatet. Meine Ausbildung zum Holzmechaniker habe ich im Jahr 2003 bei der Renz GmbH erfolgreich abgeschlossen. Im Jahr 2022 habe ich mich dazu entschieden, mich im Bereich Montage- und Handwerksarbeiten selbstständig zu machen.
            </p>
            <p className="text-[#3a3a3a] text-lg leading-relaxed mb-6">
              Mir ist wichtig, dass meine Arbeiten zuverlässig, sauber und ordentlich ausgeführt werden. Ich unterstütze meine Kunden bei Möbelmontage, Bodenverlegung, Türmontage, Innenausbau sowie kleineren Reparaturarbeiten.
            </p>
            <p className="text-[#3a3a3a] text-lg leading-relaxed">
              Als regionaler Handwerker bin ich hauptsächlich im Kreis Böblingen und Umgebung tätig. Der persönliche Kontakt zu meinen Kunden und eine faire Zusammenarbeit stehen für mich dabei im Mittelpunkt.
            </p>
          </motion.div>
        </div>
        </div>
      </section>

      <ServiceStack onContact={openContact} reduceMotion={reduceMotion} />

      {/* Process / Ablauf */}
      <section
        id="process"
        ref={processRef}
        className={reduceMotion ? 'relative bg-[#212121]' : 'relative h-[440svh] bg-[#212121]'}
      >
        <div
          className={
            reduceMotion
              ? 'relative flex min-h-svh items-center'
              : 'sticky top-0 flex h-svh min-h-[40rem] items-center overflow-hidden'
          }
        >
          <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-16 md:py-12">
            <div className="mx-auto mb-8 grid max-w-6xl gap-4 md:mb-10 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-16">
              <div>
                <span className="mb-3 block font-display text-xs uppercase tracking-[0.3em] text-[#9f9f8c]">Ablauf</span>
                <h2 className="font-display text-4xl font-bold leading-[0.98] text-white md:text-6xl">
                  Mein Prozess.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-[#9f9f8c] md:text-lg">
                Vier klare Schritte statt Baustellenchaos. Du weißt jederzeit, was als Nächstes passiert.
              </p>
            </div>

            <div className="relative mx-auto max-w-6xl">
              <div
                className="absolute bottom-0 left-[1.35rem] top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2"
                aria-hidden="true"
              />
              <motion.div
                style={
                  reduceMotion
                    ? undefined
                    : {
                        scaleY: processLineScale,
                        transformOrigin: 'top',
                        willChange: 'transform'
                      }
                }
                className="absolute bottom-0 left-[1.35rem] top-0 w-px bg-[#9f9f8c] md:left-1/2 md:-translate-x-1/2"
                aria-hidden="true"
              />

              <div className="relative space-y-2 md:space-y-1">
                {processSteps.map((step, index) => (
                  <ProcessStep
                    key={step.num}
                    step={step}
                    index={index}
                    progress={processRevealProgress}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery 1 — Sticky Horizontal Scroll */}



      <section id="gallery" ref={galleryRef} className="relative h-[420svh] bg-[#212121] md:h-[300svh]">
        <div className="sticky top-0 h-svh h-screen overflow-hidden flex items-start pt-20 md:h-screen md:pt-32">
          <motion.div style={{ x: galleryX, willChange: 'transform' }} className="flex w-max shrink-0 items-start gap-8 md:gap-10">
            
            {/* Intro Panel — oberhalb der Bilder lesbar machen */}
            <div className="flex h-[calc(100svh-6rem)] h-[calc(100vh-6rem)] w-screen shrink-0 items-start px-6 md:h-[calc(100vh-8rem)] md:px-16">
              <div className="mx-auto w-full max-w-[1500px]">
                <span className="mb-8 block font-[family-name:var(--font-dm-sans)] text-xs font-semibold uppercase tracking-[0.12em] text-[#9f9f8c] md:mb-12">
                  Detailarbeit
                </span>
                <div className="grid gap-10 md:grid-cols-[minmax(0,2.2fr)_minmax(18rem,0.8fr)] md:items-center md:gap-16">
              <h2 className="max-w-5xl [overflow-wrap:anywhere] font-[family-name:var(--font-sora)] text-[clamp(2.35rem,12vw,3.25rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:[overflow-wrap:normal] md:text-[clamp(3.25rem,7.4vw,7.5rem)]">
                    Die Wirkung liegt im Detail.
                  </h2>
                  <div className="border-l border-white/20 pl-6 pr-14 md:pl-8 md:pr-16">
                    <p className="max-w-sm font-[family-name:var(--font-dm-sans)] text-base leading-[1.75] text-[#9f9f8c] md:text-xl">
                      Kleine Veränderungen, klare Linien und handwerkliche Lösungen, die einen Raum dauerhaft besser machen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery 1 Images */}
            <div className="flex shrink-0 items-start gap-8 pr-[calc(50vw-150px)] md:gap-16 md:pr-32">
              <div className="w-[300px] md:w-[500px] aspect-[3/4] bg-white/5 relative overflow-hidden group mt-8 md:mt-0 shrink-0">
                <Image src="/Keller1-studio.png" alt="Ausgebauter Keller mit sauber ausgeführten Holzarbeiten" fill sizes="(max-width: 768px) 300px, 500px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="w-[300px] md:w-[500px] aspect-[3/4] bg-white/5 relative overflow-hidden group mt-8 md:mt-0 shrink-0">
                <Image src="/Keller2-studio.png" alt="Holzständerwerk in einem ausgebauten Keller" fill sizes="(max-width: 768px) 300px, 500px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="w-[300px] md:w-[500px] aspect-[3/4] bg-white/5 relative overflow-hidden group mt-8 md:mt-0 shrink-0">
                <Image src="/Keller3.png" alt="Passgenaue Holzkonstruktion im Keller" fill sizes="(max-width: 768px) 300px, 500px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Gallery 2 — horizontal on mobile and desktop */}
      <section id="gallery2" ref={gallery2Ref} className="relative mt-32 h-[420svh] bg-[#212121] md:mt-32 md:h-[300svh]">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden md:hidden">
          <motion.div style={{ x: gallery2X, willChange: 'transform' }} className="flex w-max shrink-0 items-center gap-8 pr-[calc(50vw-150px)]">
            <div className="flex h-svh w-screen shrink-0 items-center px-6">
              <div className="max-w-[22rem]">
                <span className="block font-[family-name:var(--font-dm-sans)] text-xs font-semibold uppercase tracking-[0.12em] text-[#9f9f8c]">Raumwirkung</span>
                <h2 className="mt-3 font-[family-name:var(--font-sora)] text-[clamp(2.35rem,10vw,3rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">Veränderung<br />darf leise sein.</h2>
                <p className="mt-5 font-[family-name:var(--font-dm-sans)] text-base leading-[1.7] text-[#b6b6a8]">Wenige gezielte Eingriffe reichen oft, damit ein Raum ruhiger, klarer und wieder stimmig wirkt.</p>
              </div>
            </div>
            <div className="relative aspect-[3/4] w-[300px] shrink-0 overflow-hidden bg-white/5">
              <Image src="/Verschonern1.jpg" alt="Sauber ausgeführte Verschönerungsarbeit im Innenraum" fill sizes="300px" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] w-[300px] shrink-0 overflow-hidden bg-white/5">
              <Image src="/Waschkuche.jpg" alt="Folierte Arbeitsplatte, sauber verlegt" fill sizes="300px" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] w-[300px] shrink-0 overflow-hidden bg-white/5">
              <video src="/Verschonern3-silent.mp4" poster="/Verschonern3.jpg" aria-label="Video einer ausgeführten Innenraumarbeit" className="h-full w-full object-cover" controls preload="none" muted loop playsInline />
            </div>
          </motion.div>
        </div>

        <div className="sticky top-0 hidden h-screen overflow-hidden md:flex md:items-start">
          <motion.div style={{ x: gallery2X, willChange: 'transform' }} className="flex w-max shrink-0 items-start gap-16">
            <div className="flex h-screen w-screen shrink-0 items-start px-16 pt-32">
              <div className="mx-auto w-full max-w-[1500px]">
                <span className="mb-12 block font-[family-name:var(--font-dm-sans)] text-xs font-semibold uppercase tracking-[0.12em] text-[#9f9f8c]">
                  Raumwirkung
                </span>
                <div className="grid gap-16 md:grid-cols-[minmax(0,2.2fr)_minmax(18rem,0.8fr)] md:items-center">
                  <h2 className="max-w-5xl font-[family-name:var(--font-sora)] text-[clamp(3.25rem,7.4vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white">
                    Veränderung darf leise sein.
                  </h2>
                  <div className="border-l border-white/20 pl-8 pr-16">
                    <p className="max-w-sm font-[family-name:var(--font-dm-sans)] text-xl leading-[1.75] text-[#9f9f8c]">
                      Wenige gezielte Eingriffe reichen oft, damit ein Raum ruhiger, klarer und wieder stimmig wirkt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-start justify-center gap-16">
              <div className="relative aspect-[3/4] w-[500px] shrink-0 overflow-hidden bg-white/5 group">
                <Image src="/Verschonern1.jpg" alt="Sauber ausgeführte Verschönerungsarbeit im Innenraum" fill sizes="500px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="relative mt-6 aspect-[3/4] w-[500px] shrink-0 overflow-hidden bg-white/5 group">
                <Image src="/Waschkuche.jpg" alt="Folierte Arbeitsplatte, sauber verlegt" fill sizes="500px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="relative aspect-[3/4] w-[500px] shrink-0 overflow-hidden bg-white/5">
                <video src="/Verschonern3-silent.mp4" poster="/Verschonern3.jpg" aria-label="Video einer ausgeführten Innenraumarbeit" className="h-full w-full object-cover" controls preload="none" muted loop playsInline />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery 3 — Simple Horizontal Scroll */}
      <section id="gallery3" className="relative bg-[#212121] py-32">
        <div className="mx-auto mb-16 w-full max-w-[1500px] px-6 md:mb-24 md:px-16">
          <span className="mb-8 block font-[family-name:var(--font-dm-sans)] text-xs font-semibold uppercase tracking-[0.12em] text-[#9f9f8c] md:mb-12">
            Treppen &amp; Geländer
          </span>
          <div className="grid gap-10 md:grid-cols-[minmax(0,2.2fr)_minmax(18rem,0.8fr)] md:items-center md:gap-16">
            <h2 className="max-w-5xl font-[family-name:var(--font-sora)] text-[clamp(2.35rem,10vw,3rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white md:text-[clamp(3.25rem,7.4vw,7.5rem)] md:leading-[0.9]">
              Übergänge, die alles zusammenhalten.
            </h2>
            <div className="border-l border-white/20 pl-6 pr-14 md:pl-8 md:pr-16">
              <p className="max-w-sm font-[family-name:var(--font-dm-sans)] text-base leading-[1.75] text-[#9f9f8c] md:text-xl">
                Saubere Anschlüsse und klare Linien geben Treppenhäusern Halt, Sicherheit und ein ruhiges Gesamtbild.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-14 overflow-hidden px-6 pb-8 md:flex-row md:justify-center md:gap-8 md:px-8">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }} className="relative mt-6 aspect-[3/4] w-full shrink-0 overflow-hidden bg-white/5 group md:mt-0 md:w-[min(27vw,350px)]">
            <Image src="/Treppenhaus1.jpg" alt="Handwerklich bearbeitetes Treppenhaus" fill sizes="(max-width: 768px) calc(100vw - 3rem), 350px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }} className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-white/5 group md:mt-8 md:w-[min(27vw,350px)]">
            <Image src="/Treppenhaus2.jpg" alt="Treppengeländer mit sauber ausgeführten Anschlüssen" fill sizes="(max-width: 768px) calc(100vw - 3rem), 350px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }} className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-white/5 group md:mt-0 md:w-[min(27vw,350px)]">
            <Image src="/Treppenhaus3.jpg" alt="Detailansicht einer Treppenarbeit" fill sizes="(max-width: 768px) calc(100vw - 3rem), 350px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </motion.div>
        </div>
      </section>

      {/* Gallery 4 — Sticky Horizontal Scroll */}
      <section id="gallery4" ref={gallery4Ref} className="relative h-[420svh] bg-[#212121] md:h-[300svh]">
        <div className="sticky top-0 flex h-svh items-start overflow-hidden pt-20 md:h-screen md:pt-0">
          <motion.div style={{ x: gallery4X, willChange: 'transform' }} className="flex w-max shrink-0 gap-8 md:gap-16 md:pr-32">
            
            {/* Intro Panel */}
            <div className="flex h-[calc(100svh-5rem)] w-screen shrink-0 items-start px-6 md:h-screen md:px-16 md:pt-32">
              <div className="mx-auto w-full max-w-[1500px]">
                <span className="mb-8 block font-[family-name:var(--font-dm-sans)] text-xs font-semibold uppercase tracking-[0.12em] text-[#9f9f8c] md:mb-12">
                  Akustikpaneele
                </span>
                <div className="grid gap-10 md:grid-cols-[minmax(0,2.2fr)_minmax(18rem,0.8fr)] md:items-center md:gap-16">
                  <h2 className="max-w-5xl font-[family-name:var(--font-sora)] text-[clamp(2.35rem,12vw,3.25rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white md:text-[clamp(3.25rem,7.4vw,7.5rem)]">
                    Ruhe bekommt eine klare Linie.
                  </h2>
                  <div className="border-l border-white/20 pl-6 pr-14 md:pl-8 md:pr-16">
                    <p className="max-w-sm font-[family-name:var(--font-dm-sans)] text-base leading-[1.75] text-[#9f9f8c] md:text-xl">
                      Präzise gesetzte Paneele ordnen die Wand, dämpfen den Raum und wirken wie ein Teil der Architektur.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery 4 Images */}
            <div className="flex shrink-0 items-start gap-8 pr-[calc(50vw-150px)] md:gap-16 md:pr-32">
              <div className="w-[300px] md:w-[500px] aspect-[3/4] bg-white/5 relative overflow-hidden group mt-8 md:mt-0 shrink-0">
                <Image src="/Akustik1.png" alt="Montierte Akustikpaneele im Innenraum" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 300px, 500px" />
              </div>
              <div className="w-[300px] md:w-[500px] aspect-[3/4] bg-white/5 relative overflow-hidden group mt-8 md:mt-16 shrink-0">
                <Image src="/Akustik2.jpg" alt="Akustik Panele 2" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 300px, 500px" />
              </div>
              <div className="w-[300px] md:w-[500px] aspect-[3/4] bg-white/5 relative overflow-hidden group mt-8 md:mt-0 shrink-0">
                <Image src="/Akustik3.jpg" alt="Akustik Panele 3" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 300px, 500px" />
              </div>
              <div className="w-[300px] md:w-[500px] aspect-[3/4] bg-white/5 relative overflow-hidden group mt-8 md:mt-16 shrink-0">
                <Image src="/Akustik4-studio.png" alt="Akustikpaneele in einem hellen Raum mit grünem Teppich" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 300px, 500px" />
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      <ProjectArchive />

      {/* Removed Contact Section */}
      {/* Testimonials */}
      <section id="testimonials" className="relative bg-[#212121] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="mb-16">
            <span className="font-display text-[#9f9f8c] uppercase tracking-[0.3em] text-xs mb-4 block">Kundenstimmen</span>
            <h2 className="relative inline-block font-display text-5xl md:text-7xl font-bold leading-[0.95] text-white">
              Zufriedene Kunden.
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-3 left-0 h-1 w-full origin-left rounded-full bg-[#9f9f8c] md:-bottom-4"
              />
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                onClick={() => setOpenReview(i)}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setOpenReview(i); } }}
                role="button"
                tabIndex={0}
                aria-label={`Bewertung von ${item.name} vollständig öffnen`}
                className="group flex cursor-pointer flex-col justify-between bg-white/10 border-l-4 border-[#9f9f8c] rounded-3xl p-6 md:p-8 border border-white/20 transition-colors hover:bg-white/[0.14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9f9f8c]"
              >
                <div>
                  <div className="mb-5 flex items-center gap-1 text-[#d8c49a]" aria-label="5 von 5 Sternen">
                    {Array.from({ length: 5 }, (_, star) => <span key={star} aria-hidden="true">★</span>)}
                  </div>
                  <p className="line-clamp-5 whitespace-pre-line text-white text-sm md:text-base leading-relaxed mb-3">&ldquo;{item.quote}&rdquo;</p>
                  <span className="text-xs text-[#9f9f8c] transition-colors group-hover:text-white">Bewertung vollständig lesen</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9f9f8c]/20 text-[#9f9f8c] font-display text-sm font-semibold">
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{item.name}</p>
                    <p className="text-white/80 text-xs">{item.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openReview !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4 py-6 md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="presentation"
            onClick={() => setOpenReview(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="review-dialog-title"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[min(86vh,48rem)] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#f4f1ea] p-6 text-[#212121] shadow-2xl md:p-10"
            >
              <button
                type="button"
                onClick={() => setOpenReview(null)}
                aria-label="Bewertung schließen"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-[#212121]/60 transition-colors hover:bg-black/10 hover:text-[#212121]"
              >
                ×
              </button>
              <div className="mb-6 pr-10">
                <div className="mb-3 flex items-center gap-1 text-[#b28a48]" aria-label="5 von 5 Sternen">
                  {Array.from({ length: 5 }, (_, star) => <span key={star} aria-hidden="true">★</span>)}
                </div>
                <h3 id="review-dialog-title" className="font-display text-2xl font-semibold leading-tight md:text-3xl">
                  {testimonials[openReview].name}
                </h3>
                <p className="mt-1 text-sm text-[#212121]/60">{testimonials[openReview].location}</p>
              </div>
              <p className="whitespace-pre-line text-sm leading-7 text-[#212121]/85 md:text-base">&ldquo;{testimonials[openReview].quote}&rdquo;</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ / Einwände */}
      <section id="faq" className="relative bg-[#212121] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-display text-[#9f9f8c] uppercase tracking-[0.3em] text-xs mb-4 block">FAQ / Einwände</span>
            <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] text-white mb-12 md:mb-16">
              Häufige Fragen.
            </h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {[
                { q: 'Welche Materialien verwendest du?', a: 'Ich arbeite ausschließlich mit ausgewählten, hochwertigen Hölzern und Materialien – passend zu deinem Projekt und Budget.' },
                { q: 'Muss ich selbst Material besorgen?', a: 'Nein, in der Regel übernehme ich die komplette Materialbeschaffung. Du musst dich um nichts kümmern.' },
                { q: 'Bietest du auch kurzfristige Termine an?', a: 'Bei kleineren Reparatur- oder Montagearbeiten ist oft auch ein kurzfristiger Termin möglich – einfach anfragen.' },
                { q: 'Was passiert, wenn mir die Planung nicht zusagt?', a: 'Die Beratung und Planung sind unverbindlich. Erst wenn alles passt, geht’s in die Umsetzung.' },
                { q: 'Übernimmst du auch die Entsorgung von Altmaterial?', a: 'Ja, auf Wunsch übernehme ich auch die fachgerechte Entsorgung von Altmaterial.' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenFaq(openFaq === i ? null : i); } }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={openFaq === i}
                  onKeyUp={() => {}}
                >
                  <div className="flex items-center justify-between py-6 md:py-8">
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-white pr-4">{item.q}</h3>
                    <span className="text-[#9f9f8c] text-2xl font-light transition-transform duration-300" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#9f9f8c] leading-relaxed text-sm md:text-base pb-6 md:pb-8">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Magnet — Kostenlose Holzpflegeanleitung */}
      <section id="praxisbuch" ref={leadMagnetRef} className="relative bg-[#9FA28F] py-24 md:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
          >
            <div className="flex flex-col gap-8">
              <div>
                <span className="font-display text-white uppercase tracking-[0.3em] text-xs mb-4 block">Gratis Download</span>
                <h2 className="font-display text-4xl font-bold leading-[0.95] text-white mb-6 [overflow-wrap:anywhere] sm:[overflow-wrap:normal] md:text-5xl">
                  Holzpflege leicht gemacht
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  Das vollständige Praxisbuch mit 32 Kapiteln zu Reinigung, Reparatur und dauerhaftem Holzschutz. E-Mail eingeben und das PDF direkt herunterladen.
                </p>
                <ul className="flex flex-col gap-3 text-white/80 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs">✓</span>
                    Pflegeintervalle für verschiedene Holzarten
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs">✓</span>
                    Die besten Hausmittel ohne Chemie
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs">✓</span>
                    Fehler vermeiden, die Holz dauerhaft schädigen
                  </li>
                </ul>
              </div>
              <div className="bg-[#252527] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/40">
                {!showDownload ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const email = (e.currentTarget as HTMLFormElement).email.value.trim();
                      if (email && email.includes("@")) {
                        setShowDownload(true);
                        triggerDownload();
                      }
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <label htmlFor="lead-email" className="block text-xs text-[#86868b] mb-2 font-display uppercase tracking-widest">
                        E-Mail-Adresse
                      </label>
                      <input
                        type="email"
                        id="lead-email"
                        name="email"
                        required
                        className="w-full bg-[#1d1d1f] border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#9FA28F] focus:ring-1 focus:ring-[#9FA28F] transition-all text-white placeholder:text-[#86868b]"
                        placeholder="name@beispiel.de"
                      />
                    </div>
                    <button
                      type="submit"
                      className="conversion-cta w-full rounded-full py-4 font-display text-sm uppercase tracking-widest"
                    >
                      Gratis als PDF herunterladen
                    </button>
                    <p className="text-[#86868b] text-xs text-center">
                      E-Mail eingeben. Der Download startet direkt.
                    </p>
                  </form>
                ) : (
                  <div className="flex flex-col items-center gap-4 py-6">
                    <div className="w-14 h-14 rounded-full bg-[#9FA28F]/20 text-[#9FA28F] flex items-center justify-center text-2xl">✓</div>
                    <h3 className="font-display text-2xl font-bold text-white">Fast geschafft</h3>
                    <p className="text-[#86868b] text-sm text-center">
                      Dein Praxisbuch sollte jetzt automatisch heruntergeladen werden.<br/>Falls nicht, klicke unten nochmal.
                    </p>
                    <button
                      type="button"
                      onClick={triggerDownload}
                      className="text-[#9FA28F] hover:text-white text-sm underline underline-offset-4 transition-colors"
                    >
                      Download erneut starten
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_32px_70px_-30px_rgba(0,0,0,0.65)]">
              <Image
                src="/holzpflege-werkbank-scene.webp"
                alt="Praxisbuch Holzpflege leicht gemacht auf einer Werkbank"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative bg-[#212121] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
          <span className="font-display text-[#9f9f8c] uppercase tracking-[0.3em] text-xs mb-4 block">Kontakt</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] text-white mb-8">
            Bereit für dein<br/>nächstes Projekt?
          </h2>
          <p className="text-[#9f9f8c] text-xl max-w-2xl mx-auto mb-12">
            Egal ob Reparatur, Montage oder individueller Ausbau – lass uns darüber sprechen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <button type="button" onClick={openContact} className="conversion-cta w-full rounded-full px-10 py-5 font-display text-sm font-bold uppercase tracking-widest sm:w-auto">
              Nachricht senden
            </button>
            <a href="https://wa.me/491709980942" target="_blank" rel="noopener noreferrer" className="conversion-cta inline-flex w-full items-center justify-center gap-3 rounded-full px-10 py-5 font-display text-sm uppercase tracking-widest sm:w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer bg-[#212121] text-white py-12 md:py-16 px-6 md:px-16 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-16 items-center">
          <div>
            <h3 className="font-display text-xs uppercase tracking-[0.3em] text-[#9f9f8c] mb-4">Sitemap</h3>
            <nav className="flex flex-col gap-2 text-sm text-[#9f9f8c]">
              <a href="#about" className="hover:text-white transition-colors">Über mich</a>
              <a href="#gallery" className="hover:text-white transition-colors">Leistungen</a>
              <a href="#project-archive" className="hover:text-white transition-colors">Galerie</a>
              <Link href="/ratgeber" className="hover:text-white transition-colors">Ratgeber</Link>
              <a href="#contact" className="hover:text-white transition-colors">Kontakt</a>
            </nav>
          </div>

          <div className="mx-auto">
            <AssembledFooterLogo reduceMotion={reduceMotion} />
          </div>

          <div className="md:text-right">
            <h3 className="font-display text-xs uppercase tracking-[0.3em] text-[#9f9f8c] mb-4">Rechtliches</h3>
            <div className="flex flex-col gap-2 text-sm text-[#9f9f8c]">
              <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            </div>
            <div className="flex gap-4 mt-4 text-[#9f9f8c] justify-end">
              <a href="https://www.instagram.com/tfmontage/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-2">
          <p className="text-[#9f9f8c] text-sm text-center">© 2026 Thomas Frenzel. Alle Rechte vorbehalten.</p>
          <p className="text-[#9f9f8c] text-sm text-center">
            Made in the Lab: <a href="https://www.greenlabz-studio.de/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#00d084] via-[#39e5a1] to-[#a8f1d5] bg-clip-text text-transparent transition-opacity hover:opacity-80">Green Labz Studio</a>.
          </p>
        </div>
      </footer>

      <CookieBanner isOpen={cookieConsent === null && cookieBannerRevealed} onClose={handleConsent} />
      <ContactModal isOpen={isContactModalOpen} origin={contactOrigin} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}
