import { useMemo, useState } from 'react'

const defaultReplies = [
  {
    input: 'hello',
    reply: 'Hi there! I’m your VeeandCee assistant. Ask me about product routines, fragrance layering, or how to make the most of your ritual.'
  },
  {
    input: 'recommend',
    reply: 'I recommend a gentle routine: cleanse, mist, serum, and a hydrating balm. For fragrance, try Amber Bloom in the evening and Golden Hour Oil for daytime comfort.'
  },
  {
    input: 'gift',
    reply: 'Gift sets are a beautiful way to introduce someone to VeeandCee. I would highlight the Rosewood Gift Set for a complete ritual experience.'
  },
  {
    input: 'hair',
    reply: 'For hair, use Botanical Hair Elixir after shampooing and follow with Velvet Root Hair Mask once a week to restore shine.'
  },
]

function getReply(message) {
  const normalized = message.toLowerCase()
  const match = defaultReplies.find((item) => normalized.includes(item.input))
  return match
    ? match.reply
    : 'That sounds wonderful. Tell me more or ask for product pairing, skincare tips, or fragrance notes.'
}

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I’m your VeeandCee guide. How can I help you craft a better beauty routine today?' },
  ])
  const [draft, setDraft] = useState('')

  const reply = useMemo(() => getReply(draft), [draft])

  const handleSend = (event) => {
    event.preventDefault()
    if (!draft.trim()) return

    setMessages((current) => [
      ...current,
      { role: 'user', text: draft.trim() },
      { role: 'assistant', text: getReply(draft.trim()) },
    ])
    setDraft('')
  }

  return (
    <div className="pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-brown mb-3">VeeandCee AI Chat</h1>
          <p className="text-sm text-charcoal/70">Chat with our beauty assistant for product pairing advice, ritual tips, and scent styling ideas.</p>
        </div>

        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`rounded-3xl p-5 border ${message.role === 'assistant' ? 'bg-cream border-brown/10' : 'bg-white border-brown/10'} shadow-sm`}
            >
              <p className="text-sm text-charcoal/90">
                <strong className="font-medium text-brown">{message.role === 'assistant' ? 'VeeandCee' : 'You'}:</strong> {message.text}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="mt-8 flex flex-col sm:flex-row gap-4">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask me about your routine, scent layering, or product care..."
            className="flex-1 rounded-3xl border border-brown/20 px-5 py-4 text-sm text-charcoal focus:outline-none focus:border-brown"
          />
          <button
            type="submit"
            className="rounded-3xl bg-brown text-white px-6 py-4 text-sm font-medium hover:bg-dark-brown transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
