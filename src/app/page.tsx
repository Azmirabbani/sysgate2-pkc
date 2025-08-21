// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { Users, UserCheck, HardHat, GraduationCap, Eye } from "lucide-react";

import {
  CAPACITY_MAX,
  initialDashboardData,
  sumTotalInside,
  type DashboardCategories,
} from "../data/dashboardData";

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

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <Header lastUpdate={lastUpdate} />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-6">
        {/* Info bar */}
        <div className="p-4 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm mb-6 flex-shrink-0">
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

              <span className="text-sm text-slate-700">
                Last updated:{" "}
                <span className="font-medium" suppressHydrationWarning>
                  {mounted ? lastUpdate.toLocaleTimeString("id-ID") : ""}
                </span>
              </span>

              {lastEntry && (
                <span className="text-sm text-slate-700">
                  Last entry:{" "}
                  <span className="font-medium" suppressHydrationWarning>
                    {mounted ? lastEntry.toLocaleTimeString("id-ID") : ""}
                  </span>
                </span>
              )}
              {lastExit && (
                <span className="text-sm text-slate-700">
                  Last exit:{" "}
                  <span className="font-medium" suppressHydrationWarning>
                    {mounted ? lastExit.toLocaleTimeString("id-ID") : ""}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Grid - menggunakan flex-1 untuk mengisi ruang yang tersisa */}
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
          {/* Orang di Dalam Gedung pakai hijau kujang */}
          <div className="col-span-12 lg:col-span-8">
            <div
              className="h-full rounded-2xl shadow-sm flex flex-col justify-center items-center text-center text-white min-h-[200px]"
              style={{
                backgroundColor: "#009a44", // <-- hijau kujang
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shadow-md mb-6">
                <Users className="w-8 h-8 text-white stroke-[1.75]" />
              </div>
              <div className="space-y-3">
                <div className="text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight">
                  {totalInside.toLocaleString()}
                </div>
                <p className="text-lg font-semibold">Orang di Dalam Gedung</p>
              </div>
            </div>
          </div>

          {/* Karyawan PKC */}
          <div className="col-span-12 lg:col-span-4">
            <StatCard
              title="Karyawan PKC"
              value={data.karyawanPKC}
              icon={UserCheck}
              color="bg-blue-600"
              className="h-full flex items-center min-h-[200px]"
            />
          </div>

          {/* Bottom row - menggunakan grid yang lebih fleksibel */}
          <div className="col-span-12 flex-1 grid grid-cols-12 gap-6 min-h-0">
            <div className="col-span-12 lg:col-span-4">
              <StatCard
                title="PHL & Kontraktor"
                value={data.phlKontraktor}
                icon={HardHat}
                color="bg-cyan-700"
                className="h-full min-h-[150px]"
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <StatCard
                title="Praktikan"
                value={data.praktikan}
                icon={GraduationCap}
                color="bg-amber-600"
                className="h-full min-h-[150px]"
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <StatCard
                title="Visitor"
                value={data.visitor}
                icon={Eye}
                color="bg-yellow-600"
                className="h-full min-h-[150px]"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
