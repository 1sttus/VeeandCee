export default function FAQ() {
  return (
    <div className="pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-brown mb-3">Frequently Asked Questions</h1>
          <p className="text-sm text-charcoal/70">Answers to common questions about shipping, returns, gifting, and product care.</p>
        </div>

        {[
          {
            question: 'What is your shipping policy?',
            answer: 'We offer complimentary express shipping on all orders and tracking details are emailed once your package ships.',
          },
          {
            question: 'Can I return products?',
            answer: 'Yes, unopened and unused products may be returned within 30 days of delivery. See our Returns page for details.',
          },
          {
            question: 'How do I choose a gift set?',
            answer: 'Choose a gift set based on the recipient’s ritual preferences: skincare, fragrance, or body care for a luxurious first experience.',
          },
          {
            question: 'What if I need help choosing a fragrance?',
            answer: 'Use the Chat page to ask our assistant about fragrance notes, layering, and seasonal styling recommendations.',
          },
        ].map((item) => (
          <div key={item.question} className="rounded-3xl bg-white p-8 border border-brown/10 shadow-sm">
            <h2 className="font-serif font-semibold text-brown text-xl mb-3">{item.question}</h2>
            <p className="text-charcoal/70">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
