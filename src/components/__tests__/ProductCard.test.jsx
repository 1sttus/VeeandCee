import { render, screen } from '@testing-library/react'
import ProductCard from '../ProductCard'

const sample = {
  id: '1',
  name: 'Sample Product',
  image: '/placeholder.png',
  price: '29.00',
  description: 'A sample product for tests',
}

describe('ProductCard', () => {
  it('renders product name and price', () => {
    render(<ProductCard product={sample} />)
    expect(screen.getByText(/Sample Product/i)).toBeInTheDocument()
    expect(screen.getByText(/\$29.00/)).toBeInTheDocument()
  })
})
