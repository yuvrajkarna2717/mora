// src/components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const HeroSection = () => {
  const features = [
    "Completely free to use",
    "Track browsing habits", 
    "Get AI-powered insights"
  ];

  return (
    <section className="bg-orange-50 px-8 py-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="text-sm text-gray-600">Mora in action</span>
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="bg-white rounded-full p-2 shadow-sm">
            <span className="text-lg">📊</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
          Track your browsing habits
          <br />
          <span className="relative">
            and boost productivity
            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-orange-200 -z-10 rounded-full"></div>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Monitor your browsing patterns, get AI-powered insights, and improve your focus.
          Understand where your time goes and make better decisions about your digital habits.
        </p>

        {/* Features List */}
        <div className="flex flex-col items-center gap-4 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-lg text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link 
          to="/signup"
          className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          Start Tracking Free
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;