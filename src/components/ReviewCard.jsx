export default function ReviewCard({ review }) {
  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5 text-gold text-sm">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < Math.floor(rating) ? '★' : i < rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="border-b border-brown/10 pb-6 mb-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-serif font-semibold text-brown">{review.title}</h4>
          <p className="text-xs text-charcoal/50">{review.date}</p>
        </div>
        {renderStars(review.rating)}
      </div>

      <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
        {review.content}
      </p>

      <div className="flex items-center gap-3">
        {review.authorImage && (
          <img
            src={review.authorImage}
            alt={review.author}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-sm font-medium text-charcoal">{review.author}</p>
          {review.verified && (
            <p className="text-xs text-green-600">✓ Verified Purchase</p>
          )}
        </div>
      </div>
    </div>
  )
}
