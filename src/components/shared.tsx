import { Info } from "lucide-react";
import { useId, type ReactNode } from "react";
import { projects } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export type Project = (typeof projects)[number];

export const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const DEMO_NOTE = "Illustrative simulation of the idea. Not the production system and no client data.";

export function getProject(id: string): Project {
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Error(`Unknown project: ${id}`);
  return project;
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[72rem] px-4 sm:px-6", className)}>{children}</div>;
}

export function Section({
  id,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("border-t border-line py-10 sm:py-12", className)}>
      <Container>
        <header className="max-w-[44rem]">
          <h2 id={`${id}-title`} className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-3 text-lg leading-relaxed text-secondary">{intro}</p>}
        </header>
        <div className="mt-6 sm:mt-8">{children}</div>
      </Container>
    </section>
  );
}

export function DemoNote({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-start gap-2 text-sm leading-snug text-secondary", className)}>
      <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>{DEMO_NOTE}</span>
    </p>
  );
}

export function DemoFrame({
  title,
  description,
  id,
  children,
  className,
}: {
  title: string;
  description?: ReactNode;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = useId();
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("rounded-xl border border-line bg-surface p-5 sm:p-6", className)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h4 id={headingId} className="font-heading text-[1.05rem] font-semibold tracking-tight">
          {title}
        </h4>
        <span className="text-sm text-secondary">Interactive demo</span>
      </div>
      {description && <p className="mt-2 max-w-[42rem] text-secondary">{description}</p>}
      <div className="mt-4">{children}</div>
      <DemoNote className="mt-4 border-t border-line pt-3" />
    </section>
  );
}