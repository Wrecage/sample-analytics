"use client";

import { useState, useMemo } from "react";
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

// Enhanced Data Structures
interface SalesData {
  productId: string;
  productName: string;
  category: string;
  sales: { date: string; amount: number }[];
}

interface InventoryData {
  productId: string;
  productName: string;
  category: string;
  movements: { date: string; quantity: number; type: 'in' | 'out' }[];
}

interface BuyerData {
  buyerId: string;
  buyerName: string;
  buyerType: 'retail' | 'reseller';
  orders: { date: string; productId: string; productName: string; category: string; quantity: number; amount: number }[];
}

// Comprehensive Sample Data
const sampleSalesData: SalesData[] = [
  {
    productId: "prod-1",
    productName: "Product A",
    category: "Electronics",
    sales: [
      { date: "2024-01", amount: 12000 },
      { date: "2024-02", amount: 19000 },
      { date: "2024-03", amount: 15000 },
      { date: "2024-04", amount: 25000 },
      { date: "2024-05", amount: 22000 },
      { date: "2024-06", amount: 30000 },
    ]
  },
  {
    productId: "prod-2",
    productName: "Product B",
    category: "Electronics",
    sales: [
      { date: "2024-01", amount: 8000 },
      { date: "2024-02", amount: 12000 },
      { date: "2024-03", amount: 10000 },
      { date: "2024-04", amount: 18000 },
      { date: "2024-05", amount: 16000 },
      { date: "2024-06", amount: 22000 },
    ]
  },
  {
    productId: "prod-3",
    productName: "Product C",
    category: "Clothing",
    sales: [
      { date: "2024-01", amount: 6000 },
      { date: "2024-02", amount: 9000 },
      { date: "2024-03", amount: 7500 },
      { date: "2024-04", amount: 12000 },
      { date: "2024-05", amount: 11000 },
      { date: "2024-06", amount: 15000 },
    ]
  },
  {
    productId: "prod-4",
    productName: "Product D",
    category: "Home & Garden",
    sales: [
      { date: "2024-01", amount: 4000 },
      { date: "2024-02", amount: 7000 },
      { date: "2024-03", amount: 5500 },
      { date: "2024-04", amount: 9000 },
      { date: "2024-05", amount: 8500 },
      { date: "2024-06", amount: 12000 },
    ]
  }
];

const sampleInventoryData: InventoryData[] = [
  {
    productId: "prod-1",
    productName: "Product A",
    category: "Electronics",
    movements: [
      { date: "2024-01", quantity: 65, type: 'in' },
      { date: "2024-02", quantity: 45, type: 'out' },
      { date: "2024-03", quantity: 80, type: 'in' },
      { date: "2024-04", quantity: 60, type: 'out' },
      { date: "2024-05", quantity: 90, type: 'in' },
      { date: "2024-06", quantity: 70, type: 'out' },
    ]
  },
  {
    productId: "prod-2",
    productName: "Product B",
    category: "Electronics",
    movements: [
      { date: "2024-01", quantity: 59, type: 'in' },
      { date: "2024-02", quantity: 40, type: 'out' },
      { date: "2024-03", quantity: 75, type: 'in' },
      { date: "2024-04", quantity: 55, type: 'out' },
      { date: "2024-05", quantity: 85, type: 'in' },
      { date: "2024-06", quantity: 65, type: 'out' },
    ]
  },
  {
    productId: "prod-3",
    productName: "Product C",
    category: "Clothing",
    movements: [
      { date: "2024-01", quantity: 80, type: 'in' },
      { date: "2024-02", quantity: 55, type: 'out' },
      { date: "2024-03", quantity: 95, type: 'in' },
      { date: "2024-04", quantity: 70, type: 'out' },
      { date: "2024-05", quantity: 105, type: 'in' },
      { date: "2024-06", quantity: 80, type: 'out' },
    ]
  },
  {
    productId: "prod-4",
    productName: "Product D",
    category: "Home & Garden",
    movements: [
      { date: "2024-01", quantity: 81, type: 'in' },
      { date: "2024-02", quantity: 60, type: 'out' },
      { date: "2024-03", quantity: 100, type: 'in' },
      { date: "2024-04", quantity: 75, type: 'out' },
      { date: "2024-05", quantity: 110, type: 'in' },
      { date: "2024-06", quantity: 85, type: 'out' },
    ]
  }
];

