// src/pages/Pricing.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "2.9%",
      period: "+ $0.30 per transaction",
      description: "Perfect for new extensions",
      features: [
        "Accept all major payment methods",
        "Secure payment processing",
        "Basic analytics dashboard",
        "Email support",
        "Standard integration",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Professional",
      price: "2.4%",
      period: "+ $0.30 per transaction",
      description: "For growing extensions",
      features: [
        "Everything in Starter",
        "Advanced analytics & insights",
        "Subscription management",
        "Webhook notifications",
        "Priority support",
        "Custom branding",
        "Fraud protection",
      ],
      cta: "Upgrade Now",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large-scale extensions",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom payment flows",
        "Advanced fraud protection",
        "SLA guarantee",
        "White-label solution",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50 py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start accepting payments in your browser extension today. 
            No setup fees, no monthly charges. You only pay when you earn.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl bg-white border-2 transition-all hover:shadow-xl ${
                plan.popular 
                  ? "border-orange-400 shadow-lg scale-105" 
                  : "border-gray-100 hover:border-orange-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                </div>
                <p className="text-gray-600">{plan.period}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`block w-full py-4 text-center font-semibold rounded-2xl transition-all ${
                  plan.popular
                    ? "bg-orange-400 hover:bg-orange-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl p-8 max-w-4xl mx-auto border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to monetize your extension?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of developers already earning with ExtensionPay
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
            >
              Start Earning Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;