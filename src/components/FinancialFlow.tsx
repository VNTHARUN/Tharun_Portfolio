import { motion, useInView, useReducedMotion } from "framer-motion";
import { Activity, Binary, Bot, FileText, Images, ListChecks, Zap, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DemoFrame } from "@/components/shared";
import { cn } from "@/lib/utils";

const STAGE_MS = 1500;
const HOLD_MS = 2400;

type Stage = { icon: LucideIcon; title: string; detail: string };

const STAGES: Stage[] = [
  { icon: Images, title: "Statement images", detail: "A client batch arrives, for example 42 financial statement images." },
  { icon: Binary, title: "Base64", detail: "Each image is base64-encoded for the API request." },
  { icon: Zap, title: "Azure Function", detail: "Serverless Python backend, authenticated with managed identity." },
  { icon: Bot, title: "Two agents", detail: "Azure AI Foundry agents (GPT-4.1 + code interpreter): odd images to agent 1, even to agent 2." },
  { icon: ListChecks, title: "Extract · verify · summarize", detail: "3-phase prompt pipeline; verification enforces data-fidelity rules." },
  { icon: FileText, title: "Structured summary", detail: "The output: a structured summary for each statement." },
];

export function FinancialFlow() {
  const reduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const [stage, setStage] = useState(-1);
  const last = STAGES.length - 1;

  useEffect(() => {
    if (stage === -1 && inView) setStage(0);
  }, [inView, stage]);

  useEffect(() => {
    if (!inView || stage < 0) return;
    const timer = setTimeout(() => setStage(stage < last ? stage + 1 : 0), stage === last ? HOLD_MS : STAGE_MS);
    return () => clearTimeout(timer);
  }, [stage, inView, last]);

  const current = STAGES[Math.max(stage, 0)];

  return (
    <DemoFrame title="How a batch becomes a summary">
      <div ref={ref}>
        <ol aria-label="Processing pipeline" className="grid grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-6">
          {STAGES.map((s, i) => {
            const state = i < stage ? "done" : i === stage ? "active" : "pending";
            const Icon = s.icon;
            return (
              <li key={s.title} aria-current={state === "active" ? "step" : undefined} className="relative flex flex-col items-center text-center">
                {i < last && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-[calc(50%+1.5rem)] top-5 hidden h-px w-[calc(100%-3rem+0.5rem)] transition-colors duration-500 sm:block",
                      i < stage ? "bg-signal-ui" : "bg-line",
                    )}
                  />
                )}
                {state === "active" && !reduceMotion && (
                  <motion.span
                    key={stage}
                    aria-hidden
                    className="absolute top-0 size-10 rounded-full border-2 border-signal-ui"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 1.9, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", repeat: Infinity }}
                  />
                )}
                <span
                  className={cn(
                    "relative flex size-10 items-center justify-center rounded-full border transition-all duration-500",
                    state === "active" &&
                      "scale-110 border-signal-ui bg-tint text-signal-ui shadow-[0_0_0_5px_color-mix(in_srgb,var(--signal-ui)_16%,transparent)]",
                    state === "done" && "border-signal-ui bg-surface text-signal-ui",
                    state === "pending" && "border-line bg-surface text-secondary",
                  )}
                >
                  <Icon aria-hidden className="size-[1.1rem]" strokeWidth={1.75} />
                </span>
                <span className={cn("mt-2 text-[0.8rem] leading-tight", state === "pending" ? "text-secondary" : "font-semibold text-foreground")}>
                  {s.title}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-5 h-1 overflow-hidden rounded-full bg-line" aria-hidden>
          <div
            className="h-full rounded-full bg-signal-ui transition-[width] duration-700 ease-out"
            style={{ width: `${((Math.max(stage, 0) + 1) / STAGES.length) * 100}%` }}
          />
        </div>

        <motion.div
          key={stage}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-3 min-h-[4.5rem] rounded-lg border border-line bg-background px-4 py-3"
          aria-live="polite"
        >
          <p className="font-heading text-[0.95rem] font-semibold">
            {stage < 0 ? "Waiting for a batch" : `${stage + 1}. ${current.title}`}
          </p>
          {stage >= 0 && <p className="text-[0.92rem] text-secondary">{current.detail}</p>}
        </motion.div>

        <p className="mt-3 flex items-center gap-2 text-sm text-secondary">
          <Activity aria-hidden className="size-4" />
          Runs are monitored in Azure Application Insights.
        </p>
      </div>
    </DemoFrame>
  );
}
