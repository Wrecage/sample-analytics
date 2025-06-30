"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Sample data
const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Total Sales",
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: "#10B981",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const inventoryFlowData = {
  labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
  datasets: [
    {
      label: "Movement Frequency",
      data: [65, 59, 80, 81, 56],
      backgroundColor: [
        "rgba(16, 185, 129, 0.8)",
        "rgba(59, 130, 246, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(239, 68, 68, 0.8)",
        "rgba(139, 92, 246, 0.8)",
      ],
    },
  ],
};

const buyerSyncData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Buyer Overlap",
      data: [12, 19, 8, 15, 22, 18, 14],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
    },
  ],
};

const restockFrequencyData = {
  labels: ["Supplier A", "Supplier B", "Supplier C", "Supplier D"],
  datasets: [
    {
      label: "Restock Frequency",
      data: [8, 12, 6, 10],
      backgroundColor: "rgba(245, 158, 11, 0.8)",
    },
  ],
};

const buyerTypeData = {
  labels: ["Retail", "Reseller"],
  datasets: [
    {
      data: [65, 35],
      backgroundColor: ["#10B981", "#3B82F6"],
      borderWidth: 0,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#D4D4D4",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#D4D4D4",
      },
      grid: {
        color: "#202021",
      },
    },
    y: {
      ticks: {
        color: "#D4D4D4",
      },
      grid: {
        color: "#202021",
      },
    },
  },
};

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "#D4D4D4",
      },
    },
  },
};

