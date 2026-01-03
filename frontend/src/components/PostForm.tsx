"use client";

import { useState } from "react";

interface PostData {
  title: string;
  content: string;
  category: string;
  authorName: string;
}

interface PostFormProps {
  initialData?: PostData;
  onSubmit: (data: PostData) => Promise<void>;
  isSubmitting: boolean;
  errors?: string[];
}

export default function PostForm({ initialData, onSubmit, isSubmitting, errors = [] }: PostFormProps) {
  const [formData, setFormData] = useState<PostData>(initialData || {
    title: "",
    content: "",
    category: "",
    authorName: ""
  });

  const getFieldError = (fieldName: string) => {
    return errors.find(err => err.toLowerCase().includes(fieldName.toLowerCase()));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {initialData ? "Edit Post" : "Create New Post"}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400">Share your thoughts with the community.</p>
      </div>

      <div className="space-y-4">
        <div className="group">
          <label htmlFor="title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 transition-colors group-focus-within:text-blue-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border ${getFieldError('title') ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none`}
            placeholder="What's on your mind?"
          />
          {getFieldError('title') && (
            <p className="mt-1 text-xs text-red-500 font-medium">{getFieldError('title')}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="authorName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 transition-colors group-focus-within:text-blue-600">
              Author Name
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border ${getFieldError('author') ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none`}
              placeholder="Your name"
            />
            {getFieldError('author') && (
              <p className="mt-1 text-xs text-red-500 font-medium">{getFieldError('author')}</p>
            )}
          </div>

          <div className="group">
            <label htmlFor="category" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 transition-colors group-focus-within:text-blue-600">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="e.g. Technology"
            />
          </div>
        </div>

        <div className="group">
          <label htmlFor="content" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 transition-colors group-focus-within:text-blue-600">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={8}
            className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border ${getFieldError('content') ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none`}
            placeholder="Write your story here..."
          />
          {getFieldError('content') && (
            <p className="mt-1 text-xs text-red-500 font-medium">{getFieldError('content')}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : (
          initialData ? "Update Post" : "Publish Post"
        )}
      </button>
    </form>
  );
}
