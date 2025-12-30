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
      </section>

      <BlogList />
    </div>
  );
}