export default function InventoryAnalytics() {
  const [activeTab, setActiveTab] = useState("sales");

  const tabs = [
    { id: "sales", label: "Sales" },
    { id: "inventory-flow", label: "Inventory Flow" },
    { id: "buyer-sync", label: "Buyer Sync" },
    { id: "buyers", label: "Buyers" },
    { id: "suppliers", label: "Suppliers" },
    { id: "insights", label: "Insights" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "sales":
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <select className="bg-[#202021] border border-[#D4D4D4] rounded-lg px-3 py-2 text-sm">
                <option>Select Product</option>
                <option>Product A</option>
                <option>Product B</option>
                <option>Product C</option>
              </select>
              <select className="bg-[#202021] border border-[#D4D4D4] rounded-lg px-3 py-2 text-sm">
                <option>Select Category</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home & Garden</option>
              </select>
            </div>
            <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Total Sales Over Time</h3>
              <div className="h-80">
                <Line data={salesData} options={chartOptions} />
              </div>
            </div>
          </div>
        );

      case "inventory-flow":
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <select className="bg-[#202021] border border-[#D4D4D4] rounded-lg px-3 py-2 text-sm">
                <option>Select Category</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home & Garden</option>
              </select>
              <select className="bg-[#202021] border border-[#D4D4D4] rounded-lg px-3 py-2 text-sm">
                <option>Select Product</option>
                <option>Product A</option>
                <option>Product B</option>
                <option>Product C</option>
              </select>
            </div>
            <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Inventory Movement Frequency</h3>
              <div className="h-80">
                <Bar data={inventoryFlowData} options={chartOptions} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#202021] border border-[#D4D4D4] rounded-lg p-4">
                <h4 className="font-semibold text-green-400">Most Moved</h4>
                <p className="text-sm text-gray-300">Product D (81 movements)</p>
              </div>
              <div className="bg-[#202021] border border-[#D4D4D4] rounded-lg p-4">
                <h4 className="font-semibold text-red-400">Least Moved</h4>
                <p className="text-sm text-gray-300">Product E (56 movements)</p>
              </div>
            </div>
          </div>
        );

      case "buyer-sync":
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <select className="bg-[#202021] border border-[#D4D4D4] rounded-lg px-3 py-2 text-sm">
                <option>Select Product</option>
                <option>Product A</option>
                <option>Product B</option>
                <option>Product C</option>
              </select>
              <select className="bg-[#202021] border border-[#D4D4D4] rounded-lg px-3 py-2 text-sm">
                <option>Select Category</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home & Garden</option>
              </select>
            </div>
            <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Buyer Overlap by Day</h3>
              <div className="h-80">
                <Bar data={buyerSyncData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-[#202021] border border-[#D4D4D4] rounded-lg p-4">
              <h4 className="font-semibold text-blue-400">Peak Overlap Day</h4>
              <p className="text-sm text-gray-300">Friday (22 buyers)</p>
            </div>
          </div>
        );

      case "buyers":
        return (
          <div className="space-y-6">
            <div className="bg-[#202021] border border-[#D4D4D4] rounded-lg p-4">
              <h4 className="font-semibold text-green-400">Repeat Buyer Rate</h4>
              <p className="text-2xl font-bold">68.5%</p>
            </div>
            
            <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Top Buyers</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#D4D4D4]">
                      <th className="text-left py-2">Buyer Name</th>
                      <th className="text-left py-2">Total Quantity</th>
                      <th className="text-left py-2">Total Value</th>
                      <th className="text-left py-2">Transactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#202021]">
                      <td className="py-2">John Smith</td>
                      <td className="py-2">1,250</td>
                      <td className="py-2">₱45,000</td>
                      <td className="py-2">12</td>
                    </tr>
                    <tr className="border-b border-[#202021]">
                      <td className="py-2">Maria Garcia</td>
                      <td className="py-2">890</td>
                      <td className="py-2">₱32,500</td>
                      <td className="py-2">8</td>
                    </tr>
                    <tr className="border-b border-[#202021]">
                      <td className="py-2">David Chen</td>
                      <td className="py-2">720</td>
                      <td className="py-2">₱28,750</td>
                      <td className="py-2">6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Selected Buyer Overview</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Last Purchase</p>
                    <p className="font-semibold">2024-01-15</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Items Bought</p>
                    <p className="font-semibold">1,250</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Spent</p>
                    <p className="font-semibold">₱45,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Buyer Type</p>
                    <p className="font-semibold text-blue-400">Reseller</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Purchase Frequency</h3>
                <div className="h-64">
                  <Bar data={buyerSyncData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        );

      case "suppliers":
        return (
          <div className="space-y-6">
            <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Top Suppliers</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#D4D4D4]">
                      <th className="text-left py-2">Supplier Name</th>
                      <th className="text-left py-2">Units Supplied</th>
                      <th className="text-left py-2">Total Cost</th>
                      <th className="text-left py-2">Deliveries</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#202021]">
                      <td className="py-2">ABC Electronics</td>
                      <td className="py-2">5,200</td>
                      <td className="py-2">₱125,000</td>
                      <td className="py-2">15</td>
                    </tr>
                    <tr className="border-b border-[#202021]">
                      <td className="py-2">XYZ Manufacturing</td>
                      <td className="py-2">3,800</td>
                      <td className="py-2">₱95,000</td>
                      <td className="py-2">12</td>
                    </tr>
                    <tr className="border-b border-[#202021]">
                      <td className="py-2">Global Supplies</td>
                      <td className="py-2">2,900</td>
                      <td className="py-2">₱72,500</td>
                      <td className="py-2">8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Restock Frequency</h3>
                <div className="h-64">
                  <Bar data={restockFrequencyData} options={chartOptions} />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-[#202021] border border-[#D4D4D4] rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-400">Average Unit Cost</h4>
                  <p className="text-2xl font-bold">₱24.50</p>
                  <p className="text-sm text-gray-300">Per supplier average</p>
                </div>
                <div className="bg-[#202021] border border-[#D4D4D4] rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400">Restock Trends</h4>
                  <p className="text-sm text-gray-300">Electronics: +15% this month</p>
                  <p className="text-sm text-gray-300">Clothing: -8% this month</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "insights":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#202021] border border-[#D4D4D4] rounded-lg p-4">
                <h4 className="font-semibold text-green-400">Most Reliable Partner</h4>
                <p className="text-lg font-bold">ABC Electronics</p>
                <p className="text-sm text-gray-300">15 transactions</p>
              </div>
              <div className="bg-[#202021] border border-[#D4D4D4] rounded-lg p-4">
                <h4 className="font-semibold text-blue-400">Transaction Timeline</h4>
                <p className="text-sm text-gray-300">First: 2023-01-15</p>
                <p className="text-sm text-gray-300">Latest: 2024-01-15</p>
              </div>
            </div>
            
            <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Buyer Type Breakdown</h3>
              <div className="h-64">
                <Pie data={buyerTypeData} options={pieChartOptions} />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0A0B] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Inventory Analytics</h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6 hover:bg-[#262626] transition-colors">
            <h3 className="text-sm text-gray-400 mb-2">Total Sales</h3>
            <p className="text-3xl font-bold text-green-400">₱123,000</p>
          </div>
          <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6 hover:bg-[#262626] transition-colors">
            <h3 className="text-sm text-gray-400 mb-2">Top-Selling Product</h3>
            <p className="text-3xl font-bold text-blue-400">Product A</p>
          </div>
          <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6 hover:bg-[#262626] transition-colors">
            <h3 className="text-sm text-gray-400 mb-2">Inventory Items</h3>
            <p className="text-3xl font-bold text-yellow-400">1,250</p>
          </div>
          <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6 hover:bg-[#262626] transition-colors">
            <h3 className="text-sm text-gray-400 mb-2">Repeat Buyer Rate</h3>
            <p className="text-3xl font-bold text-purple-400">68.5%</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#202021] border border-[#D4D4D4] text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#202021]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
