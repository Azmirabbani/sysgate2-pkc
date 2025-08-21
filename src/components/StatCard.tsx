"use client";

import * as React from "react";

/** Komponen ikon dari Heroicons / SVG apa pun */
export type SvgIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface StatCardProps {
  title: string;
  value: number | string;
  icon: SvgIcon; // Heroicons OK
  bgClass: string; // contoh: "bg-blue-600" / "bg-[#009a44]"
  className?: string;
  heightPx?: number; // opsional: paksa tinggi kartu (px)
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  bgClass,
  className,
  heightPx,
}: StatCardProps) {
  return (
    <div
      className={[
        "rounded-2xl p-6 text-white shadow-strong flex flex-col",
        bgClass,
        className ?? "",
      ].join(" ")}
      style={heightPx ? { height: heightPx } : undefined}
    >
      {/* Header kiri atas: ikon + judul */}
      <div className="flex items-center gap-2">
        <span className="p-2 rounded-lg bg-white/20">
          <Icon className="w-6 h-6 text-white" />
        </span>
        <span className="uppercase text-base md:text-lg font-semibold tracking-wide opacity-95">
          {title}
        </span>
      </div>

      {/* Angka center & besar */}
      <div className="flex-1 flex items-center justify-center">
        <span className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
      </div>
    </div>
  );
}
