import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, MapPin, Heart, Award, ShoppingBag } from 'lucide-react'
import MobileNav from '../components/MobileNav'

export default function Account() {
  const [activeTab, setActiveTab] = useState('overview')

  const userData = {
    name: 'Elena',
    email: 'elena@example.com',
    memberSince: 'October 2023',
    loyaltyTier: 'Gold Member',
    loyaltyPoints: 1500,
    nextTierPoints: 2000,
  }

  const recentOrders = [
    {
      id: 'VC-29384',
      date: 'Oct 12, 2024',
      status: 'Shipped',
      total: 184.00,
      items: 2,
    },
    {
      id: 'VC-28491',
      date: 'Sep 28, 2024',
      status: 'Delivered',
      total: 120.00,
      items: 1,
    },
  ]

  const addresses = [
    {
      id: 1,
      type: 'Home',
      address: '123 Beauty Lane, New York, NY 10001',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Office',
      address: '456 Glow Street, New York, NY 10002',
      isDefault: false,
    },
  ]

  return (
    <div className="pb-24 md:pb-0 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-brown mb-2">
              Welcome, {userData.name}
            </h1>
            <p className="text-charcoal/70">Your personal dashboard for ritual beauty and curated essentials.</p>
          </div>
          <button className="flex items-center gap-2 text-charcoal/70 hover:text-brown transition-colors font-medium">
            <LogOut size={20} />
            Log Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12 min-w-0">
          {/* Loyalty Tier Card */}
          <div className="bg-gradient-to-br from-gold/20 to-rose/10 p-6 rounded-lg border border-gold/30 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <Award size={24} className="text-gold" />
              <h3 className="font-serif font-bold text-brown">Loyalty Tier</h3>
            </div>
            <p className="text-lg font-serif font-bold text-brown mb-2">{userData.loyaltyTier}</p>
            <p className="text-xs text-charcoal/70">Current Status: Gold Member</p>
            <div className="mt-4 bg-white/50 rounded-full h-2 overflow-hidden">
              <div className="bg-gold h-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-charcoal/60 mt-2">{userData.loyaltyPoints} / {userData.nextTierPoints} Points</p>
          </div>

          {/* Orders Summary */}
          <div className="bg-white p-6 rounded-lg border border-brown/10 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag size={24} className="text-brown" />
              <h3 className="font-serif font-bold text-brown">Orders</h3>
            </div>
            <p className="text-2xl font-serif font-bold text-brown mb-2">12</p>
            <p className="text-xs text-charcoal/70">Total lifetime purchases</p>
          </div>

          {/* Wishlist */}
          <div className="bg-white p-6 rounded-lg border border-brown/10 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <Heart size={24} className="text-rose" />
              <h3 className="font-serif font-bold text-brown">Wishlist</h3>
            </div>
            <p className="text-2xl font-serif font-bold text-brown mb-2">5</p>
            <p className="text-xs text-charcoal/70">Saved for later</p>
          </div>

          {/* Addresses */}
          <div className="bg-white p-6 rounded-lg border border-brown/10 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={24} className="text-charcoal" />
              <h3 className="font-serif font-bold text-brown">Addresses</h3>
            </div>
            <p className="text-2xl font-serif font-bold text-brown mb-2">{addresses.length}</p>
            <p className="text-xs text-charcoal/70">Saved delivery locations</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-brown/10">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'orders', label: 'Orders' },
            { id: 'addresses', label: 'Addresses' },
            { id: 'settings', label: 'Account Settings' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-brown border-brown'
                  : 'text-charcoal/60 border-transparent hover:text-brown'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <h3 className="font-serif font-bold text-brown text-lg mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="bg-white p-4 rounded-lg border border-brown/10 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-brown mb-1">Order {order.id}</p>
                      <p className="text-xs text-charcoal/60">{order.date} • {order.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif font-bold text-brown">${order.total}</p>
                      <p className={`text-xs font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-gold'}`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif font-bold text-brown text-lg mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/shop" className="block p-3 bg-white rounded-lg border border-brown/10 hover:border-brown transition-colors font-medium text-sm text-brown">
                  Continue Shopping
                </Link>
                <Link to="/wishlist" className="block p-3 bg-white rounded-lg border border-brown/10 hover:border-brown transition-colors font-medium text-sm text-brown">
                  View Wishlist
                </Link>
                <Link to="/account" className="block p-3 bg-white rounded-lg border border-brown/10 hover:border-brown transition-colors font-medium text-sm text-brown">
                  Download Invoice
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h3 className="font-serif font-bold text-brown text-lg mb-4">All Orders</h3>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-lg border border-brown/10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="font-semibold text-brown text-lg mb-2">Order #{order.id}</p>
                      <p className="text-charcoal/70">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif font-bold text-brown text-lg mb-2">${order.total}</p>
                      <p className={`text-sm font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-gold'}`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif font-bold text-brown text-lg">Saved Addresses</h3>
              <button className="bg-brown text-white font-medium py-2 px-4 rounded-lg hover:bg-dark-brown transition-colors text-sm">
                Add New Address
              </button>
            </div>
            <div className="space-y-4">
              {addresses.map(address => (
                <div key={address.id} className="bg-white p-6 rounded-lg border border-brown/10">
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-semibold text-brown">{address.type}</p>
                    {address.isDefault && (
                      <span className="bg-gold/20 text-brown text-xs font-medium px-2 py-1 rounded">Default</span>
                    )}
                  </div>
                  <p className="text-charcoal/70 mb-4">{address.address}</p>
                  <div className="flex gap-4">
                    <button className="text-sm text-brown hover:text-gold font-medium">Edit</button>
                    <button className="text-sm text-rose hover:text-rose/80 font-medium">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <h3 className="font-serif font-bold text-brown text-lg mb-6">Account Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-brown mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue={userData.email}
                  className="w-full px-4 py-2 border border-brown/20 rounded-lg text-charcoal focus:outline-none focus:border-brown"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown mb-2">Password</label>
                <button className="text-brown font-medium text-sm hover:text-gold transition-colors">
                  Change Password
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
                <div>
                  <p className="font-medium text-brown mb-1">Email Notifications</p>
                  <p className="text-sm text-charcoal/70">Receive updates on new products and promotions</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}
      </div>

      <MobileNav />
    </div>
  )
}
