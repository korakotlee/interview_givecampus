"use client";

import { motion, AnimatePresence } from "framer-motion";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export default function DeleteModal({ isOpen, onClose, onConfirm, title }: DeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl z-50 p-8 border border-zinc-200 dark:border-zinc-800"
          >
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Delete Story?</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Are you sure you want to delete <span className="font-semibold text-zinc-900 dark:text-zinc-100">"{title}"</span>? This action cannot be undone.
            </p>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
