// src/pages/Exports.jsx
import React, { useState } from "react";
import { Download, FileText, Table, FileSpreadsheet, File } from "lucide-react";

const Exports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("last-week");
  const [selectedFormat, setSelectedFormat] = useState("pdf");

  const periods = [
    { value: "last-week", label: "Last Week" },
    { value: "last-month", label: "Last Month" },
    { value: "this-month", label: "This Month" },
    { value: "all-time", label: "All Time" },
  ];

  const formats = [
    { value: "pdf", label: "PDF", icon: <FileText className="w-5 h-5" />, color: "text-red-500" },
    { value: "excel", label: "Excel", icon: <FileSpreadsheet className="w-5 h-5" />, color: "text-green-500" },
    { value: "csv", label: "CSV", icon: <Table className="w-5 h-5" />, color: "text-blue-500" },
    { value: "docx", label: "Word", icon: <File className="w-5 h-5" />, color: "text-blue-600" },
  ];

  const handleExport = () => {
    console.log(`Exporting ${selectedPeriod} as ${selectedFormat}`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading mb-2">Export Data</h1>
          <p className="text-gray-600">Download your productivity data in multiple formats</p>
        </div>

        <div className="p-8 rounded-xl bg-white border border-gray-200">
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">Select Time Period</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {periods.map((period) => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`p-4 rounded-lg font-medium transition-all ${
                    selectedPeriod === period.value
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">Select Format</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setSelectedFormat(format.value)}
                  className={`p-4 rounded-lg font-medium transition-all flex flex-col items-center gap-2 ${
                    selectedFormat === format.value
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <span className={selectedFormat === format.value ? "text-white" : format.color}>
                    {format.icon}
                  </span>
                  <span>{format.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg mb-8 bg-gray-50">
            <h3 className="font-semibold mb-3">Export Preview</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-medium">Period:</span> {periods.find((p) => p.value === selectedPeriod)?.label}</p>
              <p><span className="font-medium">Format:</span> {formats.find((f) => f.value === selectedFormat)?.label}</p>
              <p><span className="font-medium">Includes:</span> Time tracking, productivity scores, category breakdown, top sites, AI insights</p>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="w-full py-4 bg-gray-900 text-white text-lg font-semibold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            Generate Export
          </button>
        </div>

        <div className="mt-8 p-6 rounded-xl bg-white border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Recent Exports</h2>
          <div className="space-y-3">
            {[
              { name: "November_2025_Report.pdf", date: "2025-11-15", size: "2.4 MB" },
              { name: "October_2025_Data.xlsx", date: "2025-11-01", size: "1.8 MB" },
              { name: "Q4_2025_Analytics.csv", date: "2025-10-15", size: "856 KB" },
            ].map((file, idx) => (
              <div key={idx} className="p-4 rounded-lg flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-600">{file.date} • {file.size}</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exports;