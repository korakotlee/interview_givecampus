import type { Metadata } from "next";
import "./globals.css";
import { GclProvider } from "@/components/GclProvider";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GC Tech Blog | GiveCampus Engineering",
  description: "Casual technical insights from the GiveCampus Engineering Team",
};

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 148.7 16.4"
    className="w-40 h-auto"
  >
    <path className="fill-accent" d="M104.8,0v3.5h1.2v9.4h-1.2v3.5h5.8v-3.5h-1.2v-1.8h5.8l2.3-2.4V2.4L115.2,0H104.8z M114.1,6.7l-0.8,0.8h-3.9v-4h3.9l0.8,0.8V6.7z"/>
    <path className="fill-primary" d="M14.1,3.5h2.3v9.4h-2.3v3.5h8.1v-3.5h-2.3V3.5h2.3V0h-8.1V3.5z"/>
    <path className="fill-primary" d="M32.4,3.5h1.2l-2.3,9.4l-2.3-9.4H30V0h-5.8v3.5h1.2l3.5,12.9h4.6L37,3.5h1.2V0h-5.8V3.5z"/>
    <path className="fill-primary" d="M40.3,0v3.5h1.2v9.4h-1.2v3.5h12.8v-4.6h-2.3v1.1H45v-3h4.6V6.5H45v-3h5.8v1.2h2.3V0h0H40.3z"/>
    <path className="fill-accent" d="M100.7,3.5h1.1V0h-4.6l-3.5,7.1L90.2,0h-4.6v3.5h1.2v9.4h-1.2v3.5h5.8v-3.5h-1.2V5.8l2.3,4.7h2.3l2.3-4.7v7.1h-1.2v3.5h5.8v-3.5h-1.2V3.5z"/>
    <path className="fill-accent" d="M148.7,4.7V2.4L146.4,0h-8.1l-2.3,2.4v4.9l2.3,2.3h7v3.3h-5.8v-1.1H136v2.3l2.3,2.3h8.1l2.3-2.3V8.6l-2.3-2.3h-7V3.5h5.8v1.2H148.7z"/>
    <path className="fill-accent" d="M58.3,0L56,2.4v11.7l2.3,2.4v0h7l2.3-2.4v-3.5h-3.5v2.4h-4.6V3.5h4.6v2.4h3.5V2.4L65.3,0H58.3z"/>
    <path className="fill-primary" d="M2.3,0L0,2.3V14l2.3,2.4h9.3V8.2H7v2.4h1.2v2.3H3.5V3.5h4.6v2.4h3.5V2.4L9.3,0H2.3z"/>
    <path className="fill-accent" d="M127.9,3.5h1.2v9.4h-4.7V3.5h1.1V0h-5.8v3.5h1.2v10.6l2.3,2.3h7l0.1,0l2.3-2.3V3.5h1.2V0h-5.8V3.5z"/>
    <path className="fill-accent" d="M82.1,12.9L78.7,0H74l-3.5,12.9h-1.2v3.5h5.8v-3.5h-1.2l0.3-1.1h4.1l0.3,1.1h-1.2v3.5h5.8v-3.5H82.1z M75.2,8.3l1.2-4.7l1.2,4.7H75.2z"/>
  </svg>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-canvas text-primary bg-pattern">
        <GclProvider>
          <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
            <nav className="glass-card px-8 py-4 flex items-center justify-between">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <Logo />
              </Link>
              <div className="flex gap-8 font-bold">
                <Link href="/" className="hover:text-accent transition-colors">Blog</Link>
                <Link href="#" className="hover:text-accent transition-colors">Team</Link>
                <Link href="#" className="hover:text-accent transition-colors">Careers</Link>
              </div>
            </nav>
          </header>
          <main className="pt-32 min-h-screen">
            {children}
          </main>
          <footer className="py-20 text-center opacity-50 font-medium">
            &copy; {new Date().getFullYear()} GiveCampus Engineering. Lead with curiosity.
          </footer>
        </GclProvider>
      </body>
    </html>
  );
}
