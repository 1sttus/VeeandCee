export default function ContactUs() {
  return (
    <div className="pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-brown mb-3">Contact Us</h1>
          <p className="text-sm text-charcoal/70">Need help with an order or have questions about rituals, products, or gifting? We’re here for you.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 border border-brown/10 shadow-sm">
            <h2 className="font-serif font-semibold text-brown text-xl mb-3">Customer Support</h2>
            <p className="text-charcoal/70 mb-4">Email us at <a href="mailto:hello@veeandcee.com" className="text-brown hover:text-dark-brown">hello@veeandcee.com</a> or call <span className="font-medium">(555) 014-2890</span>.</p>
            <p className="text-charcoal/70">Our hours are Monday–Friday, 9am–6pm EST.</p>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-brown/10 shadow-sm">
            <h2 className="font-serif font-semibold text-brown text-xl mb-3">Visit Us</h2>
            <p className="text-charcoal/70 mb-4">VeeandCee Studio<br />230 Beauty Avenue<br />New York, NY 10001</p>
            <p className="text-charcoal/70">Prefer to use the chat? Visit our AI chat for product recommendations and ritual support.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
