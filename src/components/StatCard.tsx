"use client";

import React from "react";
import clsx from "clsx";

type IconEl = React.ElementType;

interface StatCardProps {
  title: string;
  value: number | string;
  icon: IconEl;
  /** Warna solid Tailwind, mis. "bg-blue-600", "bg-emerald-600" */
  color: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  className,
}: StatCardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl p-6 text-white shadow-strong",
        "transition-transform duration-300 will-change-transform",
        "hover:scale-[1.015]",
        color,
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-xl p-3 bg-white/20">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="min-w-0">
          <div className="uppercase text-sm font-semibold tracking-wide/relaxed opacity-95">
            {title}
          </div>
          <div className="mt-2 text-4xl font-black tracking-tight leading-none">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
        </div>
      </div>
    </div>
  );
}
