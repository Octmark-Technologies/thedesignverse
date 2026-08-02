"use client";

import { motion, useMotionValue, animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  ArrowDown,
  ArrowUp,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface StatItem {
  title: string;
  value: number;
  delta: number;
  positive: boolean;
  suffix?: string;
  format?: (v: number) => string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  sparkline: number[];
}

// ── Data ───────────────────────────────────────────────────────────────────────

const stats: StatItem[] = [
  {
    title: "Total Revenue",
    value: 892_200,
    delta: 12.4,
    positive: true,
    format: (v) => `$${(v / 1_000).toFixed(1)}K`,
    icon: <DollarSign className="size-4" />,
    color: "from-violet-600 to-purple-700",
    glow: "shadow-violet-500/30",
    sparkline: [30, 45, 38, 60, 55, 72, 68, 85, 78, 92],
  },
  {
    title: "Active Users",
    value: 12_847,
    delta: 8.1,
    positive: true,
    format: (v) => Math.round(v).toLocaleString(),
    icon: <Users className="size-4" />,
    color: "from-blue-600 to-cyan-600",
    glow: "shadow-blue-500/30",
    sparkline: [50, 42, 58, 63, 55, 70, 74, 68, 80, 88],
  },
  {
    title: "Conversion Rate",
    value: 3.68,
    delta: 0.4,
    positive: true,
    suffix: "%",
    format: (v) => `${v.toFixed(2)}%`,
    icon: <TrendingUp className="size-4" />,
    color: "from-emerald-600 to-teal-600",
    glow: "shadow-emerald-500/30",
    sparkline: [2.1, 2.8, 2.5, 3.1, 3.0, 3.4, 3.2, 3.6, 3.5, 3.7],
  },
  {
    title: "Churn Rate",
    value: 1.9,
    delta: -0.3,
    positive: false,
    suffix: "%",
    format: (v) => `${v.toFixed(1)}%`,
    icon: <Activity className="size-4" />,
    color: "from-rose-600 to-pink-600",
    glow: "shadow-rose-500/30",
    sparkline: [3.2, 2.9, 3.1, 2.7, 2.5, 2.4, 2.2, 2.0, 1.9, 1.9],
  },
];

// ── CSS animations injected once — all run on the compositor (transform/opacity only) ──

const CSS = `
@keyframes halo-orbit {
  0%   { transform: translate(0px,   0px); }
  25%  { transform: translate(200px, 0px); }
  50%  { transform: translate(200px, 120px); }
  75%  { transform: translate(0px,   120px); }
  100% { transform: translate(0px,   0px); }
}
@keyframes line-pulse {
  0%, 100% { opacity: 0.35; }
  50%       { opacity: 0.75; }
}
.halo-orbit {
  animation: halo-orbit 12s linear infinite;
  will-change: transform;
}
.line-pulse {
  animation: line-pulse 3s ease-in-out infinite;
  will-change: opacity;
}
@media (prefers-reduced-motion: reduce) {
  .halo-orbit, .line-pulse { animation: none; }
}
`;

// ── Animated Counter ────────────────────────────────────────────────────────────
// One-shot on mount — fires for 1.6 s then stops. Not a perf concern.

function AnimatedNumber({
  value,
  format,
  skip,
}: {
  value: number;
  format?: (v: number) => string;
  skip: boolean;
}) {
  const mv = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (skip) {
      if (ref.current) ref.current.textContent = format ? format(value) : String(Math.round(value));
      return;
    }
    const controls = animate(mv, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format ? format(v) : String(Math.round(v));
      },
    });
    return controls.stop;
  }, [value]);

  return <span ref={ref}>0</span>;
}

// ── Sparkline SVG — pure SVG, zero JS after render ─────────────────────────────

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const W = 80, H = 32;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * H}`)
    .join(" ");
  const stroke = positive ? "#34d399" : "#f87171";
  const fill   = positive ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-20 h-8" preserveAspectRatio="none">
      <polygon points={`${pts} ${W},${H} 0,${H}`} fill={fill} />
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.5"
        strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ── Stat Card ───────────────────────────────────────────────────────────────────

function StatCard({ stat, index, skipMotion }: { stat: StatItem; index: number; skipMotion: boolean }) {
  const isGoodDelta = stat.positive ? stat.delta > 0 : stat.delta < 0;

  return (
    <motion.div
      initial={skipMotion ? false : { opacity: 0, y: 20 }}
      animate={skipMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      // contain isolates paint/layout so the browser doesn't recalc siblings
      style={{ contain: "layout style paint" }}
      className={`relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br ${stat.color}`}
    >
      {/* Halo — position:absolute + CSS transform animation = compositor only, zero layout */}
      <div
        className="halo-orbit absolute top-3 left-3 w-12 h-12 rounded-full bg-white/10 blur-xl pointer-events-none"
        style={{ animationDelay: `${index * -3}s` }}   // stagger so 4 halos don't sync
      />

      {/* Solid bg — no backdrop-blur, avoids expensive composite layer per card */}
      <div className="relative flex flex-col gap-4 rounded-2xl bg-zinc-950 p-5 h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
            {stat.title}
          </span>
          <div className={`flex items-center justify-center size-8 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg ${stat.glow}`}>
            {stat.icon}
          </div>
        </div>

        {/* Value */}
        <div className="text-3xl font-bold text-white tracking-tight">
          <AnimatedNumber value={stat.value} format={stat.format} skip={skipMotion} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
            isGoodDelta ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
          }`}>
            {stat.delta > 0 ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
            {Math.abs(stat.delta)}{stat.suffix ?? ""}
          </span>
          <Sparkline data={stat.sparkline} positive={stat.positive} />
        </div>

        {/* Bottom accent line — CSS animation, not framer-motion */}
        <div className={`line-pulse absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.color}`} />
      </div>
    </motion.div>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────────

export default function AnalyticsDashboard() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Inject CSS animations once — no JS animation loop overhead */}
      <style>{CSS}</style>

      <div className="min-h-screen bg-zinc-950 text-white p-8">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: -10 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-zinc-500 mt-1">April 2026 · Real-time overview</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.title} stat={stat} index={i} skipMotion={!!prefersReduced} />
          ))}
        </div>
      </div>
    </>
  );
}
