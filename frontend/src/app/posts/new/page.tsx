"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGclQuery } from "@/components/GclProvider";
import PostForm from "@/components/PostForm";

const CREATE_POST_MUTATION = `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        id
        slug
      }
      errors
    }
  }
`;

export default function NewPostPage() {
  const router = useRouter();
  const { query } = useGclQuery();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setErrors([]);

    try {
      const result = await query(CREATE_POST_MUTATION, {
        input: {
          title: formData.title,
          content: formData.content,
          category: formData.category,
          authorName: formData.authorName
        }
      });

      if (result.createPost.errors?.length > 0) {
        setErrors(result.createPost.errors);
      } else {
        setSuccess(true);
        // Small delay to show success state before redirecting
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1500);
      }
    } catch (err: any) {
      setErrors([err.message || "An unexpected error occurred"]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors group cursor-pointer"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to feed
        </button>

        {success ? (
          <div className="max-w-2xl mx-auto p-12 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-green-100 dark:border-green-900/30 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Post Published!</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Your story is now live. Redirecting to feed...</p>
          </div>
        ) : (
          <PostForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            errors={errors}
          />
        )}
      </div>
    </div>
  );
}
