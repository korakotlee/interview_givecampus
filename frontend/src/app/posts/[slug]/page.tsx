"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Heart } from "lucide-react";
import Link from "next/link";
import { useGclQuery } from "@/components/GclProvider";

export default function PostPage() {
  const { slug } = useParams();
  const { query } = useGclQuery();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

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
    </motion.article>
  );
}
