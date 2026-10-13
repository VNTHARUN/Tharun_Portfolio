import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Briefcase,
  Check,
  Cloud,
  Copy,
  Database,
  Download,
  Mail,
  Network,
  Search,
  Server,
  Sparkles,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared";
import { education, experience, person, projects, skillNotes, skills } from "@/content/portfolio";
import { cn } from "@/lib/utils";

type SkillGroup = keyof typeof skills;

const GROUP_STYLE: Record<SkillGroup, { icon: LucideIcon; span: string }> = {
  "Generative AI": { icon: Sparkles, span: "lg:col-span-2" },
  "LLMs and models": { icon: BrainCircuit, span: "" },
  "Agent and LLM frameworks": { icon: Network, span: "" },
  Retrieval: { icon: Search, span: "" },
  Cloud: { icon: Cloud, span: "" },
  "Backend and data": { icon: Server, span: "" },
  "Automation and tooling": { icon: Workflow, span: "md:col-span-2" },
};

function useFadeUp(index: number) {
  const reduceMotion = useReducedMotion() ?? false;
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.45, delay: (index % 3) * 0.08, ease: "easeOut" },
  } as const;
}

export function Skills() {
  return (
    <Section id="skills" title="Skills" intro="The tools and techniques I work with, grouped by what I use them for.">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(Object.entries(skills) as [SkillGroup, string[]][]).map(([group, items], i) => (
          <SkillCard key={group} group={group} items={items} index={i} />
        ))}
      </ul>
    </Section>
  );
}

function SkillCard({ group, items, index }: { group: SkillGroup; items: string[]; index: number }) {
  const fade = useFadeUp(index);
  const { icon: Icon, span } = GROUP_STYLE[group];
  return (
    <motion.li
      {...fade}
      className={cn("rounded-xl border border-line bg-surface p-5 transition-colors hover:border-signal-ui/60", span)}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-tint text-signal-ui">
          <Icon aria-hidden className="size-5" strokeWidth={1.75} />
        </span>
        <h3 className="font-heading text-lg font-semibold tracking-tight">{group}</h3>
      </div>
      <p className="mt-3 leading-relaxed text-secondary">{skillNotes[group]}</p>
      <ul aria-label={`${group} skills`} className="mt-4 flex flex-wrap gap-2">
        {items.map((skill) => (
          <li key={skill} className="rounded-md border border-line bg-background px-2.5 py-0.5 text-[0.95rem]">
            {skill}
          </li>
        ))}
      </ul>
    </motion.li>
  );
}

const HIGHLIGHT_ICONS: LucideIcon[] = [Database, Network, Server, Bot, Wrench, Users];

export function Experience() {
  const fade = useFadeUp(0);
  return (
    <Section id="experience" title="Experience">
      <motion.article {...fade} className="overflow-hidden rounded-2xl border border-line bg-surface">
        <header className="flex flex-col gap-5 border-b border-line p-5 sm:p-7 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-signal text-white">
              <Briefcase aria-hidden className="size-6" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="font-heading text-2xl font-semibold tracking-tight">{experience.role}</h3>
              <p className="text-lg text-secondary">{experience.company}</p>
            </div>
          </div>

          <dl className="flex items-center gap-6">
            <div>
              <dt className="sr-only">Dates</dt>
              <dd className="font-mono text-sm text-secondary">{experience.dates}</dd>
              <dd className="mt-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-tint px-2.5 py-0.5 text-xs font-semibold text-signal-text">
                  <span aria-hidden className="size-1.5 rounded-full bg-signal-ui" />
                  Current role
                </span>
              </dd>
            </div>
            <div className="border-l border-line pl-6">
              <dt className="sr-only">Experience</dt>
              <dd className="font-heading text-4xl font-semibold leading-none tracking-tight text-signal-text">
                {experience.years}
              </dd>
              <dd className="mt-1 text-sm text-secondary">years of experience</dd>
            </div>
          </dl>
        </header>

        <div className="p-5 sm:p-7">
          <p className="max-w-[50rem] text-lg leading-relaxed">{experience.summary}</p>

          <ul className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {experience.highlights.map((item, i) => {
              const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
              return (
                <li key={item.title} className="bg-surface p-5 transition-colors hover:bg-tint">
                  <Icon aria-hidden className="size-5 text-signal-ui" strokeWidth={1.75} />
                  <h4 className="mt-3 font-heading text-base font-semibold">{item.title}</h4>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-secondary">{item.detail}</p>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.95rem] text-secondary">
            <span>Key projects</span>
            {projects.map((project) => (
              <a
                key={project.id}
                href={`#${project.id}`}
                className="inline-flex items-center gap-1 font-medium text-signal-text underline-offset-4 hover:underline"
              >
                {project.name}
                <ArrowDownRight aria-hidden className="size-3.5" />
              </a>
            ))}
          </p>
        </div>
      </motion.article>
    </Section>
  );
}

export function EducationContact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section aria-label="Education and contact" className="border-t border-line py-10 sm:py-12">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div id="education">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Education</h2>
          <div className="mt-6">
            <p className="font-mono text-sm text-secondary">{education.years}</p>
            <h3 className="mt-2 font-heading text-xl font-semibold leading-snug tracking-tight">{education.degree}</h3>
            <p className="mt-2 text-lg text-secondary">{education.school}</p>
            <p className="mt-2 text-secondary">Percentage: {education.percentage}</p>
          </div>
        </div>

        <div id="contact">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Contact</h2>
          <ul className="mt-6 border-b border-line">
            <li className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-4">
              <a href={`mailto:${person.email}`} className="flex items-center gap-3 text-lg hover:text-signal-text">
                <Mail aria-hidden className="size-5 text-secondary" />
                {person.email}
              </a>
              <Button variant="ghost" size="sm" onClick={copyEmail} aria-live="polite">
                {copied ? <Check /> : <Copy />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </li>
            <li className="border-t border-line py-4">
              <a
                href={person.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg hover:text-signal-text"
              >
                <ArrowUpRight aria-hidden className="size-5 text-secondary" />
                LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li className="border-t border-line py-4">
              <a href={person.resumePdf} download className="flex items-center gap-3 text-lg hover:text-signal-text">
                <Download aria-hidden className="size-5 text-secondary" />
                Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-col gap-3 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {person.name}
        </p>
        <a href="#top" className="hover:text-foreground">
          Back to top
        </a>
      </Container>
    </footer>
  );
}
