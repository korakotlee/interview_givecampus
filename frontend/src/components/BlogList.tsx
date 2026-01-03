"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { useGclQuery } from "./GclProvider";

export default function BlogList() {
  const { query } = useGclQuery();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    query(`
      query GetPosts {
        posts {
          id
          title
          slug
          category
          publishedAt
          author {
            name
            avatar
          }
        }
      }
    `)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-bounce text-4xl font-black text-accent">LOADING...</div>
    </div>
  );

  if (error) return (
    <div className="text-center p-10 bg-red-50 text-red-500 rounded-3xl border-4 border-red-200 mx-6">
      <h2 className="text-2xl font-bold">Oops! The bits are broken.</h2>
      <p>{error.message}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
      {data?.posts.map((post: any, index: number) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -10 }}
          className="group relative"
        >
          <Link href={`/posts/${post.slug}/edit`} className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-full border border-zinc-200 dark:border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600 hover:text-white cursor-pointer" title="Edit Story">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Link>
          <Link href={`/posts/${post.slug}`} className="block h-full">
            <div className="glass-card h-full p-8 flex flex-col justify-between hover:border-accent/40 transition-colors">
              <div>
                <span className="bg-primary text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <h3 className="text-2xl font-bold mt-4 leading-tight group-hover:text-secondary transition-colors">
                  {post.title}
                </h3>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full bg-accent/10 border-2 border-accent/20" />
                  <div>
                    <p className="text-sm font-bold">{post.author.name}</p>
                    <p className="text-xs opacity-60 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-accent font-black text-sm uppercase tracking-tighter pt-4 border-t border-primary/5">
                  Read Story
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
