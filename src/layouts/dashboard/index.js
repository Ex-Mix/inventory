/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================
*/

// @mui material components
import { Grid } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import { useDashboardData } from "./data/dashboardData";
import DashboardCharts from "./components/DashboardCharts";

function Dashboard() {
  const { statistics = {}, charts, stock, loading, error } = useDashboardData();

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={4}>
          <MDTypography variant="h6">กำลังโหลดข้อมูล...</MDTypography>
        </MDBox>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={4}>
          <MDTypography variant="h6" color="error">
            เกิดข้อผิดพลาดในการโหลดข้อมูล: {error.message}
          </MDTypography>
        </MDBox>
      </DashboardLayout>
    );
  }

  // กำหนดค่าเริ่มต้นสำหรับ statistics
  const {
    monthlySales = [],
    salesByLocation = [],
    salesByProduct = [],
    totalImports = 0,
    totalSales = 0,
    totalLocations = 0,
    totalProducts = 0,
  } = statistics;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* สถิติรวม */}
          <Grid item xs={12} sm={6} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="shopping_cart"
                title="ยอดขายรวม"
                count={`${totalSales.toLocaleString()} บาท`}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "อัพเดทล่าสุด",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="inventory"
                title="ยอดนำเข้าสินค้า"
                count={`${totalImports.toLocaleString()} บาท`}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "อัพเดทล่าสุด",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="store"
                title="จำนวนสาขา"
                count={totalLocations}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "อัพเดทล่าสุด",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="category"
                title="จำนวนสินค้า"
                count={totalProducts}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "อัพเดทล่าสุด",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <DashboardCharts /> {/* เพิ่มกราฟ */}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
