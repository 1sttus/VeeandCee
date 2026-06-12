import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import SkeletonLoader from './components/SkeletonLoader'
import FloatingAssistant from './components/FloatingAssistant'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { OrderProvider } from './context/OrderContext'
import AdminRoute from './pages/AdminRoute'

const Home = lazy(() => import('./pages/Home'))
const ProductCatalog = lazy(() => import('./pages/ProductCatalog'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderHistory = lazy(() => import('./pages/OrderHistory'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const SearchResults = lazy(() => import('./pages/SearchResults'))
const Compare = lazy(() => import('./pages/Compare'))
const Chat = lazy(() => import('./pages/Chat'))
const FAQ = lazy(() => import('./pages/FAQ'))
const GiftSets = lazy(() => import('./pages/GiftSets'))
const Subscription = lazy(() => import('./pages/Subscription'))
const Returns = lazy(() => import('./pages/Returns'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const Shipping = lazy(() => import('./pages/Shipping'))
const AdminLayout = lazy(() => import('./pages/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const Account = lazy(() => import('./pages/Account'))
const Login = lazy(() => import('./pages/Auth/Login'))
const SignUp = lazy(() => import('./pages/Auth/SignUp'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  useEffect(() => {
    console.log('--- Vee & Cee Routing System Initialized ---');
    console.log('Routes Registered: /, /shop, /cart, /admin, /compare');
  }, []);

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <OrderProvider>
            <Router>
              <ErrorBoundary>
                <div className="flex flex-col min-h-screen bg-cream overflow-x-hidden">
                  <Navbar />
                  <FloatingAssistant />
                  <main className="flex-grow">
                    <Suspense fallback={<SkeletonLoader />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<ProductCatalog />} />
                        <Route path="/shop/:category" element={<ProductCatalog />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-history" element={<OrderHistory />} />
                        <Route path="/order-success" element={<OrderSuccess />} />
                        <Route path="/compare" element={<Compare />} />
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
                        
                        {/* Protected Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                          <Route index element={<AdminDashboard />} />
                          <Route path="products" element={<AdminDashboard />} />
                          <Route path="orders" element={<AdminDashboard />} />
                          <Route path="inventory" element={<AdminDashboard />} />
                          <Route path="customers" element={<AdminDashboard />} />
                          <Route path="analytics" element={<AdminDashboard />} />
                        </Route>

                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                </div>
              </ErrorBoundary>
            </Router>
          </OrderProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}
