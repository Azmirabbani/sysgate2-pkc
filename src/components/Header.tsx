"use client";

import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export interface HeaderProps {
  lastUpdate: Date;
}

export default function Header({ lastUpdate }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [clockStr, setClockStr] = useState("");

  useEffect(() => {
    setMounted(true);
    const tick = () => setClockStr(new Date().toLocaleTimeString("id-ID"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const ico = "w-4 h-4 stroke-[1.75]";

  return (
    <header className="sticky top-0 z-50">
      <div
        className="
          relative mx-auto max-w-7xl px-6 h-24
          flex items-center justify-between
          bg-white rounded-b-3xl
          shadow-[0_8px_20px_rgba(0,0,0,0.08)]
          ring-1 ring-slate-200
          transition-all duration-500
        "
      >
        {/* kiri */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden shadow-md ring-2 ring-slate-200 bg-white flex items-center justify-center">
            <Image
              src="/pkclogo.png"
              alt="Logo PKC"
              width={56}
              height={56}
              className="w-full h-full object-cover rounded-full"
              priority
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-black tracking-tight">
              PUPUK KUJANG — GATE NPK2
            </h1>
            <div className="flex items-center gap-4 text-sm text-black">
              <span className="flex items-center gap-1">
                <Calendar className={ico} />
                <span suppressHydrationWarning>
                  {mounted
                    ? new Date().toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className={ico} />
                <span suppressHydrationWarning>{clockStr}</span>
              </span>
            </div>
          </div>
        </div>

        {/* kanan */}
        <div className="flex items-center">
          <span className="flex items-center text-black text-sm font-medium px-3 py-1.5 rounded-full bg-emerald-100 ring-1 ring-emerald-300 shadow-sm">
            <span className="relative mr-2">
              <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
            </span>
            System Online
          </span>
        </div>

        {/* dekoratif blur background */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-200/40 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200/40 rounded-full blur-3xl -z-10" />
      </div>
    </header>
  );
}
