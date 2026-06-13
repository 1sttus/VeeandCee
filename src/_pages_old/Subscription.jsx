export default function Subscription() {
  return (
    <div className="pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-brown mb-3">Subscription</h1>
          <p className="text-sm text-charcoal/70">Enjoy curated deliveries, exclusive offers, and ritual upgrades with a VeeandCee subscription.</p>
        </div>

        <div className="rounded-3xl bg-white p-8 border border-brown/10 shadow-sm grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-serif font-semibold text-brown text-xl mb-3">Monthly Ritual</h2>
            <p className="text-charcoal/70 mb-4">Receive a tailored beauty box each month with seasonal products and favorites for radiant skin.</p>
            <p className="font-semibold text-brown">Perfect for daily self-care and discovery.</p>
          </div>
          <div>
            <h2 className="font-serif font-semibold text-brown text-xl mb-3">Benefits</h2>
            <ul className="space-y-3 text-charcoal/70 list-disc list-inside">
              <li>15% off every shipment</li>
              <li>Early access to new arrivals</li>
              <li>Free gift wrapping on special collections</li>
            </ul>
          </div>
        </div>

        <div className="rounded-3xl bg-cream p-8 border border-brown/10 shadow-sm">
          <h2 className="font-serif font-semibold text-brown text-xl mb-3">How it works</h2>
          <ol className="space-y-4 text-charcoal/70 list-decimal list-inside">
            <li>Select your ritual focus for skincare, makeup, body, or fragrance.</li>
            <li>Choose delivery cadence and enjoy free shipping.</li>
            <li>Pause, swap, or upgrade anytime from your account page.</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
