'use client';

import useApiMutation from '@/lib/query/useApiMutation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function CreateShopModal({ open, onClose, onSubmit }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const createShopMutation = useApiMutation('create_shop',{
    onSuccess:(result) => {
        toast.success("Hongera!",{description:"Duka limefanikiwa kutengenezwa. Link ya duka imetumwa kwenye simu yake!"})
        setTimeout(()=>{
          onSubmit?.({})
        },1000)
    }
  })

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 250);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const form = Object.fromEntries(formData.entries());

    //onSubmit?.(form);
    createShopMutation.mutate(form)
  };

  if (!mounted) return null;

  const fieldClass =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white';

  const labelClass =
    'mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 transition-colors duration-250 ${
        visible ? 'bg-black/50' : 'bg-black/0'
      }`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-shop-title"
        className={`w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-2xl transition-all duration-250 ease-out dark:border-slate-700 dark:bg-slate-900 ${
          visible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-3 scale-[0.98] opacity-0'
        }`}
      >
        {/* Compact header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 dark:border-slate-800">
          <div>
            <h2
              id="create-shop-title"
              className="text-base font-semibold text-slate-900 dark:text-white"
            >
              Tengeneza duka
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Jaza taarifa za msingi za duka.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Funga modal"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        {/* Compact form; no internal scrolling */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
            <label>
              <span className={labelClass}>Jina la duka</span>
              <input
                name="shop_name"
                required
                placeholder="Mf. Duka la Amani"
                className={fieldClass}
              />
            </label>

            <label>
              <span className={labelClass}>Subdomain</span>
              <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-violet-500 dark:border-slate-700 dark:bg-slate-800">
                <input
                  name="subdomain"
                  required
                  placeholder="duka-lako"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none dark:text-white"
                />
                <span className="flex items-center border-l border-slate-200 bg-slate-50 px-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-700/50">
                  .duka.tz
                </span>
              </div>
            </label>

            <label>
              <span className={labelClass}>Jina la kwanza la mmiliki</span>
              <input
                name="owner_fname"
                required
                placeholder="Jina la kwanza"
                className={fieldClass}
              />
            </label>

            <label>
              <span className={labelClass}>Jina la Pili la mmiliki</span>
              <input
                name="owner_lname"
                required
                placeholder="Jina la pili"
                className={fieldClass}
              />
            </label>

            <label>
              <span className={labelClass}>Simu / Barua pepe</span>
              <input
                name="login_id"
                required
                placeholder="Simu / Barua pepe"
                className={fieldClass}
              />
            </label>

            <label>
              <span className={labelClass}>Password</span>
              <input
                name="password"
                required
                placeholder="Simu / Barua pepe"
                className={fieldClass}
              />
            </label>

            {/* <label>
              <span className={labelClass}>Package</span>
              <select name="package" required defaultValue="" className={fieldClass}>
                <option value="" disabled>
                  Chagua package
                </option>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </label> */}

            
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Ghairi
            </button>

            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-[0.98]"
            >
              Tengeneza duka
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}