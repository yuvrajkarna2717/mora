import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  BarChart3,
  Filter,
  Brain,
  Loader,
  TrendingUp,
  Globe,
  Eye,
  Zap,
  Target,
  Award,
  ArrowUp,
  ArrowDown,
  Activity,
  Sparkles,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const ExtensionDashboard = () => {
  const [extensionData, setExtensionData] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    fetchExtensionData();
  }, []);

  const fetchExtensionData = async () => {
    try {
      console.log("Fetching extension data...");

      const response = await new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 3;

        const handleMessage = (event) => {
          if (event.data.type === "EXTENSION_DATA_RESPONSE") {
            console.log("Received extension data:", event.data);
            window.removeEventListener("message", handleMessage);
            resolve(event.data);
          }
        };

        const tryFetch = () => {
          attempts++;
          console.log(`Attempt ${attempts} to fetch extension data`);

          window.addEventListener("message", handleMessage);
          window.postMessage({ type: "GET_EXTENSION_DATA" }, "*");

          setTimeout(() => {
            window.removeEventListener("message", handleMessage);

            if (attempts < maxAttempts) {
              console.log(`Attempt ${attempts} failed, retrying...`);
              setTimeout(tryFetch, 500);
            } else {
              console.log("All attempts failed, using sample data");
              resolve({
                data: {
                  "Thu Dec 26 2025": {
                    "github.com": 7200000,
                    "stackoverflow.com": 3600000,
                    "chatgpt.com": 2700000,
                    "youtube.com": 1800000,
                    "twitter.com": 900000,
                    "reddit.com": 600000,
                    "docs.google.com": 1200000,
                    "linkedin.com": 450000,
                  },
                },
              });
            }
          }, 1000);
        };

        tryFetch();
      });

      if (response.data && Object.keys(response.data).length > 0) {
        console.log("Setting extension data:", response.data);
        setExtensionData(response.data);
        const dates = Object.keys(response.data).sort(
          (a, b) => new Date(b) - new Date(a)
        );
        setAvailableDates(dates);
        if (dates.length > 0) {
          setSelectedDate(dates[0]);
        }
        console.log(
          "Extension data loaded:",
          Object.keys(response.data).length,
          "dates"
        );
      } else {
        console.log("No extension data received, keeping current state");
      }
    } catch (error) {
      console.error("Failed to fetch extension data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const categorizeWebsite = (domain) => {
    const categories = {
      productive: [
        "github.com",
        "stackoverflow.com",
        "docs.google.com",
        "linkedin.com",
        "medium.com",
        "dev.to",
      ],
      learning: ["chatgpt.com", "coursera.org", "udemy.com", "khanacademy.org"],
      social: ["twitter.com", "facebook.com", "instagram.com", "tiktok.com"],
      entertainment: ["youtube.com", "netflix.com", "reddit.com", "twitch.tv"],
    };

    for (const [category, domains] of Object.entries(categories)) {
      if (domains.some((d) => domain.includes(d))) {
        return category;
      }
    }
    return "other";
  };

  const getCategoryColor = (category) => {
    const colors = {
      productive: {
        bg: "from-green-400 to-emerald-500",
        text: "text-green-600",
        light: "bg-green-100",
      },
      learning: {
        bg: "from-blue-400 to-blue-600",
        text: "text-blue-600",
        light: "bg-blue-100",
      },
      social: {
        bg: "from-purple-400 to-purple-600",
        text: "text-purple-600",
        light: "bg-purple-100",
      },
      entertainment: {
        bg: "from-orange-400 to-red-500",
        text: "text-orange-600",
        light: "bg-orange-100",
      },
      other: {
        bg: "from-gray-400 to-gray-600",
        text: "text-gray-600",
        light: "bg-gray-100",
      },
    };
    return colors[category] || colors.other;
  };

  const selectedDateData = selectedDate
    ? extensionData[selectedDate] || {}
    : {};
  const sortedDomains = Object.entries(selectedDateData)
    .filter(
      ([domain]) =>
        domain && domain !== "null" && domain !== "newtab" && domain !== ""
    )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const totalTime = Object.values(selectedDateData).reduce(
    (sum, time) => sum + time,
    0
  );

  // Category breakdown
  const categoryBreakdown = {};
  Object.entries(selectedDateData).forEach(([domain, time]) => {
    const category = categorizeWebsite(domain);
    categoryBreakdown[category] = (categoryBreakdown[category] || 0) + time;
  });

  const categoryChartData = Object.entries(categoryBreakdown).map(
    ([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.floor(value / 60000), // Convert to minutes
      color: getCategoryColor(name).bg,
    })
  );

  // Weekly trend data
  const weeklyTrendData = availableDates
    .slice(0, 7)
    .reverse()
    .map((date) => {
      const dayData = extensionData[date] || {};
      const totalMinutes =
        Object.values(dayData).reduce((sum, time) => sum + time, 0) / 60000;
      return {
        date: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        hours: (totalMinutes / 60).toFixed(1),
      };
    });

  // Top productive vs distracting
  const productiveTime = Object.entries(selectedDateData)
    .filter(([domain]) =>
      ["productive", "learning"].includes(categorizeWebsite(domain))
    )
    .reduce((sum, [, time]) => sum + time, 0);

  const distractingTime = Object.entries(selectedDateData)
    .filter(([domain]) =>
      ["social", "entertainment"].includes(categorizeWebsite(domain))
    )
    .reduce((sum, [, time]) => sum + time, 0);

  const productivityScore =
    totalTime > 0 ? Math.round((productiveTime / totalTime) * 100) : 0;

  const getAIInsights = async () => {
    if (
      !selectedDate ||
      !selectedDateData ||
      Object.keys(selectedDateData).length === 0
    )
      return;

    setLoadingInsights(true);
    try {
      let authToken = localStorage.getItem("authToken");

      if (!authToken) {
        const authResponse = await new Promise((resolve) => {
          const handleMessage = (event) => {
            if (event.data.type === "EXTENSION_AUTH_RESPONSE") {
              window.removeEventListener("message", handleMessage);
              resolve(event.data);
            }
          };

          window.addEventListener("message", handleMessage);
          window.postMessage({ type: "GET_EXTENSION_AUTH" }, "*");

          setTimeout(() => {
            window.removeEventListener("message", handleMessage);
            resolve({ token: null });
          }, 1000);
        });

        authToken = authResponse.token;
      }

      if (!authToken) {
        console.error("No auth token available");
        return;
      }

      const response = await fetch(
        "http://localhost:3001/api/insights/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            date: selectedDate,
            data: selectedDateData,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setInsights(data);
      } else {
        console.error("Failed to get insights:", response.status);
      }
    } catch (error) {
      console.error("Failed to get AI insights:", error);
    } finally {
      setLoadingInsights(false);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(extensionData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mora-data-\${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-bold text-gray-900">
          Loading your browsing data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 pt-30 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl flex items-center justify-center border-2 border-gray-900 shadow-lg">
                <BarChart3 className="w-6 h-6 text-gray-900" />
              </div>
              <h1 className="text-4xl font-black text-gray-900">
                Extension Dashboard
              </h1>
            </div>
            <p className="text-lg text-gray-600 font-medium ml-15">
              Track and analyze your browsing patterns
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchExtensionData}
              className="px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-bold transition-all border-2 border-gray-900 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={exportData}
              className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-amber-50 rounded-xl font-bold transition-all border-2 border-gray-900 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-900 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <label className="text-sm font-bold text-gray-900">
                SELECT DATE:
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2.5 border-2 border-gray-900 rounded-lg focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 font-semibold text-gray-900 bg-white"
              >
                <option value="">Choose a date</option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>

            {selectedDate && (
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <Activity className="w-4 h-4" />
                <span>{availableDates.length} days of data available</span>
              </div>
            )}
          </div>
        </div>

        {!selectedDate ? (
          <div className="bg-white rounded-2xl p-12 border-2 border-gray-900 shadow-lg text-center">
            <Calendar className="w-20 h-20 text-amber-400 mx-auto mb-6" />
            <h2 className="text-2xl font-black text-gray-900 mb-3">
              Select a Date to Begin
            </h2>
            <p className="text-gray-600 font-medium mb-6">
              Choose from {availableDates.length} available dates to view your
              browsing insights
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Extension is connected and tracking</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl border-2 border-gray-900 shadow-lg hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-2 border-gray-900 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    TOTAL
                  </span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-1">
                  {formatTime(totalTime)}
                </h3>
                <p className="text-sm font-semibold text-gray-600">
                  Total Browsing Time
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-gray-900 shadow-lg hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center border-2 border-gray-900 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    +{productivityScore}%
                  </span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-1">
                  {formatTime(productiveTime)}
                </h3>
                <p className="text-sm font-semibold text-gray-600">
                  Productive Time
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-gray-900 shadow-lg hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center border-2 border-gray-900 group-hover:scale-110 transition-transform">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                    -{100 - productivityScore}%
                  </span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-1">
                  {formatTime(distractingTime)}
                </h3>
                <p className="text-sm font-semibold text-gray-600">
                  Distracting Time
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-400 to-orange-400 p-6 rounded-2xl border-2 border-gray-900 shadow-lg hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border-2 border-gray-900 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6 text-gray-900" />
                  </div>
                  <span className="text-xs font-bold text-gray-900 bg-white px-3 py-1 rounded-full">
                    SITES
                  </span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-1">
                  {Object.keys(selectedDateData).length}
                </h3>
                <p className="text-sm font-bold text-gray-800">
                  Websites Visited
                </p>
              </div>
            </div>

            {/* Productivity Score Card */}
            <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-amber-50 rounded-2xl p-8 border-2 border-gray-900 shadow-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-xl flex items-center justify-center border-2 border-gray-900">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">
                        Productivity Score
                      </h3>
                      <p className="text-sm font-semibold text-gray-600">
                        Based on your browsing patterns
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end gap-4">
                    <div className="text-6xl font-black text-gray-900">
                      {productivityScore}%
                    </div>
                    <div className="mb-2">
                      {productivityScore >= 70 ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <ArrowUp className="w-5 h-5" />
                          <span className="font-bold">Excellent!</span>
                        </div>
                      ) : productivityScore >= 50 ? (
                        <div className="flex items-center gap-2 text-amber-600">
                          <Activity className="w-5 h-5" />
                          <span className="font-bold">Good</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <ArrowDown className="w-5 h-5" />
                          <span className="font-bold">Needs Improvement</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 w-full h-4 rounded-full bg-white border-2 border-gray-900 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 via-amber-400 to-red-400 transition-all duration-500"
                      style={{ width: `${productivityScore}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={getAIInsights}
                  disabled={loadingInsights}
                  className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-amber-50 rounded-xl font-bold transition-all border-2 border-gray-900 shadow-lg hover:shadow-xl flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingInsights ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5" />
                      Get AI Insights
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Insights */}
            {insights && (
              <div className="bg-white rounded-2xl p-8 border-2 border-gray-900 shadow-lg animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center border-2 border-gray-900">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">
                      AI Insights for {insights.date}
                    </h2>
                    <p className="text-sm font-semibold text-gray-600">
                      Powered by advanced analytics
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed font-medium">
                      {insights.insights}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Breakdown */}
              <div className="bg-white p-6 rounded-2xl border-2 border-gray-900 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
                    <PieChartIcon className="w-5 h-5 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">
                    Category Breakdown
                  </h3>
                </div>

                {categoryChartData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={categoryChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={90}
                          dataKey="value"
                          strokeWidth={3}
                          stroke="#000"
                        >
                          {categoryChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={`url(#gradient-${index})`}
                            />
                          ))}
                        </Pie>
                        <defs>
                          {categoryChartData.map((entry, index) => (
                            <linearGradient
                              key={index}
                              id={`gradient-${index}`}
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor={entry.color
                                  .split(" ")[0]
                                  .replace("from-", "#")}
                              />
                              <stop
                                offset="100%"
                                stopColor={entry.color
                                  .split(" ")[1]
                                  .replace("to-", "#")}
                              />
                            </linearGradient>
                          ))}
                        </defs>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "2px solid #000",
                            borderRadius: "12px",
                            fontWeight: "bold",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                      {categoryChartData.map((cat, idx) => {
                        const category = cat.name.toLowerCase();
                        const colors = getCategoryColor(category);
                        return (
                          <div
                            key={idx}
                            className={`${colors.light} p-3 rounded-lg border-2 border-gray-900`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div
                                className={`w-3 h-3 rounded-full bg-gradient-to-br ${colors.bg} border-2 border-gray-900`}
                              ></div>
                              <span className="text-sm font-bold text-gray-900">
                                {cat.name}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-gray-600">
                              {cat.value} minutes
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <PieChartIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="font-semibold">No category data available</p>
                  </div>
                )}
              </div>

              {/* Weekly Trend */}
              <div className="bg-white p-6 rounded-2xl border-2 border-gray-900 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
                    <Activity className="w-5 h-5 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">
                    7-Day Trend
                  </h3>
                </div>

                {weeklyTrendData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={weeklyTrendData}>
                      <defs>
                        <linearGradient
                          id="colorHours"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#f59e0b"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#f59e0b"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="date"
                        stroke="#6b7280"
                        style={{ fontWeight: "bold", fontSize: "12px" }}
                      />
                      <YAxis stroke="#6b7280" style={{ fontWeight: "bold" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "2px solid #000",
                          borderRadius: "12px",
                          fontWeight: "bold",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="hours"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorHours)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="font-semibold">
                      Not enough data for weekly trend
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Top Websites */}
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-900 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border-2 border-gray-900">
                    <Globe className="w-5 h-5 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">
                    Top 10 Websites
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>Ranked by time spent</span>
                </div>
              </div>

              {sortedDomains.length === 0 ? (
                <div className="text-center py-12">
                  <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-semibold">
                    No browsing data for this date
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedDomains.map(([domain, time], index) => {
                    const percentage = (time / totalTime) * 100;
                    const category = categorizeWebsite(domain);
                    const colors = getCategoryColor(category);

                    return (
                      <div
                        key={domain}
                        className="group hover:bg-amber-50 p-4 rounded-xl transition-all border-2 border-transparent hover:border-gray-900"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-lg font-black text-gray-900 border-2 border-gray-900 shadow-md group-hover:scale-110 transition-transform">
                            {index + 1}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-gray-900 truncate">
                                  {domain}
                                </span>
                                <span
                                  className={`text-xs font-bold px-2 py-1 rounded-full ${colors.light} ${colors.text}`}
                                >
                                  {category.toUpperCase()}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-gray-900 ml-4">
                                {formatTime(time)}
                              </span>
                            </div>

                            <div className="relative w-full h-3 rounded-full bg-gray-200 border-2 border-gray-900 overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${colors.bg} transition-all duration-500`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs font-semibold text-gray-600">
                                {percentage.toFixed(1)}% of total time
                              </span>
                              {index === 0 && (
                                <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                                  <Award className="w-3 h-3" />
                                  <span>Most Visited</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Most Productive Day */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-gray-900 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center border-2 border-gray-900">
                    <TrendingUp className="w-5 h-5 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900">
                    Most Productive
                  </h3>
                </div>
                <p className="text-3xl font-black text-gray-900 mb-1">
                  {weeklyTrendData.length > 0
                    ? weeklyTrendData.reduce((max, day) =>
                        parseFloat(day.hours) > parseFloat(max.hours)
                          ? day
                          : max
                      ).date
                    : "N/A"}
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  Peak browsing day
                </p>
              </div>

              {/* Average Daily Time */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-gray-900 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center border-2 border-gray-900">
                    <Clock className="w-5 h-5 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900">
                    Daily Average
                  </h3>
                </div>
                <p className="text-3xl font-black text-gray-900 mb-1">
                  {weeklyTrendData.length > 0
                    ? `${(
                        weeklyTrendData.reduce(
                          (sum, day) => sum + parseFloat(day.hours),
                          0
                        ) / weeklyTrendData.length
                      ).toFixed(1)}h`
                    : "N/A"}
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  Past 7 days
                </p>
              </div>

              {/* Total Sites Tracked */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-gray-900 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center border-2 border-gray-900">
                    <Globe className="w-5 h-5 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900">
                    Total Sites
                  </h3>
                </div>
                <p className="text-3xl font-black text-gray-900 mb-1">
                  {Object.keys(extensionData).reduce((total, date) => {
                    return total + Object.keys(extensionData[date]).length;
                  }, 0)}
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  All time tracking
                </p>
              </div>
            </div>

            {/* Productivity Tips */}
            <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-2xl p-8 border-2 border-gray-900 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border-2 border-gray-900 shadow-lg">
                  <Zap className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">
                    Quick Tips for Yuvraj
                  </h3>
                  <p className="text-sm font-bold text-gray-800">
                    Personalized productivity recommendations
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border-2 border-gray-900 shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center border-2 border-gray-900 flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1">
                        Focus on Development
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Your GitHub and Stack Overflow time shows great
                        engineering focus. Keep it up!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border-2 border-gray-900 shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center border-2 border-gray-900 flex-shrink-0">
                      <Brain className="w-5 h-5 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1">
                        Learning Time
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Balance coding with learning. Try dedicating 30 minutes
                        daily to tutorials.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border-2 border-gray-900 shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center border-2 border-gray-900 flex-shrink-0">
                      <Target className="w-5 h-5 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1">
                        Set Daily Goals
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Aim for 70%+ productivity score. Block distracting sites
                        during work hours.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border-2 border-gray-900 shadow-md">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-400 rounded-lg flex items-center justify-center border-2 border-gray-900 flex-shrink-0">
                      <Activity className="w-5 h-5 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1">
                        Take Breaks
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Use the Pomodoro technique: 25 minutes work, 5 minutes
                        break for optimal focus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtensionDashboard;
