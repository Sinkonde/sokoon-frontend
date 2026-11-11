'use client';

import {
  X,
  Tag,
  Package,
  Calendar,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  Hash,
  FileText,
  Boxes,
  Sparkles,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CategoryDetailsDrawer({ category, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (category) {
      // Kidogo delay ili trigger transition ya kuingia
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [category]);

  if (!category) return null;

  const isActive = category.status === 'Active';

  function handleClose() {
    setIsVisible(false);
    setTimeout(onClose, 300); // Subiri animation iishe kabla ya kuondoa component
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop yenye smooth fade animation */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Drawer Container: Fullscreen kwenye mobile, Slide-in kulia kwenye Desktop */}
      <div className="fixed inset-0 md:inset-y-0 md:right-0 md:left-auto flex md:max-w-full md:pl-10 pointer-events-none">
        <div
          className={`pointer-events-auto w-full h-full md:w-screen md:max-w-md bg-white shadow-2xl dark:bg-[#0b0f17] md:dark:border-l md:dark:border-slate-800/80 flex flex-col transform transition-transform duration-300 ease-in-out ${
            isVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          
          {/* Header: Minimal kwenye mobile, Fancy gradient */}
          <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-slate-900 px-4 py-5 md:px-6 md:pt-8 md:pb-7 text-white shadow-md shrink-0">
            {/* Background Glow Pattern */}
            <div className="absolute -right-6 -top-6 size-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 size-40 rounded-full bg-violet-400/20 blur-3xl pointer-events-none" />

            {/* Close Button (Inafanya kazi vizuri kwenye mobile na desktop) */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white active:scale-95 z-10"
              aria-label="Funga"
            >
              <X size={20} />
            </button>

            <div className="relative flex items-center gap-3.5 pr-8">
              {/* Category Avatar */}
              <div className="relative flex size-12 md:size-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md text-lg md:text-xl font-black text-white ring-2 ring-white/30 shadow-inner">
                {category.name
                  .split(' ')
                  .slice(0, 2)
                  .map((p) => p[0])
                  .join('')
                  .toUpperCase()}
                
                {/* Status Indicator Dot */}
                <span
                  className={`absolute -bottom-1 -right-1 size-3.5 md:size-4 rounded-full ring-2 ring-violet-900 ${
                    isActive ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-rose-400'
                  }`}
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase text-violet-200 backdrop-blur-xs">
                    <Sparkles size={10} /> Category
                  </span>
                  <span className="font-mono text-[11px] text-violet-200/80">
                    #{category.id}
                  </span>
                </div>
                <h2 className="mt-0.5 truncate text-lg md:text-xl font-bold tracking-tight text-white">
                  {category.name}
                </h2>
              </div>
            </div>
          </div>

          {/* Content Details Body (Scrollable bila scrollbar inayoonekana) */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 md:space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            {/* Quick Highlight Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800/80 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                  <Boxes size={15} />
                  <span className="text-xs font-medium">Bidhaa Zilizopo</span>
                </div>
                <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                  {category.productsCount} <span className="text-xs font-normal text-slate-400">items</span>
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800/80 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                  <CheckCircle2 size={15} />
                  <span className="text-xs font-medium">Hali (Status)</span>
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300'
                        : 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-300'
                    }`}
                  >
                    {isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {category.status}
                  </span>
                </div>
              </div>
            </div>

            {/* General Metadata Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Taarifa za Usajili
              </h3>

              <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-xs dark:divide-slate-800/60 dark:border-slate-800 dark:bg-slate-900/30">
                <div className="flex items-center justify-between p-3.5">
                  <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                    <Tag size={15} className="text-violet-500" />
                    <span className="text-xs font-medium">Category Slug</span>
                  </div>
                  <span className="rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    /{category.slug}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5">
                  <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                    <Hash size={15} className="text-violet-500" />
                    <span className="text-xs font-medium">Category ID</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {category.id}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5">
                  <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                    <Calendar size={15} className="text-violet-500" />
                    <span className="text-xs font-medium">Tarehe ya Kuundwa</span>
                  </div>
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    {category.createdAt}
                  </span>
                </div>
              </div>
            </div>

            {/* Description Box */}
            <div className="space-y-2 pb-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <FileText size={14} />
                <span>Maelezo (Description)</span>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-xs leading-relaxed text-slate-600 dark:border-slate-800/80 dark:bg-slate-900/40 dark:text-slate-300">
                {category.description || (
                  <span className="italic text-slate-400">
                    Hakuna maelezo yoyote yaliyowekwa kwa ajili ya category hii.
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Fixed Bottom Action Controls */}
          <div className="sticky bottom-0 z-20 border-t border-slate-100 bg-white/90 backdrop-blur-md p-4 dark:border-slate-800 dark:bg-[#0b0f17]/90 shrink-0 shadow-lg">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-xs font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:bg-violet-700 active:scale-[0.98]"
              >
                <Edit3 size={15} />
                Hariri Category
              </button>
              <button
                type="button"
                aria-label="Futa Category"
                className="grid size-11 place-items-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100 dark:border-rose-900/30 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}