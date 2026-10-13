import { motion, useInView, useReducedMotion } from "framer-motion";
import { BellRing, Calculator, CloudSun, FileText, MessageCircle, Search, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DemoFrame } from "@/components/shared";

type Agent = { label: string; icon: LucideIcon; angle: number };

const AGENTS: Agent[] = [
  { label: "Calculator", icon: Calculator, angle: 50 },
  { label: "Weather", icon: CloudSun, angle: 105 },
  { label: "HR policy", icon: FileText, angle: 155 },
  { label: "Search", icon: Search, angle: 205 },
  { label: "Reminder", icon: BellRing, angle: 255 },
  { label: "Smalltalk", icon: MessageCircle, angle: 310 },
];

const SHORT_CIRCUIT = "A priority rule matched, so the router's LLM call is skipped.";

const QUERIES = [
  { text: "Can I carry forward unused leave?", agent: 2, note: "Answers from policy documents with hybrid retrieval." },
  { text: "What is 18% of 2450?", agent: 0, note: SHORT_CIRCUIT },
  { text: "Will it rain in Hyderabad tomorrow?", agent: 1, note: "Context-aware routing picks the weather agent." },
  { text: "Remind ravi@example.com at 5 pm", agent: 4, note: "Asks “Are you sure?” before the reminder is sent." },
  { text: "Find the latest LangGraph release notes", agent: 3, note: "Context-aware routing picks the search agent." },
  { text: "Hi, good morning", agent: 5, note: SHORT_CIRCUIT },
];

const HOLD_MS = 2600;
const CX = 280;
const CY = 168;
const RADIUS_X = 215;
const RADIUS_Y = 112;
const QUERY_Y = 30;
const ROUTER_R = 32;
const NODE_R = 22;

function position(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + RADIUS_X * Math.sin(rad), y: CY - RADIUS_Y * Math.cos(rad) };
}

const centered = { transformBox: "fill-box", transformOrigin: "center" } as const;

