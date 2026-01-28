import { Link } from "react-router-dom";
import { Mail, Twitter, Linkedin, Heart, Sparkles } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://mora-5znf.onrender.com/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Successfully subscribed! 🎉');
        setEmail('');
      } else {
        setMessage(data.message || 'Failed to subscribe');
      }
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const scrollToTop = () => window.scrollTo(0, 0);
  return (
    <footer className="bg-amber-50 py-16 px-6 sm:px-8 md:px-12 lg:px-16 border-t-2 border-gray-900">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-amber-400 to-orange-400 rounded-xl flex items-center justify-center border-2 border-gray-900 shadow-lg">
                <span className="text-2xl">📊</span>
              </div>
              <span className="text-2xl font-black text-gray-900">Mora</span>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4 font-medium">
              Transform your digital habits into productivity wins.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center border-2 border-gray-900">
                <Sparkles className="w-4 h-4 text-gray-900" />
              </div>
              <span className="text-sm font-bold text-gray-900">Free</span>
            </div>
            <p className="text-xs font-semibold text-gray-600">
              Copyright © 2025 - All rights reserved
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-amber-400 rounded"></div>
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:translate-x-1 inline-block"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/backup"
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:translate-x-1 inline-block"
                >
                  Backup Data
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  onClick={scrollToTop}
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:translate-x-1 inline-block"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:translate-x-1 inline-block"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-amber-400 rounded"></div>
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/terms"
                  onClick={scrollToTop}
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:translate-x-1 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  onClick={scrollToTop}
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  onClick={scrollToTop}
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:translate-x-1 inline-block"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                {/* <Link
                  to="/gdpr"
                  onClick={scrollToTop}
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:translate-x-1 inline-block"
                >
                  GDPR
                </Link> */}
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-amber-400 rounded"></div>
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/blog"
                  onClick={scrollToTop}
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:translate-x-1 inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  onClick={scrollToTop}
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:translate-x-1 inline-block"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback"
                  onClick={scrollToTop}
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:translate-x-1 inline-block"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  onClick={scrollToTop}
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors hover:translate-x-1 inline-block"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-linear-to-br from-amber-400 via-orange-400 to-amber-500 rounded-2xl p-8 mb-12 border-2 border-gray-900 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Stay Updated with Mora
              </h3>
              <p className="text-gray-800 font-semibold">
                Get productivity tips and updates delivered to your inbox
              </p>
            </div>
            <div className="flex md:flex-row flex-col gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                className="px-4 py-3 rounded-lg border-2 border-gray-900 focus:ring-4 focus:ring-white focus:ring-opacity-50 outline-none font-semibold text-gray-900 flex-1 md:w-64"
              />
              <button 
                onClick={handleSubscribe}
                disabled={loading}
                className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-amber-50 rounded-lg font-bold transition-all border-2 border-gray-900 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Mail className="w-4 h-4" />
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </div>
          {message && (
            <div className={`mt-4 text-center font-semibold ${
              message.includes('Successfully') ? 'text-green-800' : 'text-red-800'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-gray-900 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <p className="text-gray-700 text-sm font-semibold">Built with</p>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <p className="text-gray-700 text-sm font-semibold">
                by{" "}
                <a
                  href="https://linkedin.com/in/yuvrajkarna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 font-bold underline decoration-2 decoration-amber-400"
                >
                  Yuvraj Karna
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/yuvrajkarna"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white hover:bg-gray-900 text-gray-900 hover:text-amber-50 rounded-lg border-2 border-gray-900 flex items-center justify-center transition-all shadow-md hover:shadow-lg group"
              >
                <Twitter className="w-5 h-5" />
              </a>

              <a
                href="https://linkedin.com/in/yuvrajkarna"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white hover:bg-gray-900 text-gray-900 hover:text-amber-50 rounded-lg border-2 border-gray-900 flex items-center justify-center transition-all shadow-md hover:shadow-lg group"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:yuvrajkarna.code@gmail.com"
                className="w-10 h-10 bg-white hover:bg-gray-900 text-gray-900 hover:text-amber-50 rounded-lg border-2 border-gray-900 flex items-center justify-center transition-all shadow-md hover:shadow-lg group"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-600">
              <span>🌍 Made on Earth 😂</span>
              <span>•</span>
              <span>🚀 Powered by AI</span>
              <span>•</span>
              <span>🔒 Privacy First</span>
              <span>•</span>
              <span>⚡ Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
