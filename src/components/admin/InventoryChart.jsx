import PropTypes from 'prop-types'

export default function InventoryChart({ data }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1)

  return (
    <div className="rounded-[2rem] border border-white/40 bg-white/80 p-6 shadow-[0_20px_60px_rgba(139,115,85,0.08)] backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-charcoal/60">Inventory Status</p>
          <h3 className="mt-3 text-2xl font-serif font-bold text-brown">Stock & Trend Overview</h3>
        </div>
        <div className="rounded-full bg-cream px-4 py-2 text-xs uppercase tracking-[0.2em] text-charcoal/80">Live insights</div>
      </div>

      <div className="space-y-5">
        {data.map((item) => {
          const width = `${Math.max((item.value / maxValue) * 100, 10)}%`
          return (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-charcoal/70">
                <span>{item.label}</span>
                <span className="font-semibold text-charcoal">{item.value}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-brown/10">
                <div className={`h-full rounded-full bg-gold`} style={{ width }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

InventoryChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
}
