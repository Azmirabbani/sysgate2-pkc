// src/lib/uiTheme.ts
export const ROLE_COLORS = {
  karyawanPKC: {
    icon: "bg-blue-600",
    tint: "bg-blue-50",
    ring: "ring-blue-100",
  },
  phlKontraktor: {
    icon: "bg-cyan-600",
    tint: "bg-cyan-50",
    ring: "ring-cyan-100",
  },
  praktikan: {
    icon: "bg-amber-600",
    tint: "bg-amber-50",
    ring: "ring-amber-100",
  },
  visitor: {
    icon: "bg-yellow-600",
    tint: "bg-yellow-50",
    ring: "ring-yellow-100",
  },
} as const;

export const SURFACE = {
  app: "bg-slate-50",
  card: "bg-white ring-1 ring-slate-200 shadow-sm",
  text: {
    primary: "text-slate-900",
    secondary: "text-slate-700",
    muted: "text-slate-500",
  },
};
