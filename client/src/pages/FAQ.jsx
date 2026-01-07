// src/pages/FAQ.jsx
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Mail,
  MessageCircle,
} from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does Mora track my browsing activity?",
      answer:
        "Mora uses a lightweight browser extension that runs in the background. It automatically records which websites you visit and how long you spend on each site. All data is processed locally and securely transmitted to your account. You have full control and can pause tracking anytime.",
    },
    {
      question: "Is my browsing data private and secure?",
      answer:
        "Absolutely. Your privacy is our top priority. All data is encrypted end-to-end, stored securely, and never shared with third parties. You own your data completely - you can export or delete it anytime. We're fully transparent about what we collect and how we use it.",
    },
    {
      question: "How much does Mora cost?",
      answer:
        "Mora is completely free to use! We believe everyone deserves access to productivity insights. There are no hidden fees, subscriptions, or premium tiers. Simply sign in with your Google account and start tracking immediately.",
    },
    {
      question: "What kind of insights will I get?",
      answer:
        "Mora provides AI-powered insights including: time spent on each website, productivity patterns throughout the day, identification of your biggest distractions, personalized recommendations to improve focus, weekly and monthly reports, and actionable tips to optimize your browsing habits.",
    },
    {
      question: "Can I use Mora on multiple devices?",
      answer:
        "Yes! Install the Mora extension on all your devices (Chrome, Firefox, Edge, Safari). Your data syncs automatically across all devices, giving you a complete picture of your digital habits wherever you browse.",
    },
    {
      question: "How do I get started with Mora?",
      answer:
        "Getting started is easy! Simply sign in with your Google account (no password needed), install the browser extension in under 60 seconds, and Mora will automatically start tracking. You'll see your first insights within minutes of browsing.",
    },
    {
      question: "Can I exclude certain websites from tracking?",
      answer:
        "Yes! You have complete control over what gets tracked. In your dashboard settings, you can add websites to your exclusion list. Banking sites, private browsing, and sensitive pages can be automatically excluded from tracking.",
    },
    {
      question: "What browsers are supported?",
      answer:
        "Mora currently supports Chrome, Firefox, Edge, Brave, and Safari. We're constantly working to expand browser compatibility. The extension works seamlessly across all supported browsers with the same features.",
    },
    {
      question: "How does the AI analyze my browsing habits?",
      answer:
        "Our AI analyzes patterns in your browsing data to identify productivity trends, distraction triggers, and optimal focus times. It learns your unique habits and provides personalized recommendations - like suggesting when to take breaks or which sites to limit during work hours.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Yes! You can export all your browsing data anytime in CSV or JSON format. This includes timestamps, websites visited, duration, categories, and AI insights. Your data belongs to you, and we make it easy to take it with you.",
    },
    {
      question: "Does Mora work offline?",
      answer:
        "The extension continues tracking even when offline. Data is stored locally and syncs automatically when you reconnect to the internet. You'll never lose tracking data due to connectivity issues.",
    },
    {
      question: "How can I delete my account and data?",
      answer:
        "You can delete your account anytime from your dashboard settings. This permanently removes all your data from our servers within 30 days. We make account deletion simple and transparent - no questions asked.",
    },
  ];

  return (
    <div className="min-h-screen bg-amber-50 pb-20 px-6 pt-30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-400 rounded-2xl mb-6 border-2 border-gray-900 shadow-lg">
            <HelpCircle className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Mora and how it helps you master
            your digital habits
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-gray-900 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 sm:px-8 py-6 text-left flex items-center justify-between hover:bg-amber-50 rounded-2xl transition-colors group"
              >
                <h3 className="text-base sm:text-lg font-bold text-gray-900 pr-4 group-hover:text-gray-800">
                  {faq.question}
                </h3>
                <div
                  className={`shrink-0 w-8 h-8 rounded-full bg-amber-100 border-2 border-gray-900 flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-900" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-900" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 sm:px-8 pb-6 animate-fadeIn">
                  <div className="pt-4 border-t-2 border-amber-100">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-linear-to-br from-amber-400 via-orange-400 to-amber-500 rounded-2xl p-8 sm:p-12 border-2 border-gray-900 shadow-xl text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-800 mb-8 font-medium">
            We're here to help! Get in touch with our support team.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:yuvrajkarna.code@gmail.com"
              className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-amber-50 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border-2 border-gray-900 w-full sm:w-auto justify-center"
            >
              <Mail className="w-5 h-5" />
              Email Support
            </a>
          </div>

          <p className="text-sm text-gray-800 mt-6 font-medium">
            Average response time: Under 2 working days
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
