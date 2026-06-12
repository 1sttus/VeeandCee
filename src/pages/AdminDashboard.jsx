import { useMemo, useState } from 'react'
import { Plus, Sparkles, Package, Users, TrendingUp, Search, Filter, ArrowRight, Eye, EyeOff, Trash2 } from 'lucide-react'
import StatCard from '../components/admin/StatCard'
import InventoryChart from '../components/admin/InventoryChart'
import Modal from '../components/admin/Modal'
import StatusBadge from '../components/admin/StatusBadge'

const productCategories = ['All', 'Makeup', 'Skincare', 'Body', 'Hair', 'Fragrance', 'Gift Sets']
const orderStatuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const initialProducts = [
  {
    id: 1,
    name: 'Radiant Veil Foundation',
    category: 'Makeup',
    price: 68,
    discount: 15,
    quantity: 14,
    sold: 72,
    featured: true,
    visible: true,
    description: 'Weightless finish for an even, luminous complexion.',
  },
  {
    id: 2,
    name: 'Pure Dew Cleansing Milk',
    category: 'Skincare',
    price: 32,
    discount: 0,
    quantity: 8,
    sold: 49,
    featured: false,
    visible: true,
    description: 'Gentle botanical cleanser for fresh, radiant skin.',
  },
  {
    id: 3,
    name: 'Whipped Shea Body Cream',
    category: 'Body',
    price: 48,
    discount: 10,
    quantity: 4,
    sold: 28,
    featured: false,
    visible: true,
    description: 'Rich nourishment with a luxurious satin finish.',
  },
  {
    id: 4,
    name: 'Botanical Hair Elixir',
    category: 'Hair',
    price: 52,
    discount: 20,
    quantity: 0,
    sold: 56,
    featured: true,
    visible: false,
    description: 'Strengthening treatment for polished, healthy strands.',
  },
  {
    id: 5,
    name: 'Amber Bloom Eau de Parfum',
    category: 'Fragrance',
    price: 98,
    discount: 5,
    quantity: 22,
    sold: 88,
    featured: true,
    visible: true,
    description: 'Warm amber notes for everyday luxury.',
  },
  {
    id: 6,
    name: 'Rosewood Gift Set',
    category: 'Gift Sets',
    price: 120,
    discount: 12,
    quantity: 12,
    sold: 36,
    featured: false,
    visible: true,
    description: 'Curated ritual collection for a timeless gift.',
  },
]

const initialOrders = [
  { id: 'VC-1001', customer: 'Sophia Lane', total: 218.0, status: 'Pending', date: 'Jun 10, 2026', items: 3 },
  { id: 'VC-1002', customer: 'Mia Chen', total: 142.0, status: 'Processing', date: 'Jun 9, 2026', items: 2 },
  { id: 'VC-1003', customer: 'Lena Brooks', total: 358.0, status: 'Shipped', date: 'Jun 8, 2026', items: 4 },
  { id: 'VC-1004', customer: 'Ava Harper', total: 89.0, status: 'Delivered', date: 'Jun 7, 2026', items: 1 },
  { id: 'VC-1005', customer: 'Zoe Patel', total: 192.0, status: 'Cancelled', date: 'Jun 6, 2026', items: 2 },
]

const initialCustomers = [
  { id: 1, name: 'Sophia Lane', email: 'sophia@beauty.com', orders: 12, lifetimeValue: 1240 },
  { id: 2, name: 'Mia Chen', email: 'mia@glow.com', orders: 9, lifetimeValue: 980 },
  { id: 3, name: 'Lena Brooks', email: 'lena@luxury.com', orders: 7, lifetimeValue: 820 },
  { id: 4, name: 'Ava Harper', email: 'ava@chic.com', orders: 4, lifetimeValue: 460 },
  { id: 5, name: 'Zoe Patel', email: 'zoe@style.com', orders: 6, lifetimeValue: 560 },
]

const emptyProductForm = {
  name: '',
  category: 'Makeup',
  price: 0,
  discount: 0,
  quantity: 0,
  sold: 0,
  featured: false,
  visible: true,
  description: '',
}

const formatCurrency = (value) => `$${value.toFixed(2)}`

