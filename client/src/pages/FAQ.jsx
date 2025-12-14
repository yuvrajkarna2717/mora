// src/pages/FAQ.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I integrate ExtensionPay into my browser extension?",
      answer: "Integration takes less than 5 minutes. Simply install our SDK, add your API key, and start accepting payments. We provide detailed documentation and code examples for Chrome, Firefox, and Safari extensions."
    },
    {
      question: "What payment methods do you support?",
      answer: "We support all major credit cards, PayPal, Apple Pay, Google Pay, and various international payment methods. Payments are processed securely through our PCI-compliant infrastructure."
    },
    {
      question: "How much does ExtensionPay cost?",
      answer: "We charge a simple 2.9% + $0.30 per successful transaction. No monthly fees, no setup costs, no hidden charges. You only pay when you earn."
    },
    {
      question: "Can I offer subscriptions and one-time payments?",
      answer: "Yes! ExtensionPay supports both one-time payments and recurring subscriptions (monthly, yearly, or custom intervals). You can also offer free trials and promotional pricing."
    },
    {
      question: "How do I handle refunds and disputes?",
      answer: "Our dashboard provides easy refund management. You can process full or partial refunds with one click. We also help handle payment disputes and chargebacks automatically."
    },
    {
      question: "Is my customer data secure?",
      answer: "Absolutely. We're PCI DSS Level 1 compliant and use bank-level encryption. Customer payment data never touches your servers - it's processed securely through our infrastructure."
    }
  ];

  return (
    <div className="min-h-screen bg-orange-50 py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about ExtensionPay
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help.
          </p>
          <a 
            href="mailto:support@extensionpay.com"
            className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-8 py-4 rounded-full font-semibold transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;