import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

function DashboardCharts({ dailySales, dailyImports, salesByLocation, importsByLocation }) {
  // แปลงข้อมูลสำหรับกราฟแท่งยอดขายแยกตามสาขา
  const salesByLocationData = {
    labels: Object.keys(salesByLocation),
    datasets: {
      label: "ยอดขาย",
      data: Object.values(salesByLocation),
    },
  };

  // แปลงข้อมูลสำหรับกราฟแท่งยอดนำเข้าแยกตามสาขา
  const importsByLocationData = {
    labels: Object.keys(importsByLocation),
    datasets: {
      label: "ยอดนำเข้า",
      data: Object.values(importsByLocation),
    },
  };

  // แปลงข้อมูลสำหรับกราฟเส้นยอดขายรายวัน
  const dailySalesData = {
    labels: Object.keys(dailySales),
    datasets: {
      label: "ยอดขาย",
      data: Object.values(dailySales),
    },
  };

  // แปลงข้อมูลสำหรับกราฟเส้นยอดนำเข้าตามวัน
  const dailyImportsData = {
    labels: Object.keys(dailyImports),
    datasets: {
      label: "ยอดนำเข้า",
      data: Object.values(dailyImports),
    },
  };

  return (
    <MDBox mt={4.5}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <MDBox>
          <ReportsBarChart
            color="info"
            title="ยอดขายแยกตามสาขา"
            description="ยอดขายรวมของแต่ละสาขา"
            date="อัพเดทล่าสุด"
            chart={salesByLocationData}
          />
        </MDBox>
        <MDBox>
          <ReportsBarChart
            color="success"
            title="ยอดนำเข้าแยกตามสาขา"
            description="ยอดนำเข้าสินค้าของแต่ละสาขา"
            date="อัพเดทล่าสุด"
            chart={importsByLocationData}
          />
        </MDBox>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox>
          <ReportsLineChart
            color="info"
            title="ยอดขายรายวัน"
            description="ยอดขายรวมรายวัน"
            date="อัพเดทล่าสุด"
            chart={dailySalesData}
          />
        </MDBox>
        <MDBox>
          <ReportsLineChart
            color="success"
            title="ยอดนำเข้าตามวัน"
            description="ยอดนำเข้าสินค้าตามวัน"
            date="อัพเดทล่าสุด"
            chart={dailyImportsData}
          />
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

DashboardCharts.propTypes = {
  dailySales: PropTypes.object.isRequired,
  dailyImports: PropTypes.object.isRequired,
  salesByLocation: PropTypes.object.isRequired,
  importsByLocation: PropTypes.object.isRequired,
};

export default DashboardCharts;
