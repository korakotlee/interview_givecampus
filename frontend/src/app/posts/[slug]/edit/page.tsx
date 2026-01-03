"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGclQuery } from "@/components/GclProvider";
import PostForm from "@/components/PostForm";

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    name: string;
  };
}

const GET_POST_QUERY = `
  query GetPost($slug: String!) {
    post(slug: $slug) {
      id
      title
      content
      category
      author {
        name
      }
    }
  }
`;

const UPDATE_POST_MUTATION = `
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      post {
        id
        slug
      }
      errors
    }
  }
`;

export default function EditPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { query } = useGclQuery();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!slug) return;

    // Ensure slug is a string (handle array case just in case)
    const slugStr = Array.isArray(slug) ? slug[0] : slug;

    setLoading(true);
    setErrors([]);

    query(GET_POST_QUERY, { slug: slugStr })
      .then((data: any) => {
        if (data && data.post) {
          setPost(data.post);
        } else {
          console.error("Post not found for slug:", slugStr, "Data:", data);
          setErrors([`Post not found for slug: "${slugStr}". Data: ${JSON.stringify(data)}`]);
        }
      })
      .catch((err: any) => {
        console.error("Query error:", err);
        setErrors([err.message]);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (formData: any) => {
    if (!post) return;

    setIsSubmitting(true);
    setErrors([]);

    try {
      const result = await query(UPDATE_POST_MUTATION, {
        input: {
          id: post.id,
          title: formData.title,
          content: formData.content,
          category: formData.category
        }
      });

      if (result.updatePost.errors?.length > 0) {
        setErrors(result.updatePost.errors);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push(`/posts/${slug}`);
          router.refresh();
        }, 1500);
      }
    } catch (err: any) {
      setErrors([err.message || "An unexpected error occurred"]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {success ? (
          <div className="max-w-2xl mx-auto p-12 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-green-100 dark:border-green-900/30 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Update Successful!</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Your changes have been saved. Redirecting...</p>
          </div>
        ) : post ? (
          <PostForm
            initialData={{
              title: post.title,
              content: post.content,
              category: post.category || "",
              authorName: post.author.name
            }}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            errors={errors}
          />
        ) : (
          <div className="text-center p-12 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Post Not Found</h2>
            <p className="text-sm text-zinc-500 mb-6">Slug identifier: "{slug}"</p>
            <button onClick={() => router.push("/")} className="text-blue-600 hover:underline">Return to feed</button>
          </div>
        )}
      </div>
    </div>
  );
}
