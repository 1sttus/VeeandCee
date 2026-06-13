import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Boxes, ArrowLeft, LogOut } from 'lucide-react';

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
  const navigate = useNavigate();
  let auth = null;
  try {
    auth = JSON.parse(localStorage.getItem('adminAuth'));
  } catch (e) {
    console.error("Failed to parse adminAuth from localStorage:", e);
    // auth remains null, adminEmail will default
  }
  const adminEmail = auth?.email || 'Admin User';

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate('/admin/login');
  };

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
        {/* Admin Header */}
        <header className="sticky top-0 z-10 backdrop-blur-md bg-white/30 border-b border-brown/5 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-charcoal/70 select-none">
              Connected as <span className="text-brown font-semibold">{adminEmail}</span>
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold text-rose hover:text-rose/80 transition-colors uppercase tracking-widest px-4 py-2 rounded-full bg-rose/5 border border-rose/10"
          >
            <LogOut size={14} /> Logout
          </button>
        </header>
        <div className="p-4 sm:p-8 lg:p-12 pb-32">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}