import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductCatalog from './pages/ProductCatalog'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Account from './pages/Account'
import SearchResults from './pages/SearchResults'
import Wishlist from './pages/Wishlist'
import Chat from './pages/Chat'
import FAQ from './pages/FAQ'
import GiftSets from './pages/GiftSets'
import Subscription from './pages/Subscription'
import Returns from './pages/Returns'
import ContactUs from './pages/ContactUs'
import Shipping from './pages/Shipping'
import AdminDashboard from './pages/AdminDashboard'
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
          <div className="flex flex-col min-h-screen bg-cream overflow-x-hidden">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<ProductCatalog />} />
                <Route path="/shop/:category" element={<ProductCatalog />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/gift-sets" element={<GiftSets />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<Account />} />
                <Route path="/admin" element={<AdminDashboard />} />
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
