export default function GiftSets() {
  return (
    <div className="pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-brown mb-3">Gift Sets</h1>
          <p className="text-sm text-charcoal/70">Curated beauty sets for gifting, discovering, and celebrating every ritual moment.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              title: 'Rosewood Ritual Set',
              description: 'A complete skincare ritual with cleanser, serum, and hydrating balm for luminous skin.',
            },
            {
              title: 'Glow Essentials Set',
              description: 'A makeup-ready gift set for effortless radiance and soft-focus finish.',
            },
            {
              title: 'Self-Care Body Set',
              description: 'Body oil, cream, and a luxurious body polish for silky, polished skin.',
            },
            {
              title: 'Fragrance Discovery Set',
              description: 'Three signature scents to explore and layer across moods and seasons.',
            },
          ].map((set) => (
            <div key={set.title} className="rounded-3xl bg-white p-8 border border-brown/10 shadow-sm">
              <h2 className="font-serif font-semibold text-brown text-2xl mb-3">{set.title}</h2>
              <p className="text-charcoal/70">{set.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
