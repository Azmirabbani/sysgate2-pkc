"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

// Heroicons (solid)
import {
  UsersIcon,
  UserGroupIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

import {
  CAPACITY_MAX,
  initialDashboardData,
  sumTotalInside,
  type DashboardCategories,
} from "../data/dashboardData";

/* ===== tinggi hero responsif terhadap viewport ===== */
function useHeroHeight() {
  const [h, setH] = useState(300);
  useEffect(() => {
    const calc = () => {
      const vh = window.innerHeight || 900;
      // ~32% tinggi layar, min 260, max 420
      const target = Math.max(260, Math.min(420, Math.floor(vh * 0.32)));
      setH(target);
    };
    calc();
    window.addEventListener("resize", calc);
    document.addEventListener("fullscreenchange", calc);
    return () => {
      window.removeEventListener("resize", calc);
      document.removeEventListener("fullscreenchange", calc);
    };
  }, []);
  return h;
}

type Category = keyof DashboardCategories;
const CATEGORIES: Category[] = [
  "karyawanPKC",
  "phlKontraktor",
  "praktikan",
  "visitor",
];

export default function Dashboard() {
  const [data, setData] = useState<DashboardCategories>(initialDashboardData);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [lastEntry, setLastEntry] = useState<Date | null>(null);
  const [lastExit, setLastExit] = useState<Date | null>(null);

  // dummy live update
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const total = sumTotalInside(prev);
        const bump = Math.random() < 0.6 ? 1 : -1;
        const next = { ...prev };

        if (bump > 0) {
          if (total >= CAPACITY_MAX) return prev;
          const cat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
          next[cat] = (next[cat] as number) + 1;
          setLastEntry(new Date());
        } else {
          if (total <= 0) return prev;
          const nonZero = CATEGORIES.filter((c) => prev[c] > 0);
          if (!nonZero.length) return prev;
          const cat = nonZero[Math.floor(Math.random() * nonZero.length)];
          next[cat] = (next[cat] as number) - 1;
          setLastExit(new Date());
        }

        setLastUpdate(new Date());
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const totalInside = sumTotalInside(data);
  const heroHeight = useHeroHeight();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50">
      <Header lastUpdate={lastUpdate} />

      {/* flex-1 memastikan konten selalu penuh layar */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 min-h-0">
        {/* Info bar */}
        <div className="p-4 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-md bg-red-500/10 text-red-600 border border-red-500/30">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span className="animate-pulse font-semibold tracking-wide">
                  LIVE
                </span>
              </span>

              <span className="text-base text-slate-700">
                Last updated:{" "}
                <span className="font-medium" suppressHydrationWarning>
                  {mounted ? lastUpdate.toLocaleTimeString("id-ID") : ""}
                </span>
              </span>

              {lastEntry && (
                <span className="text-base text-slate-700">
                  Last entry:{" "}
                  <span className="font-medium" suppressHydrationWarning>
                    {mounted ? lastEntry.toLocaleTimeString("id-ID") : ""}
                  </span>
                </span>
              )}
              {lastExit && (
                <span className="text-base text-slate-700">
                  Last exit:{" "}
                  <span className="font-medium" suppressHydrationWarning>
                    {mounted ? lastExit.toLocaleTimeString("id-ID") : ""}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ===== GRID 2 ROWS: [heroHeight, 1fr] ===== */}
        <div
          className="grid grid-cols-12 gap-6 min-h-0"
          style={{ gridTemplateRows: `${heroHeight}px 1fr` }}
        >
          {/* Row 1: hero (8 col) + karyawan (4 col) */}
          <div className="col-span-12 lg:col-span-8">
            <StatCard
              title="INSIDE NPK2"
              value={totalInside}
              icon={UsersIcon}
              bgClass="bg-[#009a44]"
              className="w-full h-full"
            />
          </div>

          <div className="col-span-12 lg:col-span-4">
            <StatCard
              title="KARYAWAN PKC"
              value={data.karyawanPKC}
              icon={UserGroupIcon}
              bgClass="bg-blue-600"
              className="w-full h-full"
            />
          </div>

          {/* Row 2: 3 kartu bawah mengisi 1fr */}
          <div className="col-span-12 grid grid-cols-12 gap-6 min-h-0 lg:row-start-2">
            <div className="col-span-12 lg:col-span-4">
              <StatCard
                title="PHL & KONTRAKTOR"
                value={data.phlKontraktor}
                icon={BriefcaseIcon}
                bgClass="bg-cyan-700"
                className="w-full h-full"
              />
            </div>

            <div className="col-span-12 lg:col-span-4">
              <StatCard
                title="PRAKTIKAN"
                value={data.praktikan}
                icon={AcademicCapIcon}
                bgClass="bg-amber-600"
                className="w-full h-full"
              />
            </div>

            <div className="col-span-12 lg:col-span-4">
              <StatCard
                title="VISITOR"
                value={data.visitor}
                icon={EyeIcon}
                bgClass="bg-yellow-600"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
