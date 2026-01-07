import { useState } from "react";
import {
  Bug,
  Lightbulb,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Github,
  Mail,
  Twitter,
  Image as ImageIcon,
  Paperclip,
  X,
  Zap,
} from "lucide-react";

const FeedbackPage = () => {
  const [feedbackType, setFeedbackType] = useState("bug");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    priority: "medium",
    category: "",
  });
  const [attachments, setAttachments] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const feedbackTypes = [
    {
      id: "bug",
      label: "Report a Bug",
      icon: Bug,
      color: "from-red-400 to-red-600",
      bgColor: "from-red-50 to-pink-50",
      description: "Found something broken? Let us know!",
    },
    {
      id: "feature",
      label: "Request Feature",
      icon: Lightbulb,
      color: "from-amber-400 to-orange-500",
      bgColor: "from-amber-50 to-orange-50",
      description: "Have an idea? We'd love to hear it!",
    },
    {
      id: "feedback",
      label: "General Feedback",
      icon: MessageSquare,
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-50 to-cyan-50",
      description: "Share your thoughts with us",
    },
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-600" },
    { value: "medium", label: "Medium", color: "bg-amber-100 text-amber-600" },
    { value: "high", label: "High", color: "bg-red-100 text-red-600" },
  ];

  const categories = {
    bug: [
      "UI/UX Issue",
      "Performance",
      "Data Sync",
      "Extension",
      "Dashboard",
      "Other",
    ],
    feature: [
      "Dashboard",
      "Extension",
      "AI Insights",
      "Analytics",
      "Mobile App",
      "Integration",
      "Other",
    ],
    feedback: [
      "User Experience",
      "Design",
      "Performance",
      "Documentation",
      "General",
      "Other",
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          title: "",
          description: "",
          priority: "medium",
          category: "",
        });
        setAttachments([]);
      }, 3000);
    }, 1500);
  };

  const selectedType = feedbackTypes.find((type) => type.id === feedbackType);

  if (submitted) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl p-12 border-2 border-gray-900 shadow-xl text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-green-400 to-green-600 rounded-full mb-6 border-2 border-gray-900 shadow-lg animate-bounce">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Thank You, Yuvraj! 🎉
            </h2>
            <p className="text-lg text-gray-600 font-semibold mb-6">
              Your{" "}
              {feedbackType === "bug"
                ? "bug report"
                : feedbackType === "feature"
                ? "feature request"
                : "feedback"}{" "}
              has been received successfully!
            </p>
            <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-gray-900 mb-6">
              <p className="text-sm font-bold text-gray-900 mb-2">
                What happens next?
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Our team in Paris 🇫🇷 will review your submission within 24-48
                hours. We'll send you an email at{" "}
                <span className="font-bold text-amber-600">
                  {formData.email}
                </span>{" "}
                with updates.
              </p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="px-8 py-3 bg-linear-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-gray-900 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-900"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 pt-30 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-amber-400 to-orange-400 rounded-2xl mb-6 border-2 border-gray-900 shadow-lg">
            <Sparkles className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Help Us Improve Mora
          </h1>
          <p className="text-xl text-gray-600 font-semibold max-w-2xl mx-auto">
            Your feedback shapes the future of productivity tracking. Report
            bugs, request features, or share your thoughts!
          </p>
        </div>

        {/* Feedback Type Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {feedbackTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFeedbackType(type.id)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                feedbackType === type.id
                  ? "border-gray-900 shadow-xl scale-105 bg-linear-to-br " +
                    type.bgColor
                  : "border-gray-900 shadow-lg hover:shadow-xl bg-white hover:scale-102"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${type.color} flex items-center justify-center mb-4 border-2 border-gray-900 shadow-md mx-auto`}
              >
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">
                {type.label}
              </h3>
              <p className="text-sm text-gray-600 font-semibold">
                {type.description}
              </p>
              {feedbackType === type.id && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-900 shadow-xl">
          <div
            className={`bg-linear-to-br ${selectedType.bgColor} rounded-xl p-6 mb-8 border-2 border-gray-900`}
          >
            <div className="flex items-center gap-3 mb-3">
              <selectedType.icon className="w-6 h-6 text-gray-900" />
              <h2 className="text-2xl font-black text-gray-900">
                {selectedType.label}
              </h2>
            </div>
            <p className="text-sm font-semibold text-gray-700">
              {feedbackType === "bug" &&
                "Please provide as much detail as possible to help us reproduce and fix the issue."}
              {feedbackType === "feature" &&
                "Describe your feature idea and how it would improve your Mora experience."}
              {feedbackType === "feedback" &&
                "We value your opinion! Share any thoughts, suggestions, or comments."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-black text-gray-900 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Yuvraj Karna"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-900 focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 outline-none font-semibold text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="yuvraj@mora.app"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-900 focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 outline-none font-semibold text-gray-900 bg-white"
                />
              </div>
            </div>

            {/* Category & Priority */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-black text-gray-900 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-900 focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 outline-none font-semibold text-gray-900 bg-white"
                >
                  <option value="">Select a category</option>
                  {categories[feedbackType].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-black text-gray-900 mb-2">
                  Priority
                </label>
                <div className="flex gap-3">
                  {priorities.map((priority) => (
                    <button
                      key={priority.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, priority: priority.value })
                      }
                      className={`flex-1 px-4 py-3 rounded-lg font-bold transition-all border-2 ${
                        formData.priority === priority.value
                          ? "border-gray-900 " + priority.color + " shadow-md"
                          : "border-gray-900 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-black text-gray-900 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder={
                  feedbackType === "bug"
                    ? "Brief description of the bug"
                    : feedbackType === "feature"
                    ? "What feature would you like?"
                    : "Summary of your feedback"
                }
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-900 focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 outline-none font-semibold text-gray-900 bg-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-black text-gray-900 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows="6"
                placeholder={
                  feedbackType === "bug"
                    ? "Steps to reproduce:\n1. Go to...\n2. Click on...\n3. See error...\n\nExpected behavior:\n\nActual behavior:"
                    : feedbackType === "feature"
                    ? "Describe your feature idea in detail. How would it work? What problem does it solve?"
                    : "Share your thoughts, suggestions, or any feedback you have about Mora"
                }
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-900 focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 outline-none font-semibold text-gray-900 bg-white resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-linear-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-gray-900 rounded-xl font-black text-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit{" "}
                  {feedbackType === "bug"
                    ? "Bug Report"
                    : feedbackType === "feature"
                    ? "Feature Request"
                    : "Feedback"}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Additional Contact Methods */}
        <div className="mt-8 bg-linear-to-br from-purple-50 via-blue-50 to-amber-50 rounded-2xl p-8 border-2 border-gray-900 shadow-lg">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Other Ways to Reach Us
            </h3>
            <p className="text-sm text-gray-600 font-semibold">
              Choose your preferred communication channel
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="mailto:feedback@mora.app"
              className="flex items-center justify-center gap-3 bg-white hover:bg-amber-50 p-5 rounded-xl border-2 border-gray-900 shadow-md hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 bg-linear-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center border-2 border-gray-900 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900">Email Us</p>
                <p className="text-xs text-gray-600 font-semibold">
                  yuvrajkarna.code@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://twitter.com/mora"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white hover:bg-amber-50 p-5 rounded-xl border-2 border-gray-900 shadow-md hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center border-2 border-gray-900 group-hover:scale-110 transition-transform">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900">Twitter/X</p>
                <p className="text-xs text-gray-600 font-semibold">
                  @yuvrajkarna
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Recent Submissions Stats */}
        {/* <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border-2 border-gray-900 shadow-lg text-center">
            <div className="text-3xl font-black text-gray-900 mb-1">247</div>
            <p className="text-xs font-bold text-gray-600">Bugs Fixed</p>
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-gray-900 shadow-lg text-center">
            <div className="text-3xl font-black text-gray-900 mb-1">89</div>
            <p className="text-xs font-bold text-gray-600">Features Added</p>
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-gray-900 shadow-lg text-center">
            <div className="text-3xl font-black text-gray-900 mb-1">1.2K</div>
            <p className="text-xs font-bold text-gray-600">Feedback Received</p>
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-gray-900 shadow-lg text-center">
            <div className="text-3xl font-black text-gray-900 mb-1">24h</div>
            <p className="text-xs font-bold text-gray-600">Avg Response Time</p>
          </div>
        </div> */}

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-2xl p-8 border-2 border-gray-900 shadow-lg">
          <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div className="bg-amber-50 p-5 rounded-xl border-2 border-gray-900">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-gray-900 mb-1">
                    How quickly will you respond?
                  </h4>
                  <p className="text-sm text-gray-700 font-semibold">
                    We aim to respond to all feedback within 24-48 hours.
                    Critical bugs are prioritized and addressed immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl border-2 border-gray-900">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-gray-900 mb-1">
                    Will my feature request be implemented?
                  </h4>
                  <p className="text-sm text-gray-700 font-semibold">
                    We review all feature requests and prioritize based on
                    community demand, feasibility, and alignment with our
                    roadmap.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-5 rounded-xl border-2 border-gray-900">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-gray-900 mb-1">
                    Can I track my submission?
                  </h4>
                  <p className="text-sm text-gray-700 font-semibold">
                    Yes! You'll receive email updates when your submission is
                    reviewed, in progress, or resolved. Check your inbox at{" "}
                    {formData.email || "your email"}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
