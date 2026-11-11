'use client';

import { useState, useEffect } from 'react';
import { X, FolderPlus, Loader2, Save } from 'lucide-react';

export default function CreateCategoryModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(true);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      setIsSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  function handleClose() {
    if (isSubmitting) return; // Kuzuia kufunga ikiwa inasave
    setIsVisible(false);
    setTimeout(onClose, 300);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      // Kama onSubmit ni promise (Async backend call), itasubiri
      await onSubmit({ name, slug, description, status });
      
      setName('');
      setDescription('');
      setStatus('Active');
      handleClose();
    } catch (error) {
      console.error('Failed to create category:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop: Inaonekana kwenye Desktop tu (md:block) */}
      <div
        className={`fixed inset-0 hidden md:block bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Modal Container: Fullscreen kwenye mobile, Compact katikati kwenye Desktop */}
      <div className="fixed inset-0 md:inset-auto md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md flex items-center justify-center pointer-events-none">
        
        <div
          className={`pointer-events-auto w-full h-full md:h-auto md:max-h-[90vh] md:rounded-2xl border-0 md:border border-slate-200 bg-white p-4 md:px-5 md:py-4 shadow-2xl dark:border-slate-800 dark:bg-[#0b0f17] flex flex-col justify-between md:justify-start transform transition-all duration-300 ease-in-out ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 md:translate-y-0 opacity-0 md:scale-95'
          }`}
        >
          <div className="flex flex-col h-full md:h-auto overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="grid size-8 md:size-9 place-items-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                  <FolderPlus size={17} />
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-bold">Add New Category</h2>
                  <p className="text-[11px] md:text-xs text-slate-500">Create a new product classification.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="grid size-8 md:size-9 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 transition disabled:opacity-50"
                aria-label="Funga"
              >
                <X size={17} />
              </button>
            </div>

            {/* Form Fields */}
            <form id="create-category-form" onSubmit={handleSubmit} className="mt-3.5 space-y-3 flex-1 overflow-y-auto md:overflow-visible pr-0.5">
              <div>
                <label className="block text-[11px] md:text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vyakula na Vinywaji"
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs md:text-sm outline-none transition focus:border-violet-400 focus:bg-white dark:border-slate-700 dark:bg-slate-900 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-[11px] md:text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </label>
                <select
                  value={status}
                  disabled={isSubmitting}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs md:text-sm outline-none transition focus:border-violet-400 dark:border-slate-700 dark:bg-slate-900 disabled:opacity-60"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] md:text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  disabled={isSubmitting}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of products under this category..."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs md:text-sm outline-none transition focus:border-violet-400 focus:bg-white dark:border-slate-700 dark:bg-slate-900 resize-none disabled:opacity-60"
                />
              </div>
            </form>
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="h-10 flex-1 md:flex-none rounded-xl border border-slate-200 px-4 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="create-category-form"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 h-10 flex-1 md:flex-none rounded-xl bg-violet-600 px-5 text-xs font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:bg-violet-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Inahifadhi...</span>
                </>
              ) : (
                <>
                  <Save size={15} />
                  <span>Save Category</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}