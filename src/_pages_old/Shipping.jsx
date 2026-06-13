export default function Shipping() {
  const stages = [
    { label: 'Order Confirmed', status: 'completed' },
    { label: 'Packed for delivery', status: 'completed' },
    { label: 'In transit', status: 'active' },
    { label: 'Out for delivery', status: 'upcoming' },
    { label: 'Delivered', status: 'upcoming' },
  ]

  return (
    <div className="pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-brown mb-3">Shipping Progress</h1>
          <p className="text-sm text-charcoal/70">Track the current stage of your order and shipping experience with VeeandCee.</p>
        </div>

        <div className="rounded-3xl bg-white p-8 border border-brown/10 shadow-sm">
          <div className="space-y-6">
            {stages.map((stage, index) => (
              <div key={stage.label} className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${
                  stage.status === 'completed' ? 'bg-gold text-brown border-gold/30' : stage.status === 'active' ? 'bg-brown text-white' : 'bg-cream text-charcoal border-brown/10'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <h2 className="font-semibold text-brown">{stage.label}</h2>
                  <p className="text-sm text-charcoal/70">
                    {stage.status === 'completed' && 'This step has been completed.'}
                    {stage.status === 'active' && 'Your order is currently in transit and will arrive soon.'}
                    {stage.status === 'upcoming' && 'This step is next in your shipping journey.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
