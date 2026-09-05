import Chart from "react-apexcharts";
export default function RevenueChart({ data }) {
  const categories = data?.categories || [];
  const series = [{ name: "Income", data: data?.income || [] }, { name: "Expenses", data: data?.expenses || [] }];
  const options = { chart: { toolbar: { show: false } }, stroke: { curve: "smooth", width: 3 }, xaxis: { categories }, legend: { show: false }, dataLabels: { enabled: false } };
  return <div id="revenue-chart"><Chart options={options} series={series} type="area" height={280} /></div>;
}
