import { ArrowUpRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared";
import { experience, person } from "@/content/portfolio";

const BASE = import.meta.env.BASE_URL;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pb-10 pt-8 sm:pb-12 sm:pt-10">
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
        <div className="min-w-0">
          <h1 id="hero-title" className="font-heading text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.75rem]">
            {person.name}
          </h1>
          <p className="mt-3 text-lg text-secondary">
            {person.title} <span aria-hidden>·</span> {person.focus}
          </p>

          <p className="mt-7 max-w-[42rem] font-heading text-[1.6rem] font-medium leading-[1.25] tracking-tight sm:text-[2rem]">
            {person.headline}
          </p>
          <p className="mt-5 max-w-[40rem] text-lg leading-relaxed text-secondary">{person.subline}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={person.resumePdf} download>
                <Download />
                Download resume
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`mailto:${person.email}`}>
                <Mail />
                Email
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
                <ArrowUpRight />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </div>

        {/* The image is absolutely positioned so the row height comes from the text column only. */}
        <div className="relative order-first h-60 w-48 sm:h-72 sm:w-60 lg:order-none lg:h-auto lg:w-full">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(60%_60%_at_70%_30%,color-mix(in_srgb,var(--signal-ui)_35%,transparent),transparent_70%)] blur-2xl"
          />
          <img
            src={`${BASE}portrait-720.webp`}
            srcSet={`${BASE}portrait-720.webp 720w, ${BASE}portrait.webp 1145w`}
            sizes="(min-width: 1024px) 304px, (min-width: 640px) 240px, 192px"
            width={1145}
            height={1374}
            alt="Portrait of Hosakota Venkata Naga Tharun"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full rounded-2xl object-cover object-[center_20%] shadow-[0_24px_50px_-28px_rgba(20,32,43,0.8)] ring-1 ring-line"
          />
          <p className="absolute inset-x-3 bottom-3 rounded-xl border border-white/15 bg-[#0E1620]/60 px-3 py-2 text-white backdrop-blur-md">
            <span className="block text-sm font-semibold leading-tight">{experience.role}</span>
            <span className="block text-xs leading-tight text-white/80">
              {experience.company} · since {experience.dates.split(" - ")[0]}
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
