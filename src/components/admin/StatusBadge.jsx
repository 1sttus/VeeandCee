import PropTypes from 'prop-types'

const statusStyle = {
  Pending: 'bg-amber-100 text-amber-800',
  Processing: 'bg-sky-100 text-sky-800',
  Shipped: 'bg-indigo-100 text-indigo-800',
  Delivered: 'bg-emerald-100 text-emerald-800',
  Cancelled: 'bg-rose-100 text-rose-800',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  )
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
}