export function RoutingFlow() {
  const reduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [arrived, setArrived] = useState(false);

  const query = QUERIES[index];
  const target = position(AGENTS[query.agent].angle);
  const queryBottom = QUERY_Y + 18;
  const animate = started && !reduceMotion;

  useEffect(() => {
    if (inView && !started) setStarted(true);
  }, [inView, started]);

  useEffect(() => {
    if (started && reduceMotion && !arrived) setArrived(true);
  }, [started, reduceMotion, arrived]);

  useEffect(() => {
    if (!arrived || !inView) return;
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % QUERIES.length);
      setArrived(false);
    }, HOLD_MS);
    return () => clearTimeout(timer);
  }, [arrived, inView, index]);

  return (
    <DemoFrame title="Live routing: query → router → agent">
      <div ref={ref}>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-md border border-line bg-background px-3 py-2">
          <span className="text-sm text-secondary">Query {index + 1} of {QUERIES.length}</span>
          <span className="font-mono text-[0.82rem]">“{query.text}”</span>
        </div>

        <svg viewBox="0 0 560 330" role="img" aria-labelledby="routing-title routing-desc" className="mt-3 block h-auto w-full">
          <title id="routing-title">Agent routing graph</title>
          <desc id="routing-desc">
            A query enters a context-aware router that dispatches it to one of six specialized agents: calculator,
            weather, HR policy, search, reminder, and smalltalk.
          </desc>
          <defs>
            <filter id="agent-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>

          <line x1={CX} y1={queryBottom} x2={CX} y2={CY} className="stroke-line" strokeWidth={1.5} />
          {AGENTS.map((agent) => {
            const p = position(agent.angle);
            return (
              <line key={agent.label} x1={CX} y1={CY} x2={p.x} y2={p.y} className="stroke-line" strokeWidth={1.5} strokeDasharray="3 6" />
            );
          })}

          {started && (
            <g key={index}>
              <motion.line
                x1={CX}
                y1={queryBottom}
                x2={CX}
                y2={CY}
                className="stroke-signal-ui"
                strokeWidth={2.25}
                strokeLinecap="round"
                initial={{ pathLength: animate ? 0 : 1 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              />
              <motion.line
                x1={CX}
                y1={CY}
                x2={target.x}
                y2={target.y}
                className="stroke-signal-ui"
                strokeWidth={2.25}
                strokeLinecap="round"
                initial={{ pathLength: animate ? 0 : 1 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.3, duration: 0.8, ease: "easeInOut" }}
              />
            </g>
          )}

          <rect x={CX - 46} y={QUERY_Y - 18} width={92} height={36} rx={18} className="fill-surface stroke-signal-ui" strokeWidth={1.5} />
          <text x={CX} y={QUERY_Y + 5} textAnchor="middle" className="fill-foreground font-body text-[15px] font-semibold">
            Query
          </text>

          {animate && (
            <motion.circle
              key={`router-${index}`}
              cx={CX}
              cy={CY}
              r={ROUTER_R}
              className="fill-none stroke-signal-ui"
              strokeWidth={2}
              style={centered}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
              transition={{ delay: 1.1, duration: 0.9, ease: "easeOut" }}
            />
          )}
          <circle cx={CX} cy={CY} r={ROUTER_R} className="fill-tint stroke-signal-ui" strokeWidth={2} />
          <text x={CX} y={CY + 5} textAnchor="middle" className="fill-foreground font-body text-[15px] font-semibold">
            Router
          </text>

          {AGENTS.map((agent, i) => {
            const p = position(agent.angle);
            const isActive = i === query.agent && arrived;
            const Icon = agent.icon;
            return (
              <g key={agent.label}>
                {isActive && (
                  <>
                    <circle cx={p.x} cy={p.y} r={NODE_R + 6} className="fill-signal-ui opacity-45" filter="url(#agent-glow)" />
                    {!reduceMotion && (
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r={NODE_R}
                        className="fill-none stroke-signal-ui"
                        strokeWidth={1.5}
                        style={centered}
                        animate={{ scale: [1, 1.5], opacity: [0.55, 0] }}
                        transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity, repeatDelay: 0.3 }}
                      />
                    )}
                  </>
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={NODE_R}
                  className={isActive ? "fill-tint stroke-signal-ui transition-colors duration-500" : "fill-surface stroke-line transition-colors duration-500"}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                <Icon
                  aria-hidden
                  x={p.x - 10}
                  y={p.y - 10}
                  width={20}
                  height={20}
                  strokeWidth={1.75}
                  className={isActive ? "text-signal-ui" : "text-secondary"}
                />
                <text
                  x={p.x}
                  y={p.y + NODE_R + 19}
                  textAnchor="middle"
                  className={isActive ? "fill-foreground font-body text-[16px] font-semibold" : "fill-secondary font-body text-[16px]"}
                >
                  {agent.label}
                </text>
              </g>
            );
          })}

          {animate && !arrived && (
            <motion.circle
              key={`dot-${index}`}
              r={6}
              className="fill-signal-ui"
              initial={{ cx: CX, cy: queryBottom }}
              animate={{ cx: [CX, CX, CX, target.x], cy: [queryBottom, CY, CY, target.y] }}
              transition={{ delay: 0.3, duration: 1.8, times: [0, 0.44, 0.56, 1], ease: "easeInOut" }}
              onAnimationComplete={() => setArrived(true)}
            />
          )}
        </svg>

        <p className="mt-1 min-h-[3rem] text-[0.95rem] text-secondary" aria-live="polite">
          {arrived ? (
            <>
              <span className="font-semibold text-foreground">{AGENTS[query.agent].label} agent.</span> {query.note}
            </>
          ) : (
            "Routing…"
          )}
        </p>

      </div>
    </DemoFrame>
  );
}
