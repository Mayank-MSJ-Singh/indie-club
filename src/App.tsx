function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="max-w-xl space-y-6 p-8 bg-slate-900/70 backdrop-blur rounded-2xl border border-slate-800 shadow-2xl">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300/80">
            Tailwind check
          </p>
          <h1 className="text-3xl font-semibold">Tailwind should style this</h1>
          <p className="text-red-500">
            If you see the dark background, rounded corners, and spaced layout,
            Tailwind is working. Try editing this component to add more utility
            classes and watch it update live.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button className="rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white shadow hover:bg-indigo-400 transition">
            Indigo button
          </button>
          <button className="rounded-lg border border-slate-700 px-4 py-2 font-medium text-slate-100 hover:border-indigo-400 transition">
            Outline button
          </button>
          <div className="sm:col-span-2 rounded-lg border border-dashed border-slate-700 px-4 py-3 text-sm text-slate-300">
            Tip: make sure the dev server restarts after installing Tailwind so
            old CSS is cleared out.
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
