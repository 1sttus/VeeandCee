import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductCatalog from './pages/ProductCatalog'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Account from './pages/Account'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-cream">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/skincare" element={<ProductCatalog />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
