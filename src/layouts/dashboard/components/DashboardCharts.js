import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import { useDashboardData } from "layouts/dashboard/data/dashboardData.js";

function DashboardCharts({ filters = {} }) {
  // ดึงข้อมูลจาก useDashboardData
  const { statistics, loading, error } = useDashboardData(filters);

  if (loading) {
    return (
      <MDBox mt={4.5}>
        <p>Loading charts...</p>
      </MDBox>
    );
  }

  if (error) {
    return (
      <MDBox mt={4.5}>
        <p>Error: {error.message}</p>
      </MDBox>
    );
  }

  // ข้อมูลสำหรับกราฟยอดขายต่อเดือน
  const monthlySalesData = {
    labels: statistics.monthlySales ? statistics.monthlySales.map((item) => item.month) : [],
    datasets: {
      label: "ยอดขาย (บาท)",
      data: statistics.monthlySales
        ? statistics.monthlySales.map((item) => item.total_sales || 0)
        : [],
    },
  };

  // ข้อมูลสำหรับกราฟยอดขายตามสาขา
  const salesByLocationData = {
    labels: statistics.salesByLocation
      ? statistics.salesByLocation.map((item) => item.location || "ไม่ระบุ")
      : [],
    datasets: {
      label: "ยอดขาย (บาท)",
      data: statistics.salesByLocation
        ? statistics.salesByLocation.map((item) => item.total_sales || 0)
        : [],
    },
  };

  // ข้อมูลสำหรับกราฟยอดขายตามชนิดสินค้า
  const salesByProductData = {
    labels: statistics.salesByProduct
      ? statistics.salesByProduct.map((item) => item.product_id || "N/A")
      : [],
    datasets: {
      label: "ยอดขาย (บาท)",
      data: statistics.salesByProduct
        ? statistics.salesByProduct.map((item) => item.total_sales || 0)
        : [],
    },
  };

  return (
    <MDBox mt={4.5}>
      <MDBox mb={3}>
        <ReportsBarChart
          color="info"
          title="ยอดขายต่อเดือน"
          description="ยอดขายรวมแยกตามเดือน (มกราคม - ธันวาคม)"
          date="อัพเดทล่าสุด"
          chart={monthlySalesData}
        />
      </MDBox>
      <MDBox mb={3}>
        <ReportsBarChart
          color="success"
          title="ยอดขายตามสาขา"
          description="ยอดขายรวมแยกตามสาขา"
          date="อัพเดทล่าสุด"
          chart={salesByLocationData}
        />
      </MDBox>
      <MDBox mb={3}>
        <ReportsBarChart
          color="primary"
          title="ยอดขายตามชนิดสินค้า"
          description="ยอดขายรวมแยกตามรหัสสินค้า"
          date="อัพเดทล่าสุด"
          chart={salesByProductData}
        />
      </MDBox>
    </MDBox>
  );
}

DashboardCharts.propTypes = {
  filters: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
  }),
};

export default DashboardCharts;
