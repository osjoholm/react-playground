import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-900 px-4 text-slate-100">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Welcome to the playground
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">
          Build and play with mini React experiments
        </h1>
      </div>
      <Link
        href="/random-words"
        className="rounded-full bg-emerald-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
      >
        Try Random Words
      </Link>
    </main>
  );
}