export default function AdminDashboard() {
  const [products, setProducts] = useState(initialProducts)
  const [orders, setOrders] = useState(initialOrders)
  const [customers] = useState(initialCustomers)
  const [productSearch, setProductSearch] = useState('')
  const [productCategoryFilter, setProductCategoryFilter] = useState('All')
  const [productPage, setProductPage] = useState(1)
  const [orderStatusFilter, setOrderStatusFilter] = useState('All')
  const [customerSearch, setCustomerSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState(emptyProductForm)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  const totalProducts = products.length
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalCustomers = customers.length
  const lowStockCount = products.filter((product) => product.stockQuantity > 0 && product.stockQuantity <= 5).length
  const soldOutCount = products.filter((product) => product.stockQuantity <= 0).length

  const inventoryData = [
    { label: 'Available', value: products.reduce((sum, product) => sum + product.stockQuantity, 0) },
    { label: 'Sold', value: products.reduce((sum, product) => sum + product.sold, 0) },
    { label: 'Low Stock', value: lowStockCount },
    { label: 'Sold Out', value: soldOutCount },
  ]

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        product.category.toLowerCase().includes(productSearch.toLowerCase())
      )
      .filter((product) => productCategoryFilter === 'All' || product.category === productCategoryFilter)
  }, [products, productSearch, productCategoryFilter])

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => orderStatusFilter === 'All' || order.status === orderStatusFilter)
  }, [orders, orderStatusFilter])

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearch.toLowerCase())
    )
  }, [customers, customerSearch])

  const pageSize = 6
  const productPageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const paginatedProducts = filteredProducts.slice((productPage - 1) * pageSize, productPage * pageSize)

  const openNewProductModal = () => {
    setEditingProduct(null)
    setFormData(emptyProductForm)
    setError(null)
    setModalOpen(true)
  }

  const openEditProductModal = (product) => {
    setEditingProduct(product)
    setFormData(product)
    setError(null)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setError(null)
  }

  const saveProduct = () => {
    if (!formData.name.trim() || !formData.category.trim()) {
      setError('Product name and category are required.')
      return
    }

    setIsSaving(true)
    setTimeout(() => {
      if (editingProduct) {
        setProducts((current) => current.map((item) => (item.id === editingProduct.id ? { ...item, ...formData } : item)))
      } else {
        setProducts((current) => [
          { ...formData, id: Date.now(), sold: 0, featured: false, visible: true },
          ...current,
        ])
      }
      setIsSaving(false)
      closeModal()
    }, 350)
  }

  const deleteProduct = (productId) => {
    setProducts((current) => current.filter((item) => item.id !== productId))
  }

  const toggleFeatured = (productId) => {
    setProducts((current) => current.map((item) => (item.id === productId ? { ...item, featured: !item.featured } : item)))
  }

  const toggleVisibility = (productId) => {
    setProducts((current) => current.map((item) => (item.id === productId ? { ...item, visible: !item.visible } : item)))
  }

  const restockProduct = (productId) => {
    setProducts((current) => current.map((item) => (item.id === productId ? { ...item, quantity: Math.max(item.quantity, 10) } : item)))
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders((current) => current.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(201,169,97,0.12),transparent_40%)] pb-24 pt-8 text-charcoal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-charcoal/60">Admin Dashboard</p>
            <h1 className="mt-3 text-4xl font-serif font-bold text-brown">Vee & Cee Operations</h1>
            <p className="mt-3 max-w-2xl text-sm text-charcoal/75">Manage catalog, inventory, orders, and customer analytics from one premium control panel.</p>
          </div>
          <button
            onClick={openNewProductModal}
            className="inline-flex items-center gap-2 rounded-full bg-brown px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition hover:bg-dark-brown"
          >
            <Plus size={18} /> New Product
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <StatCard title="Total Products" value={totalProducts} label="Active catalog items" icon={Package} accent="gold" />
          <StatCard title="Total Orders" value={totalOrders} label="Orders processed" icon={TrendingUp} accent="brown" />
          <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} label="Revenue this month" icon={Sparkles} accent="rose" />
          <StatCard title="Total Customers" value={totalCustomers} label="Registered beauty lovers" icon={Users} accent="gold" />
          <StatCard title="Low In Stock" value={lowStockCount} label="Attention items" icon={Eye} accent="brown" />
          <StatCard title="Sold Out" value={soldOutCount} label="Needs restock" icon={EyeOff} accent="rose" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <InventoryChart data={inventoryData} />
          <div className="rounded-[2rem] border border-white/40 bg-white/80 p-6 shadow-[0_20px_60px_rgba(139,115,85,0.08)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-charcoal/60">Recent Orders</p>
                <h3 className="mt-3 text-2xl font-serif font-bold text-brown">Latest Purchases</h3>
              </div>
              <span className="rounded-full bg-cream px-3 py-1 text-xs text-charcoal/80">Live</span>
            </div>
            <div className="space-y-4">
              {filteredOrders.slice(0, 4).map((order) => (
                <div key={order.id} className="rounded-3xl border border-brown/10 bg-cream/60 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <p className="text-sm font-semibold text-brown">{order.customer}</p>
                      <p className="text-xs text-charcoal/70">Order {order.id} • {order.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={order.status} />
                      <span className="text-sm font-semibold text-brown">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-[2rem] border border-white/40 bg-white/85 p-6 shadow-[0_20px_60px_rgba(139,115,85,0.08)] backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-charcoal/60">Product Management</p>
              <h2 className="mt-3 text-3xl font-serif font-bold text-brown">Catalog Control</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="relative block">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/50" />
                <input
                  type="search"
                  value={productSearch}
                  onChange={(event) => { setProductSearch(event.target.value); setProductPage(1) }}
                  placeholder="Search products..."
                  className="w-full min-w-[220px] rounded-full border border-brown/20 bg-cream/70 py-3 pl-10 pr-4 text-sm text-charcoal outline-none transition focus:border-brown"
                />
              </label>
              <div className="inline-flex items-center gap-2 rounded-full border border-brown/20 bg-cream/70 px-4 py-3 text-sm text-charcoal">
                <Filter size={16} />
                <select
                  value={productCategoryFilter}
                  onChange={(event) => { setProductCategoryFilter(event.target.value); setProductPage(1) }}
                  className="bg-transparent text-sm outline-none"
                >
                  {productCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-brown/10 bg-cream/70">
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
                      <div className="text-xs text-charcoal/60">{product.description}</div>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{product.stockQuantity}</span>
                        {product.stockQuantity <= 0 ? (
                          <span className="rounded-full bg-rose/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-rose">Sold Out</span>
                        ) : product.stockQuantity <= 5 ? (
                          <span className="rounded-full bg-gold/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">Low</span>
                        ) : null}
                      </div>
                    </td>
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
                        <button
                          onClick={() => openEditProductModal(product)}
                          className="rounded-full border border-brown/10 bg-white px-3 py-2 text-xs font-semibold text-brown transition hover:bg-brown/5"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleFeatured(product.id)}
                          className="rounded-full border border-brown/10 bg-cream px-3 py-2 text-xs text-charcoal transition hover:bg-brown/5"
                        >
                          {product.featured ? 'Unfeature' : 'Feature'}
                        </button>
                        <button
                          onClick={() => toggleVisibility(product.id)}
                          className="rounded-full border border-brown/10 bg-cream px-3 py-2 text-xs text-charcoal transition hover:bg-brown/5"
                        >
                          {product.visible ? 'Hide' : 'Show'}
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="rounded-full border border-rose/30 bg-rose/10 px-3 py-2 text-xs text-rose transition hover:bg-rose/20"
                        >
                          Delete
                        </button>
                      </div>
                      <button
                        onClick={() => restockProduct(product.id)}
                        className="mt-3 rounded-full bg-brown/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-brown transition hover:bg-brown/10"
                      >
                        Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-brown/10 pt-4 text-sm text-charcoal/70">
            <span>{filteredProducts.length} products found</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setProductPage((current) => Math.max(1, current - 1))}
                disabled={productPage === 1}
                className="rounded-full border border-brown/10 bg-cream px-4 py-2 text-xs font-semibold transition hover:bg-brown/5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-xs text-charcoal">Page {productPage} of {productPageCount}</span>
              <button
                onClick={() => setProductPage((current) => Math.min(productPageCount, current + 1))}
                disabled={productPage === productPageCount}
                className="rounded-full border border-brown/10 bg-cream px-4 py-2 text-xs font-semibold transition hover:bg-brown/5 disabled:cursor-not-allowed disabled:opacity-50"
              >
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
                <h2 className="mt-3 text-2xl font-serif font-bold text-brown">Order Queue</h2>
              </div>
              <select
                value={orderStatusFilter}
                onChange={(event) => setOrderStatusFilter(event.target.value)}
                className="rounded-full border border-brown/20 bg-cream px-4 py-3 text-sm outline-none transition focus:border-brown"
              >
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="rounded-3xl border border-brown/10 bg-cream/60 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <p className="font-semibold text-brown">{order.customer}</p>
                      <p className="text-xs text-charcoal/70">{order.id} • {order.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={order.status} />
                      <span className="font-semibold text-brown">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(order.id, status)}
                        className={`rounded-full px-3 py-2 text-xs font-semibold transition ${order.status === status ? 'bg-brown text-white' : 'bg-white text-charcoal border border-brown/10 hover:bg-brown/5'}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/40 bg-white/85 p-6 shadow-[0_20px_60px_rgba(139,115,85,0.08)] backdrop-blur-xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-charcoal/60">Customer Management</p>
                <h2 className="mt-3 text-2xl font-serif font-bold text-brown">Customer Insights</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brown/20 bg-cream px-4 py-3 text-sm text-charcoal">
                <Search size={16} />
                <input
                  type="search"
                  value={customerSearch}
                  onChange={(event) => setCustomerSearch(event.target.value)}
                  placeholder="Search customers"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="rounded-3xl border border-brown/10 bg-cream/60 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <p className="font-semibold text-brown">{customer.name}</p>
                      <p className="text-xs text-charcoal/70">{customer.email}</p>
                    </div>
                    <div className="flex gap-4 text-sm text-charcoal/80">
                      <span>{customer.orders} orders</span>
                      <span>{formatCurrency(customer.lifetimeValue)}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-charcoal/70">Purchase history can be viewed from the order queue for detailed customer journeys.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Modal
          open={modalOpen}
          title={editingProduct ? 'Edit Product' : 'Create Product'}
          onClose={closeModal}
          footer={
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={closeModal}
                className="rounded-full border border-brown/10 bg-cream px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-brown/5"
              >
                Cancel
              </button>
              <button
                onClick={saveProduct}
                disabled={isSaving}
                className="rounded-full bg-brown px-5 py-3 text-sm font-semibold text-white transition hover:bg-dark-brown disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          }
        >
          <div className="space-y-5">
            {error && <div className="rounded-3xl border border-rose/20 bg-rose/10 px-4 py-3 text-sm text-rose">{error}</div>}
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-charcoal">
                Product Name
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none focus:border-brown"
                />
              </label>
              <label className="space-y-2 text-sm text-charcoal">
                Category
                <select
                  value={formData.category}
                  onChange={(event) => setFormData({ ...formData, category: event.target.value })}
                  className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none"
                >
                  {productCategories.filter((category) => category !== 'All').map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="space-y-2 text-sm text-charcoal">
                Price
                <input
                  type="number"
                  value={formData.price}
                  min="0"
                  onChange={(event) => setFormData({ ...formData, price: Number(event.target.value) })}
                  className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none focus:border-brown"
                />
              </label>
              <label className="space-y-2 text-sm text-charcoal">
                Discount %
                <input
                  type="number"
                  value={formData.discount}
                  min="0"
                  max="99"
                  onChange={(event) => setFormData({ ...formData, discount: Number(event.target.value) })}
                  className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none focus:border-brown"
                />
              </label>
              <label className="space-y-2 text-sm text-charcoal">
                Quantity
                <input
                  type="number"
                  value={formData.quantity}
                  min="0"
                  onChange={(event) => setFormData({ ...formData, quantity: Number(event.target.value) })}
                  className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none focus:border-brown"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-charcoal">
              Description
              <textarea
                value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                rows="4"
                className="w-full rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm outline-none focus:border-brown"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="inline-flex items-center gap-3 rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(event) => setFormData({ ...formData, featured: event.target.checked })}
                  className="h-4 w-4 rounded border-brown/30 text-brown"
                />
                Mark as featured
              </label>
              <label className="inline-flex items-center gap-3 rounded-3xl border border-brown/20 bg-cream px-4 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={formData.visible}
                  onChange={(event) => setFormData({ ...formData, visible: event.target.checked })}
                  className="h-4 w-4 rounded border-brown/30 text-brown"
                />
                Toggle visibility
              </label>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
