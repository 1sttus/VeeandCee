import { useState } from 'react'
import { MessageSquare, X, Sparkles, Wand2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const suggestions = [
    { icon: Wand2, label: 'Find my shade', color: 'bg-gold/10 text-gold' },
    { icon: Sparkles, label: 'Skincare routine', color: 'bg-rose/10 text-rose' },
  ]

  return (
    <div className="fixed bottom-20 right-6 z-50 md:bottom-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-72 overflow-hidden rounded-[2rem] border border-white/40 bg-white/90 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-brown">Beauty Concierge</h3>
              <button onClick={() => setIsOpen(false)} className="text-charcoal/40 hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <p className="mb-6 text-sm text-charcoal/70 leading-relaxed">
              Welcome to Vee & Cee. How can I assist with your ritual today?
            </p>
            <div className="space-y-3">
              {suggestions.map((item) => (
                <button
                  key={item.label}
                  className="flex w-full items-center gap-3 rounded-2xl bg-cream/50 p-3 text-left text-xs font-semibold text-brown transition hover:bg-cream"
                >
                  <div className={`rounded-full p-2 ${item.color}`}>
                    <item.icon size={14} />
                  </div>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brown text-white shadow-2xl shadow-brown/20"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}><X size={24} /></motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}><MessageSquare size={24} /></motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}