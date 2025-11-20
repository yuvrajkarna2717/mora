// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              mora
            </h3>
            <p className="text-gray-600">
              Master your time, maximize your productivity.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/pricing" className="text-gray-600 hover:text-black transition-colors">Pricing</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-black transition-colors">Dashboard</Link></li>
              <li><Link to="/dashboard/comparison" className="text-gray-600 hover:text-black transition-colors">Analytics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; 2025 mora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;