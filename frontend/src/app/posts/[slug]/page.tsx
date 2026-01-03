"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Heart } from "lucide-react";
import Link from "next/link";
import { useGclQuery } from "@/components/GclProvider";
import DeleteModal from "@/components/DeleteModal";

const DELETE_POST_MUTATION = `
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      success
      errors
    }
  }
`;

export default function PostPage() {
  const router = useRouter();
  const { slug } = useParams();
  const { query } = useGclQuery();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    query(`
      query GetPost($slug: String!) {
        post(slug: $slug) {
          id
          title
          content
          category
          publishedAt
          author {
            name
            bio
            avatar
          }
        }
      }
    `, { slug })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin text-4xl font-black text-accent border-4 border-accent border-t-transparent rounded-full w-12 h-12"></div>
    </div>
  );

  if (error || !data?.post) return (
    <div className="max-w-2xl mx-auto text-center pt-20">
      <h1 className="text-4xl font-black italic">404: Post Lost in Space</h1>
      <Link href="/" className="mt-8 inline-block btn-vibrant">Go Home</Link>
    </div>
  );

  const post = data.post;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-6 pb-40"
    >
      <Link href="/" className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest hover:text-accent transition-colors mb-12">
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      <header className="space-y-6">
        <span className="bg-accent text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
          {post.category}
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between py-8 border-y border-primary/10">
          <div className="flex items-center gap-4">
            <img src={post.author.avatar} alt={post.author.name} className="w-14 h-14 rounded-full bg-accent/10 border-2 border-accent/20" />
            <div>
              <p className="text-lg font-bold">{post.author.name}</p>
              <p className="text-sm opacity-60">Published {new Date(post.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href={`/posts/${post.slug}/edit`} className="p-3 glass-card hover:bg-blue-600 hover:text-white transition-colors cursor-pointer" title="Edit Story">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-3 glass-card hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
              title="Delete Story"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button className="p-3 glass-card hover:bg-accent hover:text-white transition-colors">
              <Heart size={20} />
            </button>
            <button className="p-3 glass-card hover:bg-secondary hover:text-white transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="mt-12 text-xl leading-relaxed font-medium space-y-6">
        {post.content.split('\n').map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <footer className="mt-20">
        <div className="glass-card p-10 bg-primary text-white flex flex-col md:flex-row gap-8 items-center">
          <img src={post.author.avatar} alt={post.author.name} className="w-24 h-24 rounded-full border-4 border-accent/40" />
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-black">Written by {post.author.name}</h4>
            <p className="mt-2 opacity-80">{post.author.bio}</p>
            <button className="mt-6 text-accent font-black uppercase tracking-widest text-sm hover:underline">
              View all posts by {post.author.name}
            </button>
          </div>
        </div>
      </footer>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={post.title}
      />

      {isDeleting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[100] flex items-center justify-center">
          <div className="animate-spin h-16 w-16 border-4 border-white border-t-transparent rounded-full" />
        </div>
      )}
    </motion.article>
  );

  async function handleDelete() {
    setIsDeleting(true);
    setIsDeleteModalOpen(false);
    try {
      const result = await query(DELETE_POST_MUTATION, { id: post.id });
      if (result.deletePost.success) {
        router.push("/");
        router.refresh();
      } else {
        alert(result.deletePost.errors[0]);
        setIsDeleting(false);
      }
    } catch (err: any) {
      alert(err.message);
      setIsDeleting(false);
    }
  }
}
