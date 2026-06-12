import PropTypes from 'prop-types'

const accentStyles = {
  gold: 'bg-gold/10 text-gold',
  brown: 'bg-brown/10 text-brown',
  rose: 'bg-rose/10 text-rose',
}

export default function StatCard({ title, value, label, icon: Icon, accent }) {
  return (
    <div className="rounded-[2rem] border border-white/40 bg-white/80 p-6 shadow-[0_20px_60px_rgba(139,115,85,0.08)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-charcoal/60">{title}</p>
          <p className="mt-3 text-3xl font-serif font-bold text-brown">{value}</p>
          {label && <p className="mt-2 text-sm text-charcoal/70">{label}</p>}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${accentStyles[accent] || accentStyles.gold}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  )
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  accent: PropTypes.oneOf(['gold', 'brown', 'rose']),
}

StatCard.defaultProps = {
  label: '',
  accent: 'gold',
}
