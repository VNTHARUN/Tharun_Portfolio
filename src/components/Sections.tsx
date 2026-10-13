import { ArrowDownRight, ArrowUpRight, Check, Copy, Download, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container, Section, getProject } from "@/components/shared";
import { education, experience, person, projects, skills } from "@/content/portfolio";

const SKILL_PROJECTS: Record<string, string[]> = {
  "Multi-Agent Systems": ["multi-agent-assistant"],
  "Prompt Engineering": ["financial-statement-analyzer"],
  RAG: ["multi-agent-assistant"],
  "Hybrid Search": ["multi-agent-assistant"],
  LangGraph: ["multi-agent-assistant"],
  LangChain: ["multi-agent-assistant"],
  FAISS: ["multi-agent-assistant"],
  BM25: ["multi-agent-assistant"],
  "Cross-Encoder Reranking": ["multi-agent-assistant"],
  "Azure OpenAI": ["multi-agent-assistant"],
  "Azure AI Foundry Agents": ["financial-statement-analyzer"],
  "Azure Functions": ["financial-statement-analyzer"],
  "Azure Identity/AD": ["financial-statement-analyzer"],
  "Application Insights": ["financial-statement-analyzer"],
  Python: ["financial-statement-analyzer", "multi-agent-assistant"],
  FastAPI: ["multi-agent-assistant"],
  Workato: ["workato-agents"],
};

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      intro="Linked skills jump to the project where they are used."
    >
      <dl className="border-b border-line">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="grid grid-cols-1 gap-x-10 gap-y-2 border-t border-line py-4 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]">
            <dt className="font-heading text-lg font-semibold tracking-tight">{group}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-2 gap-y-2">
                {items.map((skill) => {
                  const used = SKILL_PROJECTS[skill];
                  if (!used) {
                    return (
                      <li key={skill} className="rounded-md border border-line px-2.5 py-0.5 text-[0.98rem] text-secondary">
                        {skill}
                      </li>
                    );
                  }
                  const names = used.map((id) => getProject(id).name).join(", ");
                  return (
                    <li key={skill}>
                      <a
                        href={`#${used[0]}`}
                        title={`Used in ${names}`}
                        className="inline-flex items-center gap-1 rounded-md border border-signal-ui/50 bg-tint px-2.5 py-0.5 text-[0.98rem] text-foreground transition-colors hover:border-signal-ui"
                      >
                        {skill}
                        <ArrowDownRight aria-hidden className="size-3.5 text-signal-text" />
                        <span className="sr-only">(used in {names})</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]">
        <p className="font-mono text-sm text-secondary md:pt-1.5">{experience.dates}</p>
        <div>
          <h3 className="font-heading text-2xl font-semibold tracking-tight">{experience.role}</h3>
          <p className="mt-1 text-lg text-secondary">{experience.company}</p>
          <ul className="mt-5 border-b border-line">
            {projects.map((project) => (
              <li key={project.id} className="grid grid-cols-1 gap-1 border-t border-line py-5 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-8">
                <a href={`#${project.id}`} className="font-heading text-[1.05rem] font-semibold text-signal-text underline-offset-4 hover:underline">
                  {project.name}
                </a>
                <p className="leading-relaxed text-secondary">{project.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
