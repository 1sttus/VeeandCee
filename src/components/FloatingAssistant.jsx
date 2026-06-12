import { useState } from 'react'
import { MessageCircle, Sparkles, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const recommendations = [
  {
    title: 'Shade Match Ritual',
    description: 'Find the perfect foundation tone with our signature glow formula.',
  },
  {
    title: 'Skin Reset Trio',
    description: 'Hydrate, balance and brighten with a three-step skin ritual.',
  },
  {
    title: 'Luxury Lip Finish',
    description: 'Amplify lip color longevity with nourishing satin coverage.',
  },
]

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-24 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
            className="w-80 rounded-[2rem] border border-white/30 bg-white/90 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-charcoal/60">Beauty Concierge</p>
                <h2 className="text-lg font-serif font-bold text-brown">Routine suggestions</h2>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-cream hover:bg-cream/90 transition-colors" aria-label="Close assistant">
                <X size={18} className="text-charcoal" />
              </button>
            </div>
            <div className="space-y-4">
              {recommendations.map((item) => (
                <div key={item.title} className="rounded-3xl border border-brown/10 bg-cream/80 p-4">
                  <p className="font-semibold text-brown">{item.title}</p>
                  <p className="text-sm text-charcoal/70">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-3 rounded-full bg-brown px-4 py-3 text-white shadow-2xl hover:bg-dark-brown transition-colors"
        aria-label="Open beauty assistant"
      >
        <MessageCircle size={18} />
        <span className="text-sm font-medium">Beauty Assistant</span>
      </button>
      <div className="rounded-full bg-gold/10 px-3 py-2 text-xs text-charcoal shadow-lg backdrop-blur-sm">
        <Sparkles size={12} className="inline-block mr-2" />
        Personalized recommendations for your ritual.
      </div>
    </div>
  )
}
