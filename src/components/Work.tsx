import type { ReactNode } from "react";
import { Label } from "semantic-ui-react";
import "semantic-ui-css/components/label.min.css";
import { FinancialFlow } from "@/components/FinancialFlow";
import { RoutingFlow } from "@/components/RoutingGraph";
import { Section, getProject, type Project } from "@/components/shared";
import { WorkatoLiveFlow } from "@/components/WorkatoFlow";

export function Work() {
  return (
    <Section id="work" title="Work" intro="Three systems built at Mouri Tech, each with a live view of how it works.">
      <div className="divide-y divide-line">
        <ProjectCard project={getProject("financial-statement-analyzer")} flow={<FinancialFlow />} />
        <ProjectCard project={getProject("multi-agent-assistant")} flow={<RoutingFlow />} />
        <ProjectCard project={getProject("workato-agents")} flow={<WorkatoLiveFlow />} />
      </div>
    </Section>
  );
}

function ProjectCard({ project, flow }: { project: Project; flow: ReactNode }) {
  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-name`}
      className="grid grid-cols-1 items-center gap-6 py-8 first:pt-0 last:pb-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12"
    >
      <div>
        <h3 id={`${project.id}-name`} className="font-heading text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-[2rem]">
          {project.name}
        </h3>
        <p className="mt-2 text-lg leading-relaxed text-secondary">{project.tagline}</p>

        <ul aria-label="Technology stack" className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Label as="li" key={item} className="tech-label">
              {item}
            </Label>
          ))}
        </ul>

        <h4 className="mt-6 font-heading text-base font-semibold">What I owned</h4>
        <ul className="mt-3 space-y-2.5">
          {project.owned.map((item) => (
            <li key={item} className="flex gap-3 leading-snug">
              <span aria-hidden className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-signal-ui" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {flow}
    </article>
  );
}
