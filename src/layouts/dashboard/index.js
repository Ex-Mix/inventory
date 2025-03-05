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
import StockTable from "./components/StockTable";

function Dashboard() {
  const { statistics, charts, stock, loading, error } = useDashboardData();

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
                count={`${statistics.totalSales.toLocaleString()} บาท`}
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
                count={`${statistics.totalImports.toLocaleString()} บาท`}
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
                count={statistics.totalLocations}
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
                count={statistics.totalProducts}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "อัพเดทล่าสุด",
                }}
              />
            </MDBox>
          </Grid>

          {/* กราฟ */}
          <Grid item xs={12}>
            <DashboardCharts
              dailySales={charts.dailySales}
              dailyImports={charts.dailyImports}
              salesByLocation={charts.salesByLocation}
              importsByLocation={charts.importsByLocation}
            />
          </Grid>

          {/* ตารางสินค้าคงเหลือ */}
          <Grid item xs={12}>
            <StockTable stockData={stock} />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
