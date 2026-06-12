import PropTypes from 'prop-types'

export default function Modal({ open, title, children, onClose, footer }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 modal-backdrop">
      <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/20 bg-white/90 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-brown/10 px-6 py-4">
          <h2 className="text-xl font-serif font-bold text-brown">{title}</h2>
          <button onClick={onClose} className="text-charcoal transition-colors hover:text-brown">×</button>
        </div>

        <div className="px-6 py-5">{children}</div>

        {footer && <div className="border-t border-brown/10 px-6 py-4 bg-cream/60">{footer}</div>}
      </div>
    </div>
  )
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  footer: PropTypes.node,
}

Modal.defaultProps = {
  footer: null,
}
