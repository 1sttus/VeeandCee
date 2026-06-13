'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Eye,
  EyeOff,
  Filter,
  Lock,
  Mail,
  Package,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  Trash2,
  Upload,
  Users,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import StatCard from '@/components/admin/StatCard'
import InventoryChart from '@/components/admin/InventoryChart'
import Modal from '@/components/admin/Modal'
import StatusBadge from '@/components/admin/StatusBadge'

const productCategories = ['All', 'Makeup', 'Skincare', 'Body', 'Hair', 'Fragrance', 'Gift Sets']
const orderStatuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const emptyProductForm = {
  name: '',
  category: 'Makeup',
  price: 0,
  discount: 0,
  stockQuantity: 0,
  sold: 0,
  image: '',
  featured: false,
  visible: true,
  description: '',
}

const formatCurrency = (value = 0) => `$${Number(value).toFixed(2)}`
const toTitle = (value = '') =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

export default function AdminPage() {
  const { user, loading, login, logout } = useAuth()
  const router = useRouter()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [dataError, setDataError] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [productCategoryFilter, setProductCategoryFilter] = useState('All')
  const [productPage, setProductPage] = useState(1)
  const [orderStatusFilter, setOrderStatusFilter] = useState('All')
  const [customerSearch, setCustomerSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState(emptyProductForm)
  const [isSaving, setIsSaving] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [formError, setFormError] = useState(null)

  const isAdmin = Boolean(user?.isAdmin)

  const getToken = () => localStorage.getItem('veeandcee_token')

  const authedFetch = async (url, options = {}) => {
    const token = getToken()
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    })
    const data = await response.json().catch(() => null)
    if (!response.ok) {
      throw new Error(data?.error || 'Request failed')
    }
    return data
  }

  const loadAdminData = async () => {
    setDataLoading(true)
    setDataError('')
    try {
      const [productData, orderData, customerData] = await Promise.all([
        authedFetch('/api/products?all=true'),
        authedFetch('/api/orders'),
        authedFetch('/api/users'),
      ])
      setProducts(productData)
      setOrders(orderData)
      setCustomers(customerData)
    } catch (err) {
      setDataError(err.message)
    } finally {
      setDataLoading(false)
    }
  }

  useEffect(() => {
    if (!loading && isAdmin) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadAdminData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isAdmin])

  const handleAdminLogin = async (event) => {
    event.preventDefault()
    setLoginError('')
    setLoginLoading(true)
    try {
      const loggedInUser = await login(credentials)
      if (!loggedInUser.isAdmin) {
        logout()
        throw new Error('This account does not have administrative access.')
      }
    } catch (err) {
      setLoginError(err.message)
    } finally {
      setLoginLoading(false)
    }
  }

  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0)
  const lowStockCount = products.filter((product) => product.stockQuantity > 0 && product.stockQuantity <= 5).length
  const soldOutCount = products.filter((product) => product.stockQuantity <= 0).length
  const inventoryData = [
    { label: 'Available', value: products.reduce((sum, product) => sum + (product.stockQuantity || 0), 0) },
    { label: 'Sold', value: products.reduce((sum, product) => sum + (product.sold || 0), 0) },
    { label: 'Low Stock', value: lowStockCount },
    { label: 'Sold Out', value: soldOutCount },
  ]

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const search = productSearch.toLowerCase()
        return product.name.toLowerCase().includes(search) || product.category.toLowerCase().includes(search)
      })
      .filter((product) => {
        if (productCategoryFilter === 'All') return true
        return toTitle(product.category) === productCategoryFilter
      })
  }, [products, productSearch, productCategoryFilter])

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => orderStatusFilter === 'All' || order.status === orderStatusFilter)
  }, [orders, orderStatusFilter])

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const search = customerSearch.toLowerCase()
      return customer.name.toLowerCase().includes(search) || customer.email.toLowerCase().includes(search)
    })
  }, [customers, customerSearch])

  const pageSize = 6
  const productPageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const paginatedProducts = filteredProducts.slice((productPage - 1) * pageSize, productPage * pageSize)

  const openNewProductModal = () => {
    setEditingProduct(null)
    setFormData(emptyProductForm)
    setFormError(null)
    setModalOpen(true)
  }

  const openEditProductModal = (product) => {
    setEditingProduct(product)
    setFormData({ ...emptyProductForm, ...product, category: toTitle(product.category) })
    setFormError(null)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setFormError(null)
  }

  const normalizeProductPayload = (data) => ({
    name: data.name.trim(),
    category: data.category.toLowerCase().replace(/\s+/g, '-'),
    price: Number(data.price) || 0,
    discount: Number(data.discount) || 0,
    stockQuantity: Number(data.stockQuantity) || 0,
    sold: Number(data.sold) || 0,
    image: data.image || '/placeholder.png',
    featured: Boolean(data.featured),
    visible: Boolean(data.visible),
    description: data.description.trim(),
  })

  const uploadProductImage = async (file) => {
    if (!file) return

    setImageUploading(true)
    setFormError(null)
    try {
      const body = new FormData()
      body.append('file', file)
      body.append('folder', 'products')

      const response = await fetch('/api/uploads', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body,
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Image upload failed')
      }

      setFormData((current) => ({ ...current, image: data.url }))
    } catch (err) {
      setFormError(err.message)
    } finally {
      setImageUploading(false)
    }
  }

  const saveProduct = async () => {
    if (!formData.name.trim() || !formData.category.trim() || !formData.description.trim()) {
      setFormError('Product name, category, and description are required.')
      return
    }

    setIsSaving(true)
    setFormError(null)
    try {
      const payload = normalizeProductPayload(formData)
      const savedProduct = editingProduct
        ? await authedFetch(`/api/products/${editingProduct.id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
          })
        : await authedFetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(payload),
          })

      setProducts((current) =>
        editingProduct
          ? current.map((item) => (item.id === savedProduct.id ? savedProduct : item))
          : [savedProduct, ...current]
      )
      closeModal()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const deleteProduct = async (productId) => {
    await authedFetch(`/api/products/${productId}`, { method: 'DELETE' })
    setProducts((current) => current.filter((item) => item.id !== productId))
  }

  const updateProduct = async (product, patch) => {
    const updated = await authedFetch(`/api/products/${product.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...product, ...patch }),
    })
    setProducts((current) => current.map((item) => (item.id === updated.id ? updated : item)))
  }

  const updateOrderStatus = async (orderId, status) => {
    const updated = await authedFetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
    setOrders((current) => current.map((order) => (order.id === updated.id ? updated : order)))
  }

  if (loading) {
    return <div className="min-h-screen bg-cream px-4 py-20 text-center text-charcoal/70">Loading admin session...</div>
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream p-6 text-charcoal">
        <div className="w-full max-w-md rounded-[2rem] border border-white/40 bg-white/80 p-8 shadow-xl backdrop-blur-xl md:p-10">
          <div className="mb-8 text-center">
            <h1 className="mb-2 font-serif text-3xl font-bold text-brown">V&C Console</h1>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal/60">Administrative Access</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            {loginError && (
              <div className="rounded-2xl border border-rose/20 bg-rose/10 px-4 py-3 text-sm text-rose">
                {loginError}
              </div>
            )}

            <label className="block space-y-2">
              <span className="ml-1 text-xs font-semibold uppercase tracking-wider text-brown">Email Address</span>
              <span className="relative block">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/40" />
                <input
                  type="email"
                  required
                  value={credentials.email}
                  onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                  className="w-full rounded-2xl border border-brown/10 bg-white/60 py-3.5 pl-12 pr-4 text-sm outline-none transition-colors focus:border-brown"
                  autoComplete="email"
                />
              </span>
            </label>

            <label className="block space-y-2">
              <span className="ml-1 text-xs font-semibold uppercase tracking-wider text-brown">Password</span>
              <span className="relative block">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/40" />
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                  className="w-full rounded-2xl border border-brown/10 bg-white/60 py-3.5 pl-12 pr-4 text-sm outline-none transition-colors focus:border-brown"
                  autoComplete="current-password"
                />
              </span>
            </label>

            <button
              type="submit"
              disabled={loginLoading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brown py-4 text-sm font-semibold text-white shadow-lg shadow-brown/20 transition-all hover:bg-dark-brown disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loginLoading ? 'Checking access...' : 'Enter Console'}
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pb-24 pt-8 text-charcoal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-charcoal/60">Admin Dashboard</p>
            <h1 className="mt-3 font-serif text-4xl font-bold text-brown">Vee & Cee Operations</h1>
            <p className="mt-3 max-w-2xl text-sm text-charcoal/75">
              Manage catalog, inventory, orders, and customer analytics from one control panel.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={loadAdminData}
              disabled={dataLoading}
              className="rounded-full border border-brown/15 bg-white px-5 py-3 text-sm font-semibold text-brown transition hover:bg-brown/5 disabled:opacity-60"
            >
              {dataLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={openNewProductModal}
              className="inline-flex items-center gap-2 rounded-full bg-brown px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition hover:bg-dark-brown"
            >
              <Plus size={18} /> New Product
            </button>
            <button
              onClick={() => {
                logout()
                router.push('/')
              }}
              className="rounded-full border border-brown/15 bg-white px-5 py-3 text-sm font-semibold text-brown transition hover:bg-brown/5"
            >
              Log out
            </button>
          </div>
        </div>

        {dataError && (
          <div className="mb-6 rounded-2xl border border-rose/20 bg-rose/10 px-4 py-3 text-sm text-rose">
            {dataError}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-3">
          <StatCard title="Total Products" value={products.length} label="Catalog items" icon={Package} accent="gold" />
          <StatCard title="Total Orders" value={orders.length} label="Orders processed" icon={TrendingUp} accent="brown" />
          <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} label="Recorded revenue" icon={Sparkles} accent="rose" />
          <StatCard title="Total Customers" value={customers.length} label="Registered shoppers" icon={Users} accent="gold" />
          <StatCard title="Low In Stock" value={lowStockCount} label="Attention items" icon={Eye} accent="brown" />
          <StatCard title="Sold Out" value={soldOutCount} label="Needs restock" icon={EyeOff} accent="rose" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <InventoryChart data={inventoryData} />
          <section className="rounded-[2rem] border border-white/40 bg-white/80 p-6 shadow-[0_20px_60px_rgba(139,115,85,0.08)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-charcoal/60">Recent Orders</p>
                <h2 className="mt-3 font-serif text-2xl font-bold text-brown">Latest Purchases</h2>
              </div>
              <span className="rounded-full bg-cream px-3 py-1 text-xs text-charcoal/80">Live</span>
            </div>
            <div className="space-y-4">
              {orders.slice(0, 4).map((order) => (
                <div key={order.id} className="rounded-3xl border border-brown/10 bg-cream/60 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-brown">{order.customerName}</p>
                      <p className="text-xs text-charcoal/70">Order {order.id.slice(-6)} - {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={order.status} />
                      <span className="text-sm font-semibold text-brown">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && <p className="text-sm text-charcoal/60">No orders yet.</p>}
            </div>
          </section>
        </div>

        <section className="mt-10 rounded-[2rem] border border-white/40 bg-white/85 p-6 shadow-[0_20px_60px_rgba(139,115,85,0.08)] backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-charcoal/60">Product Management</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brown">Catalog Control</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="relative block">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/50" />
                <input
                  type="search"
                  value={productSearch}
                  onChange={(event) => {
                    setProductSearch(event.target.value)
                    setProductPage(1)
                  }}
                  placeholder="Search products..."
                  className="w-full min-w-[220px] rounded-full border border-brown/20 bg-cream/70 py-3 pl-10 pr-4 text-sm text-charcoal outline-none transition focus:border-brown"
                />
              </label>
              <label className="inline-flex items-center gap-2 rounded-full border border-brown/20 bg-cream/70 px-4 py-3 text-sm text-charcoal">
                <Filter size={16} />
                <select
                  value={productCategoryFilter}
                  onChange={(event) => {
                    setProductCategoryFilter(event.target.value)
                    setProductPage(1)
                  }}
                  className="bg-transparent text-sm outline-none"
                >
                  {productCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="overflow-x-auto rounded-[2rem] border border-brown/10 bg-cream/70">
            <table className="min-w-full divide-y divide-brown/10 text-left text-sm text-charcoal">
              <thead className="bg-white/90 text-xs uppercase tracking-[0.2em] text-charcoal/70">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brown/10 bg-white/80">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="transition hover:bg-cream/70">
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate font-semibold text-brown">{product.name}</div>
                      <div className="max-w-sm truncate text-xs text-charcoal/60">{product.description}</div>
                    </td>
                    <td className="px-6 py-4">{toTitle(product.category)}</td>
                    <td className="px-6 py-4">{product.stockQuantity}</td>
                    <td className="px-6 py-4">{formatCurrency(product.price - (product.price * product.discount) / 100)}</td>
                    <td className="px-6 py-4">
                      <div className="inline-flex flex-wrap items-center gap-2">
                        {product.featured && <span className="rounded-full bg-gold/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">Featured</span>}
                        <span className={`rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.2em] ${product.visible ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                          {product.visible ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => openEditProductModal(product)} className="rounded-full border border-brown/10 bg-white px-3 py-2 text-xs font-semibold text-brown transition hover:bg-brown/5">
                          Edit
                        </button>
                        <button onClick={() => updateProduct(product, { featured: !product.featured })} className="rounded-full border border-brown/10 bg-cream px-3 py-2 text-xs text-charcoal transition hover:bg-brown/5">
                          {product.featured ? 'Unfeature' : 'Feature'}
                        </button>
                        <button onClick={() => updateProduct(product, { visible: !product.visible })} className="rounded-full border border-brown/10 bg-cream px-3 py-2 text-xs text-charcoal transition hover:bg-brown/5">
                          {product.visible ? 'Hide' : 'Show'}
                        </button>
                        <button onClick={() => deleteProduct(product.id)} className="inline-flex items-center gap-1 rounded-full border border-rose/30 bg-rose/10 px-3 py-2 text-xs text-rose transition hover:bg-rose/20">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-brown/10 pt-4 text-sm text-charcoal/70">
            <span>{filteredProducts.length} products found</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setProductPage((current) => Math.max(1, current - 1))} disabled={productPage === 1} className="rounded-full border border-brown/10 bg-cream px-4 py-2 text-xs font-semibold transition hover:bg-brown/5 disabled:cursor-not-allowed disabled:opacity-50">
                Prev
              </button>
              <span className="text-xs text-charcoal">Page {productPage} of {productPageCount}</span>
              <button onClick={() => setProductPage((current) => Math.min(productPageCount, current + 1))} disabled={productPage === productPageCount} className="rounded-full border border-brown/10 bg-cream px-4 py-2 text-xs font-semibold transition hover:bg-brown/5 disabled:cursor-not-allowed disabled:opacity-50">
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-white/40 bg-white/85 p-6 shadow-[0_20px_60px_rgba(139,115,85,0.08)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-charcoal/60">Orders Management</p>
                <h2 className="mt-3 font-serif text-2xl font-bold text-brown">Order Queue</h2>
              </div>
              <select value={orderStatusFilter} onChange={(event) => setOrderStatusFilter(event.target.value)} className="rounded-full border border-brown/20 bg-cream px-4 py-3 text-sm outline-none transition focus:border-brown">
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="rounded-3xl border border-brown/10 bg-cream/60 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-brown">{order.customerName}</p>
                      <p className="text-xs text-charcoal/70">{order.email} - {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={order.status} />
                      <span className="font-semibold text-brown">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {orderStatuses.filter((status) => status !== 'All').map((status) => (
                      <button key={status} onClick={() => updateOrderStatus(order.id, status)} className={`rounded-full px-3 py-2 text-xs font-semibold transition ${order.status === status ? 'bg-brown text-white' : 'border border-brown/10 bg-white text-charcoal hover:bg-brown/5'}`}>
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {filteredOrders.length === 0 && <p className="text-sm text-charcoal/60">No matching orders.</p>}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/40 bg-white/85 p-6 shadow-[0_20px_60px_rgba(139,115,85,0.08)] backdrop-blur-xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-charcoal/60">Customer Management</p>
                <h2 className="mt-3 font-serif text-2xl font-bold text-brown">Customer Insights</h2>
              </div>
              <label className="inline-flex items-center gap-2 rounded-full border border-brown/20 bg-cream px-4 py-3 text-sm text-charcoal">
                <Search size={16} />
                <input value={customerSearch} onChange={(event) => setCustomerSearch(event.target.value)} placeholder="Search customers" className="w-full bg-transparent text-sm outline-none" />
              </label>
            </div>

            <div className="space-y-3">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="rounded-3xl border border-brown/10 bg-cream/60 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-brown">{customer.name}</p>
                      <p className="text-xs text-charcoal/70">{customer.email}</p>
                    </div>
                    <div className="flex gap-4 text-sm text-charcoal/80">
                      <span>{customer.orders} orders</span>
                      <span>{formatCurrency(customer.lifetimeValue)}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredCustomers.length === 0 && <p className="text-sm text-charcoal/60">No matching customers.</p>}
            </div>
          </div>
        </section>

        <Modal
          open={modalOpen}
          title={editingProduct ? 'Edit Product' : 'Create Product'}
          onClose={closeModal}
          footer={
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button onClick={closeModal} className="rounded-full border border-brown/10 bg-cream px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-brown/5">
                Cancel
              </button>
              <button onClick={saveProduct} disabled={isSaving || imageUploading} className="rounded-full bg-brown px-5 py-3 text-sm font-semibold text-white transition hover:bg-dark-brown disabled:opacity-50">
                {isSaving ? 'Saving...' : imageUploading ? 'Uploading image...' : 'Save Product'}
              </button>
            </div>
          }
        >
          <div className="space-y-5">
            {formError && <div className="rounded-3xl border border-rose/20 bg-rose/10 px-4 py-3 text-sm text-rose">{formError}</div>}
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-charcoal">
                Product Name
                <input type="text" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none focus:border-brown" />
              </label>
              <label className="space-y-2 text-sm text-charcoal">
                Category
                <select value={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value })} className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none">
                  {productCategories.filter((category) => category !== 'All').map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="space-y-2 text-sm text-charcoal">
                Price
                <input type="number" value={formData.price} min="0" onChange={(event) => setFormData({ ...formData, price: Number(event.target.value) })} className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none focus:border-brown" />
              </label>
              <label className="space-y-2 text-sm text-charcoal">
                Discount %
                <input type="number" value={formData.discount} min="0" max="100" onChange={(event) => setFormData({ ...formData, discount: Number(event.target.value) })} className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none focus:border-brown" />
              </label>
              <label className="space-y-2 text-sm text-charcoal">
                Quantity
                <input type="number" value={formData.stockQuantity} min="0" onChange={(event) => setFormData({ ...formData, stockQuantity: Number(event.target.value) })} className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none focus:border-brown" />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-[160px_1fr]">
              <div className="aspect-square overflow-hidden rounded-3xl border border-brown/10 bg-cream">
                {formData.image ? (
                  <img src={formData.image} alt="Product preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-charcoal/50">
                    No image
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <label className="space-y-2 text-sm text-charcoal">
                  Image URL
                  <input type="url" value={formData.image} onChange={(event) => setFormData({ ...formData, image: event.target.value })} className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none focus:border-brown" />
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-brown/15 bg-white px-4 py-2 text-xs font-semibold text-brown transition hover:bg-brown/5">
                  <Upload size={15} />
                  {imageUploading ? 'Uploading...' : 'Upload product image'}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    disabled={imageUploading || isSaving}
                    onChange={(event) => uploadProductImage(event.target.files?.[0])}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <label className="space-y-2 text-sm text-charcoal">
              Description
              <textarea value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} rows="4" className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none focus:border-brown" />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="inline-flex items-center gap-3 rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm">
                <input type="checkbox" checked={formData.featured} onChange={(event) => setFormData({ ...formData, featured: event.target.checked })} className="h-4 w-4 rounded border-brown/30 text-brown" />
                Mark as featured
              </label>
              <label className="inline-flex items-center gap-3 rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm">
                <input type="checkbox" checked={formData.visible} onChange={(event) => setFormData({ ...formData, visible: event.target.checked })} className="h-4 w-4 rounded border-brown/30 text-brown" />
                Toggle visibility
              </label>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
