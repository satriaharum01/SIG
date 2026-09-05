import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDashboard } from "../../services/dashboardService";


import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/dashboard/StatCard";
import UpdateCard from "../../components/dashboard/UpdateCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import TransactionList from "../../components/dashboard/TransactionList";
import ProductOverview from "../../components/dashboard/ProductOverview";
import PerformanceChart from "../../components/dashboard/PerformanceChart";
import PromoBanner from "../../components/dashboard/PromoBanner";

const emptyData = {
  stats: {
    netIncome: { value: "", trend: "" },
    totalReturn: { value: "", trend: "" },
  },
  revenue: { value: "", trend: "", income: [], expenses: [], categories: [] },
  transactions: [],
  products: [],
  performance: { viewCount: 0, percentage: 0, sales: 0 },
};

export default function Dashboard() {
  const { logout } = useAuth();

  function keluar() {
    logout();
    window.location.href = "/";
  }

  const [data, setData] = useState(emptyData);
  // LOAD FROM DATABASE/API: aktifkan pemanggilan ini ketika endpoint Express siap.
  useEffect(() => {
    // getDashboard().then(setData).catch(console.error);
  }, []);
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="An easy way to manage sales with care and precision."
      />
      <div className="row g-4">
        <div className="col-12">
          <div className="row g-4">
            <div className="col-md-4">
              <UpdateCard />
            </div>
            <div className="col-md-4">
              <StatCard
                label="Net Income"
                value={data.stats.netIncome.value}
                trend={data.stats.netIncome.trend}
              />
            </div>
            <div className="col-md-4">
              <StatCard
                label="Total Return"
                value={data.stats.totalReturn.value}
                trend={data.stats.totalReturn.trend}
                trendType="down"
              />
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-8">
          <div className="row g-4">
            <div className="col-12">
              <div className="card mb-0">
                <div className="card-header mb-2">
                  <h2 className="card-title">Revenue</h2>
                </div>
                <div className="d-flex align-items-baseline gap-2 mb-3">
                  <span className="stat-value-amount">
                    {data.revenue.value}
                  </span>
                  <span className="trend-badge trend-up fs-xs">
                    {data.revenue.trend}
                  </span>
                </div>
                <RevenueChart data={data.revenue} />
              </div>
            </div>
            <div className="col-md-7 d-flex flex-column">
              <TransactionList transactions={data.transactions} />
            </div>
            <div className="col-md-5 d-flex flex-column">
              <ProductOverview products={data.products} />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4">
          <div className="right-panel-wrapper d-flex flex-column gap-4 h-100">
            <PerformanceChart data={data.performance} />
            <PromoBanner />
          </div>
        </div>
      </div>
    </>
  );
}
