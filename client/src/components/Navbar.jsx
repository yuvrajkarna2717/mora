import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Settings,
  BarChart3,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-amber-50/95 backdrop-blur-md border-b-2 border-gray-900 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:scale-105 transition-transform group"
          >
            <div className="w-10 h-10 bg-linear-to-br from-amber-400 to-orange-400 rounded-xl flex items-center justify-center border-2 border-gray-900 shadow-md group-hover:shadow-lg transition-all">
              <span className="text-xl">📊</span>
            </div>
            <span className="text-2xl font-black">mora</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-gray-900 font-bold transition-colors relative group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full"></span>
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/backup"
                className="text-gray-700 hover:text-gray-900 font-bold transition-colors relative group"
              >
                Backup
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full"></span>
              </Link>
            )}

            <Link
              to="/privacy-policy"
              className="text-gray-700 hover:text-gray-900 font-bold transition-colors relative group"
            >
              Privacy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/faq"
              className="text-gray-700 hover:text-gray-900 font-bold transition-colors relative group"
            >
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full"></span>
            </Link>

            <Link
              to="/feedback"
              className="text-gray-700 hover:text-gray-900 font-bold transition-colors relative group"
            >
              Feedback
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://chrome.google.com/webstore/detail/mora-extension/your-extension-id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-black text-base transition-all duration-300 border-2 border-gray-900 shadow-md hover:shadow-lg hover:scale-105 whitespace-nowrap"
            >
              Add to Chrome
            </a>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white hover:bg-gray-50 rounded-xl border-2 border-gray-900 shadow-md hover:shadow-lg transition-all group"
                >
                  <div className="w-9 h-9 bg-linear-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white font-black text-sm border-2 border-gray-900 shadow-sm">
                    {user?.name?.charAt(0).toUpperCase() || "Y"}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-gray-900">
                      {user?.name || "USER"}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      profileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border-2 border-gray-900 shadow-xl overflow-hidden animate-fadeIn">
                    <div className="bg-linear-to-br from-amber-400 to-orange-400 px-4 py-3 border-b-2 border-gray-900">
                      <p className="text-sm font-black text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs font-semibold text-gray-800">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors border-b border-gray-200"
                    >
                      <User className="w-4 h-4 text-gray-700" />
                      <span className="text-sm font-bold text-gray-900">
                        My Profile
                      </span>
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors border-b border-gray-200"
                    >
                      <BarChart3 className="w-4 h-4 text-gray-700" />
                      <span className="text-sm font-bold text-gray-900">
                        Dashboard
                      </span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors border-b border-gray-200"
                    >
                      <Settings className="w-4 h-4 text-gray-700" />
                      <span className="text-sm font-bold text-gray-900">
                        Settings
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-bold text-red-600">
                        Logout
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="px-6 py-2.5 bg-linear-to-br from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-gray-900 rounded-xl font-black transition-all duration-300 shadow-md hover:shadow-xl border-2 border-gray-900 hover:scale-105"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-gray-900 hover:bg-amber-100 rounded-xl transition-colors border-2 border-gray-900 shadow-md"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t-2 border-gray-900 space-y-3 pb-4 animate-fadeIn">
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="block text-gray-700 hover:text-gray-900 font-bold py-3 hover:bg-amber-100 px-4 rounded-xl transition-colors border-2 border-transparent hover:border-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5" />
                  Dashboard
                </div>
              </Link>
            )}

            <Link
              to="/privacy-policy"
              className="block text-gray-700 hover:text-gray-900 font-bold py-3 hover:bg-amber-100 px-4 rounded-xl transition-colors border-2 border-transparent hover:border-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Privacy
            </Link>
            <Link
              to="/faq"
              className="block text-gray-700 hover:text-gray-900 font-bold py-3 hover:bg-amber-100 px-4 rounded-xl transition-colors border-2 border-transparent hover:border-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/feedback"
              className="block text-gray-700 hover:text-gray-900 font-bold py-3 hover:bg-amber-100 px-4 rounded-xl transition-colors border-2 border-transparent hover:border-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Feedback
            </Link>

            {isAuthenticated ? (
              <div className="space-y-3 pt-3 border-t-2 border-amber-200">
                <div className="flex items-center gap-3 px-4 py-4 bg-linear-to-br from-amber-400 to-orange-400 rounded-xl border-2 border-gray-900 shadow-lg">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 font-black text-lg border-2 border-gray-900 shadow-md">
                    {user?.name?.charAt(0).toUpperCase() || "Y"}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">
                      {user?.name || "USER"}
                    </p>
                  </div>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-amber-50 rounded-xl border-2 border-gray-900 shadow-md transition-all font-bold text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  My Profile
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-amber-50 rounded-xl font-black transition-all duration-300 shadow-lg border-2 border-gray-900"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="block w-full px-6 py-4 bg-linear-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-gray-900 rounded-xl font-black transition-all duration-300 shadow-lg text-center border-2 border-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
