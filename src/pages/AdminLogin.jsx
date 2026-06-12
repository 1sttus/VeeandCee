import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@veeandcee.com";
  const ADMIN_PASSWORD = "VeeAndCee@2026";

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminSession = {
        authenticated: true,
        email: email,
        timestamp: new Date().getTime()
      };

      localStorage.setItem("adminAuth", JSON.stringify(adminSession));
      navigate('/admin');
    } else {
      setError('Invalid administrative credentials. Access denied.');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_rgba(201,169,97,0.12),transparent_40%)]">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl rounded-3xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-brown mb-2">V&C Console</h1>
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal/60 font-medium">Administrative Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-rose/10 border border-rose/20 text-rose text-xs py-3 px-4 rounded-xl animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-brown uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/50 border border-brown/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-brown transition-colors"
                  placeholder="admin@veeandcee.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-brown uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/50 border border-brown/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-brown transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 ml-1">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-brown/20 text-brown focus:ring-brown/20 bg-white/50"
              />
              <label htmlFor="remember" className="text-sm text-charcoal/70 cursor-pointer select-none">
                Remember Login
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-brown text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-dark-brown transition-all shadow-lg shadow-brown/20 group"
            >
              Enter Console
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}