const sampleBuyerData: BuyerData[] = [
  {
    buyerId: "buyer-1",
    buyerName: "John Smith",
    buyerType: "reseller",
    orders: [
      { date: "2024-01-15", productId: "prod-1", productName: "Product A", category: "Electronics", quantity: 50, amount: 5000 },
      { date: "2024-02-20", productId: "prod-2", productName: "Product B", category: "Electronics", quantity: 30, amount: 3000 },
      { date: "2024-03-10", productId: "prod-1", productName: "Product A", category: "Electronics", quantity: 40, amount: 4000 },
      { date: "2024-04-05", productId: "prod-3", productName: "Product C", category: "Clothing", quantity: 25, amount: 2500 },
    ]
  },
  {
    buyerId: "buyer-2",
    buyerName: "Maria Garcia",
    buyerType: "retail",
    orders: [
      { date: "2024-01-15", productId: "prod-1", productName: "Product A", category: "Electronics", quantity: 20, amount: 2000 },
      { date: "2024-02-20", productId: "prod-3", productName: "Product C", category: "Clothing", quantity: 15, amount: 1500 },
      { date: "2024-03-10", productId: "prod-4", productName: "Product D", category: "Home & Garden", quantity: 10, amount: 1000 },
    ]
  },
  {
    buyerId: "buyer-3",
    buyerName: "David Chen",
    buyerType: "reseller",
    orders: [
      { date: "2024-01-15", productId: "prod-2", productName: "Product B", category: "Electronics", quantity: 35, amount: 3500 },
      { date: "2024-02-20", productId: "prod-1", productName: "Product A", category: "Electronics", quantity: 25, amount: 2500 },
      { date: "2024-03-10", productId: "prod-2", productName: "Product B", category: "Electronics", quantity: 30, amount: 3000 },
    ]
  }
];

