import { ArrowUpRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared";
import { experience, person } from "@/content/portfolio";

const BASE = import.meta.env.BASE_URL;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pb-10 pt-8 sm:pb-12 sm:pt-10">
      <Container>
        <div className="max-w-[46rem]">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <img
              src={`${BASE}portrait-720.webp`}
              srcSet={`${BASE}portrait-720.webp 720w, ${BASE}portrait.webp 1145w`}
              sizes="(min-width: 640px) 160px, 128px"
              width={1145}
              height={1374}
              alt="Portrait of Hosakota Venkata Naga Tharun"
              fetchPriority="high"
              className="h-[9.5rem] w-32 shrink-0 rounded-xl border border-line object-cover object-[center_15%] shadow-[0_18px_40px_-26px_rgba(20,32,43,0.7)] sm:h-48 sm:w-40"
            />
            <div>
              <h1 id="hero-title" className="font-heading text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.75rem]">
                {person.name}
              </h1>
              <p className="mt-3 text-lg text-secondary">
                {person.title} <span aria-hidden>·</span> {person.focus}
              </p>
            </div>
          </div>

          <p className="mt-7 font-heading text-[1.6rem] font-medium leading-[1.25] tracking-tight sm:text-[2rem]">
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

          <p className="mt-5 text-[0.98rem] text-secondary">
            {experience.role} at <span className="text-foreground">{experience.company}</span> since{" "}
            {experience.dates.split(" - ")[0]}
          </p>
        </div>
      </Container>
    </section>
  );
}
