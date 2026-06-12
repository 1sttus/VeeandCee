import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductCatalog from './pages/ProductCatalog'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Account from './pages/Account'
import NotFound from './pages/NotFound'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen bg-cream">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop/skincare" element={<ProductCatalog />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  )
}