// Chart Options
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
  
  // Filter States
  const [salesFilters, setSalesFilters] = useState({
    selectedProduct: "",
    selectedCategory: "",
  });

  const [inventoryFilters, setInventoryFilters] = useState({
    selectedProduct: "",
    selectedCategory: "",
  });

  const [buyerSyncFilters, setBuyerSyncFilters] = useState({
    selectedProduct: "",
    selectedCategory: "",
  });

  const tabs = [
    { id: "sales", label: "Sales" },
    { id: "inventory-flow", label: "Inventory Flow" },
    { id: "buyer-sync", label: "Buyer Sync" },
    { id: "buyers", label: "Buyers" },
    { id: "suppliers", label: "Suppliers" },
    { id: "insights", label: "Insights" },
  ];

  // Computed Data
  const categories = useMemo(() => {
    const cats = new Set(sampleSalesData.map(item => item.category));
    return Array.from(cats);
  }, []);

  const products = useMemo(() => {
    return sampleSalesData.map(item => ({
      id: item.productId,
      name: item.productName,
      category: item.category
    }));
  }, []);

  // Filtered Sales Data
  const filteredSalesData = useMemo(() => {
    let filtered = sampleSalesData;
    
    if (salesFilters.selectedCategory) {
      filtered = filtered.filter(item => item.category === salesFilters.selectedCategory);
    }
    
    if (salesFilters.selectedProduct) {
      filtered = filtered.filter(item => item.productId === salesFilters.selectedProduct);
    }
    
    return filtered;
  }, [salesFilters]);

  // Filtered Inventory Data
  const filteredInventoryData = useMemo(() => {
    let filtered = sampleInventoryData;
    
    if (inventoryFilters.selectedCategory) {
      filtered = filtered.filter(item => item.category === inventoryFilters.selectedCategory);
    }
    
    if (inventoryFilters.selectedProduct) {
      filtered = filtered.filter(item => item.productId === inventoryFilters.selectedProduct);
    }
    
    return filtered;
  }, [inventoryFilters]);

  // Filtered Buyer Data
  const filteredBuyerData = useMemo(() => {
    let filtered = sampleBuyerData;
    
    if (buyerSyncFilters.selectedCategory) {
      filtered = filtered.map(buyer => ({
        ...buyer,
        orders: buyer.orders.filter(order => order.category === buyerSyncFilters.selectedCategory)
      })).filter(buyer => buyer.orders.length > 0);
    }
    
    if (buyerSyncFilters.selectedProduct) {
      filtered = filtered.map(buyer => ({
        ...buyer,
        orders: buyer.orders.filter(order => order.productId === buyerSyncFilters.selectedProduct)
      })).filter(buyer => buyer.orders.length > 0);
    }
    
    return filtered;
  }, [buyerSyncFilters]);

  // Chart Data Generators
  const generateSalesChartData = (data: SalesData[]) => {
    if (data.length === 0) return { labels: [], datasets: [] };
    
    if (data.length === 1) {
      // Single product trend
      const product = data[0];
      return {
        labels: product.sales.map(s => s.date),
        datasets: [{
          label: `${product.productName} Sales`,
          data: product.sales.map(s => s.amount),
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          fill: true,
          tension: 0.4,
        }]
      };
    } else {
      // Multiple products or total
      const months = data[0].sales.map(s => s.date);
      const totalSales = months.map(month => 
        data.reduce((sum, product) => {
          const monthData = product.sales.find(s => s.date === month);
          return sum + (monthData?.amount || 0);
        }, 0)
      );
      
      return {
        labels: months,
        datasets: [{
          label: salesFilters.selectedCategory ? `${salesFilters.selectedCategory} Sales` : "Total Sales",
          data: totalSales,
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          fill: true,
          tension: 0.4,
        }]
      };
    }
  };

  const generateInventoryChartData = (data: InventoryData[]) => {
    if (data.length === 0) return { labels: [], datasets: [] };
    
    const labels = data.map(item => item.productName);
    const dataValues = data.map(item => 
      item.movements.reduce((sum, movement) => sum + movement.quantity, 0)
    );
    
    return {
      labels,
      datasets: [{
        label: "Movement Frequency",
        data: dataValues,
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
      }]
    };
  };

  const generateBuyerSyncChartData = (data: BuyerData[]) => {
    // Group orders by date and count unique buyers
    const dateBuyerCount: { [key: string]: number } = {};
    
    data.forEach(buyer => {
      buyer.orders.forEach(order => {
        const date = order.date;
        if (!dateBuyerCount[date]) {
          dateBuyerCount[date] = 0;
        }
        dateBuyerCount[date]++;
      });
    });
    
    const sortedDates = Object.keys(dateBuyerCount).sort();
    
    return {
      labels: sortedDates,
      datasets: [{
        label: "Buyer Overlap",
        data: sortedDates.map(date => dateBuyerCount[date]),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      }]
    };
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "sales":
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <select 
                className="bg-[#202021] border border-[#D4D4D4] rounded-lg px-3 py-2 text-sm"
                value={salesFilters.selectedProduct}
                onChange={(e) => setSalesFilters(prev => ({ ...prev, selectedProduct: e.target.value }))}
              >
                <option value="">Select Product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
              <select 
                className="bg-[#202021] border border-[#D4D4D4] rounded-lg px-3 py-2 text-sm"
                value={salesFilters.selectedCategory}
                onChange={(e) => setSalesFilters(prev => ({ ...prev, selectedCategory: e.target.value }))}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                {salesFilters.selectedProduct 
                  ? `${products.find(p => p.id === salesFilters.selectedProduct)?.name} Sales Trend`
                  : salesFilters.selectedCategory 
                    ? `${salesFilters.selectedCategory} Sales`
                    : "Total Sales Over Time"
                }
              </h3>
              <div className="h-80">
                <Line data={generateSalesChartData(filteredSalesData)} options={chartOptions} />
              </div>
            </div>
            {salesFilters.selectedCategory && (
              <div className="bg-[#202021] border border-[#D4D4D4] rounded-lg p-4">
                <h4 className="font-semibold text-blue-400">Category Product Popularity</h4>
                <div className="mt-2 space-y-1">
                  {filteredSalesData
                    .sort((a, b) => {
                      const aTotal = a.sales.reduce((sum, s) => sum + s.amount, 0);
                      const bTotal = b.sales.reduce((sum, s) => sum + s.amount, 0);
                      return bTotal - aTotal;
                    })
                    .map(product => {
                      const total = product.sales.reduce((sum, s) => sum + s.amount, 0);
                      return (
                        <p key={product.productId} className="text-sm text-gray-300">
                          {product.productName}: ₱{total.toLocaleString()}
                        </p>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        );

      case "inventory-flow":
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <select 
                className="bg-[#202021] border border-[#D4D4D4] rounded-lg px-3 py-2 text-sm"
                value={inventoryFilters.selectedCategory}
                onChange={(e) => setInventoryFilters(prev => ({ ...prev, selectedCategory: e.target.value }))}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select 
                className="bg-[#202021] border border-[#D4D4D4] rounded-lg px-3 py-2 text-sm"
                value={inventoryFilters.selectedProduct}
                onChange={(e) => setInventoryFilters(prev => ({ ...prev, selectedProduct: e.target.value }))}
              >
                <option value="">Select Product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>
            <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                {inventoryFilters.selectedProduct 
                  ? `${products.find(p => p.id === inventoryFilters.selectedProduct)?.name} Movement`
                  : inventoryFilters.selectedCategory 
                    ? `${inventoryFilters.selectedCategory} Movement Frequency`
                    : "Inventory Movement Frequency"
                }
              </h3>
              <div className="h-80">
                <Bar data={generateInventoryChartData(filteredInventoryData)} options={chartOptions} />
              </div>
            </div>
            {filteredInventoryData.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#202021] border border-[#D4D4D4] rounded-lg p-4">
                  <h4 className="font-semibold text-green-400">Most Moved</h4>
                  <p className="text-sm text-gray-300">
                    {filteredInventoryData
                      .sort((a, b) => {
                        const aTotal = a.movements.reduce((sum, m) => sum + m.quantity, 0);
                        const bTotal = b.movements.reduce((sum, m) => sum + m.quantity, 0);
                        return bTotal - aTotal;
                      })[0]?.productName} 
                    ({filteredInventoryData
                      .sort((a, b) => {
                        const aTotal = a.movements.reduce((sum, m) => sum + m.quantity, 0);
                        const bTotal = b.movements.reduce((sum, m) => sum + m.quantity, 0);
                        return bTotal - aTotal;
                      })[0]?.movements.reduce((sum, m) => sum + m.quantity, 0)} movements)
                  </p>
                </div>
                <div className="bg-[#202021] border border-[#D4D4D4] rounded-lg p-4">
                  <h4 className="font-semibold text-red-400">Least Moved</h4>
                  <p className="text-sm text-gray-300">
                    {filteredInventoryData
                      .sort((a, b) => {
                        const aTotal = a.movements.reduce((sum, m) => sum + m.quantity, 0);
                        const bTotal = b.movements.reduce((sum, m) => sum + m.quantity, 0);
                        return aTotal - bTotal;
                      })[0]?.productName} 
                    ({filteredInventoryData
                      .sort((a, b) => {
                        const aTotal = a.movements.reduce((sum, m) => sum + m.quantity, 0);
                        const bTotal = b.movements.reduce((sum, m) => sum + m.quantity, 0);
                        return aTotal - bTotal;
                      })[0]?.movements.reduce((sum, m) => sum + m.quantity, 0)} movements)
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case "buyer-sync":
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <select 
                className="bg-[#202021] border border-[#D4D4D4] rounded-lg px-3 py-2 text-sm"
                value={buyerSyncFilters.selectedProduct}
                onChange={(e) => setBuyerSyncFilters(prev => ({ ...prev, selectedProduct: e.target.value }))}
              >
                <option value="">Select Product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
              <select 
                className="bg-[#202021] border border-[#D4D4D4] rounded-lg px-3 py-2 text-sm"
                value={buyerSyncFilters.selectedCategory}
                onChange={(e) => setBuyerSyncFilters(prev => ({ ...prev, selectedCategory: e.target.value }))}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="bg-[#161716] border border-[#D4D4D4] rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                {buyerSyncFilters.selectedProduct 
                  ? `${products.find(p => p.id === buyerSyncFilters.selectedProduct)?.name} Buyer Frequency`
                  : buyerSyncFilters.selectedCategory 
                    ? `${buyerSyncFilters.selectedCategory} Buyer Overlap`
                    : "Buyer Overlap by Date"
                }
              </h3>
              <div className="h-80">
                <Bar data={generateBuyerSyncChartData(filteredBuyerData)} options={chartOptions} />
              </div>
            </div>
            {filteredBuyerData.length > 0 && (
              <div className="bg-[#202021] border border-[#D4D4D4] rounded-lg p-4">
                <h4 className="font-semibold text-blue-400">Buyer Synchronization Details</h4>
                <div className="mt-2 space-y-2">
                  {filteredBuyerData.map(buyer => (
                    <div key={buyer.buyerId} className="text-sm text-gray-300">
                      <p className="font-medium">{buyer.buyerName} ({buyer.buyerType})</p>
                      <p className="ml-4">Orders: {buyer.orders.length} | Total: ₱{buyer.orders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                    {sampleBuyerData
                      .map(buyer => ({
                        ...buyer,
                        totalQuantity: buyer.orders.reduce((sum, order) => sum + order.quantity, 0),
                        totalValue: buyer.orders.reduce((sum, order) => sum + order.amount, 0),
                        transactionCount: buyer.orders.length
                      }))
                      .sort((a, b) => b.totalValue - a.totalValue)
                      .slice(0, 3)
                      .map(buyer => (
                        <tr key={buyer.buyerId} className="border-b border-[#202021]">
                          <td className="py-2">{buyer.buyerName}</td>
                          <td className="py-2">{buyer.totalQuantity.toLocaleString()}</td>
                          <td className="py-2">₱{buyer.totalValue.toLocaleString()}</td>
                          <td className="py-2">{buyer.transactionCount}</td>
                        </tr>
                      ))}
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
                  <Bar data={generateBuyerSyncChartData(sampleBuyerData)} options={chartOptions} />
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
                  <Bar data={{
                    labels: ["Supplier A", "Supplier B", "Supplier C", "Supplier D"],
                    datasets: [{
                      label: "Restock Frequency",
                      data: [8, 12, 6, 10],
                      backgroundColor: "rgba(245, 158, 11, 0.8)",
                    }]
                  }} options={chartOptions} />
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
                <Pie data={{
                  labels: ["Retail", "Reseller"],
                  datasets: [{
                    data: [65, 35],
                    backgroundColor: ["#10B981", "#3B82F6"],
                    borderWidth: 0,
                  }]
                }} options={pieChartOptions} />
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
