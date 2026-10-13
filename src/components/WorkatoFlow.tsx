import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, Bot, Lock, ShieldQuestion, UserRound, Workflow, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DemoFrame } from "@/components/shared";
import { cn } from "@/lib/utils";

const PHASE_MS = 1600;
const HOLD_MS = 2400;

const CONTACTS = [
  { label: "Contact A", match: "Exact email match in Salesforce", advice: "Existing contact · score 82 · High priority" },
  { label: "Contact B", match: "Company-only match in Salesforce", advice: "New person at a known company · score 61 · Medium" },
];

export function WorkatoLiveFlow() {
  const reduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const [contact, setContact] = useState(0);
  const [phase, setPhase] = useState(-1);

  useEffect(() => {
    if (phase === -1 && inView) setPhase(0);
  }, [inView, phase]);

  useEffect(() => {
    if (!inView || phase < 0) return;
    const timer = setTimeout(
      () => {
        if (phase < 2) setPhase(phase + 1);
        else {
          setContact((c) => (c + 1) % CONTACTS.length);
          setPhase(0);
        }
      },
      phase < 2 ? PHASE_MS : HOLD_MS,
    );
    return () => clearTimeout(timer);
  }, [phase, inView]);

  const c = CONTACTS[contact];
  const pulse = !reduceMotion;

  return (
    <DemoFrame title="Live flow: the agent advises, the recipe acts">
      <div ref={ref}>
        <ol aria-label="Lead qualification flow">
          <FlowNode icon={UserRound} title={`${c.label} · HubSpot`} active={phase === 0} reached={phase >= 0} pulse={pulse}>
            {c.match}
          </FlowNode>
          <Connector reached={phase >= 1} />
          <FlowNode
            icon={Bot}
            title="LeadPilot AI · advises"
            active={phase === 1}
            reached={phase >= 1}
            pulse={pulse}
            aside={
              <span className="inline-flex items-center gap-1 text-xs text-secondary">
                <Lock aria-hidden className="size-3" /> No write access
              </span>
            }
          >
            {phase >= 1 ? c.advice : "Waiting for context"}
          </FlowNode>
          <Connector reached={phase >= 2} />
          <FlowNode icon={Workflow} title="Workato recipe · acts" active={phase === 2} reached={phase >= 2} pulse={pulse}>
            {phase >= 2 ? "Updates Salesforce, creates a task, sends the email" : "Waiting for a recommendation"}
          </FlowNode>
        </ol>

        <DeleteApproval />
      </div>
    </DemoFrame>
  );
}

function FlowNode({
  icon: Icon,
  title,
  active,
  reached,
  pulse,
  aside,
  children,
}: {
  icon: LucideIcon;
  title: string;
  active: boolean;
  reached: boolean;
  pulse: boolean;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <li
      aria-current={active ? "step" : undefined}
      className={cn(
        "flex items-start gap-3 rounded-lg border px-3 py-2.5 transition-all duration-500",
        active ? "border-signal-ui bg-tint shadow-[0_0_0_4px_color-mix(in_srgb,var(--signal-ui)_14%,transparent)]" : "border-line bg-background",
        !reached && "opacity-50",
      )}
    >
      <span className="relative mt-0.5 flex size-4 shrink-0 items-center justify-center">
        {active && pulse && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-signal-ui"
            initial={{ scale: 1, opacity: 0.45 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut", repeat: Infinity }}
          />
        )}
        <Icon aria-hidden className={cn("relative size-4", active ? "text-signal-ui" : "text-secondary")} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-2">
          <p className="font-heading text-[0.95rem] font-semibold">{title}</p>
          {aside}
        </div>
        <p className="text-sm text-secondary">{children}</p>
      </div>
    </li>
  );
}

function Connector({ reached }: { reached: boolean }) {
  return (
    <li aria-hidden className="flex justify-center py-0.5">
      <ArrowDown className={cn("size-3.5 transition-colors duration-500", reached ? "text-signal-ui" : "text-line")} />
    </li>
  );
}

type ApprovalState = "idle" | "asking" | "approved" | "cancelled";

function DeleteApproval() {
  const [state, setState] = useState<ApprovalState>("idle");
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state === "asking") questionRef.current?.focus();
    if (state === "approved" || state === "cancelled") {
      const timer = setTimeout(() => setState("idle"), 4000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="mt-4 border-t border-line pt-4" aria-live="polite">
      <p className="font-heading text-[0.95rem] font-semibold">Outlook agent: approval before delete</p>

      {state === "idle" && (
        <Button size="sm" variant="outline" className="mt-2" onClick={() => setState("asking")}>
          Ask agent to delete “Weekly newsletter”
        </Button>
      )}

      {state === "asking" && (
        <div
          ref={questionRef}
          tabIndex={-1}
          role="alertdialog"
          aria-labelledby="delete-question"
          className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-signal-ui bg-tint px-3 py-2.5"
        >
          <p id="delete-question" className="flex items-center gap-2 text-[0.95rem] font-semibold">
            <ShieldQuestion aria-hidden className="size-4 text-signal-ui" />
            Are you sure?
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setState("approved")}>
              Yes, delete
            </Button>
            <Button size="sm" variant="outline" onClick={() => setState("cancelled")}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {(state === "approved" || state === "cancelled") && (
        <p className="mt-2 text-[0.95rem]">
          {state === "approved" ? "Approved. The delete email recipe ran." : "Cancelled. Nothing was deleted."}
        </p>
      )}
    </div>
  );
}
