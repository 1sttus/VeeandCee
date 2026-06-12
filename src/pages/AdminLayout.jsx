import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Boxes, ArrowLeft } from 'lucide-react';
import MobileNav from '../components/MobileNav';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
  { icon: Boxes, label: 'Inventory', path: '/admin/inventory' },
  { icon: Users, label: 'Customers', path: '/admin/customers' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-cream/30 flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-white/40 backdrop-blur-xl border-r border-brown/10 p-6">
        <div className="mb-10 px-4">
          <h2 className="font-serif text-2xl font-bold text-brown">V&C Console</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/50">Luxury Management</p>
        </div>
        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive 
                    ? 'bg-brown text-white shadow-lg shadow-brown/20' 
                    : 'text-charcoal/70 hover:bg-brown/5 hover:text-brown'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto">
          <Link to="/" className="flex items-center gap-2 text-sm text-charcoal/50 hover:text-brown transition-colors">
            <ArrowLeft size={16} /> Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen relative">
        <div className="p-4 sm:p-8 lg:p-12 pb-32">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}