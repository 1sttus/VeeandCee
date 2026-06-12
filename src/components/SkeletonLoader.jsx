export default function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-cream/95 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-[2rem] bg-white/80 p-8 shadow-xl border border-white/40 animate-pulse">
          <div className="h-10 w-48 rounded-full bg-brown/10 mb-6" />
          <div className="h-72 rounded-[2rem] bg-cream/70 mb-6" />
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-48 rounded-[2rem] bg-cream/70" />
            ))}
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-80 rounded-[2rem] bg-white/80 shadow-lg border border-white/40 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
