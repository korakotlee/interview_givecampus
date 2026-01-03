import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogList from "@/components/BlogList";

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <section className="text-center px-6">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gradient leading-none">
          TECHNICAL<br />
          <span className="text-accent underline decoration-8 decoration-primary/10">STORYTELLING</span>
        </h1>
        <p className="mt-8 text-xl font-medium opacity-70 max-w-2xl mx-auto">
          Behind the scenes of GiveCampus: Building the infrastructure that powers educational fundraising.
        </p>
        <div className="mt-10">
          <Link href="/posts/new" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-black rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 transition-all group">
            CREATE NEW STORY
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <BlogList />
    </div>
  );
}
