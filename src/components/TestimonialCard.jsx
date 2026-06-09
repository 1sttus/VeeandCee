export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.author}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="font-serif font-semibold text-brown text-lg">{testimonial.timeframe}</h3>
        <p className="text-charcoal/70 text-sm font-medium">{testimonial.category}</p>
      </div>

      <blockquote className="text-charcoal/80 italic mb-4 leading-relaxed">
        "{testimonial.quote}"
      </blockquote>

      <p className="text-sm text-charcoal/60">
        — {testimonial.author}
      </p>
    </div>
  )
}
