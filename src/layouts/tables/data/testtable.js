import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CustomDataTable from "components/DataTable";
import { useDashboardData } from "layouts/dashboard/data/dashboardData.js";
// เพิ่มการนำเข้า Card และ Grid
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// ตารางสำหรับแสดง Monthly Sales
function MonthlySalesTable({ monthlySales }) {
  const columns = [
    { Header: "เดือน", accessor: "month", width: "33%", align: "left" },
    { Header: "จำนวนสินค้า", accessor: "total_quantity", width: "33%", align: "right" },
    { Header: "ยอดขายรวม", accessor: "total_sales", width: "33%", align: "right" },
  ];

  const rows = (monthlySales || []).map((item) => ({
    month: item.month || "N/A",
    total_quantity: item.total_quantity != null ? item.total_quantity.toLocaleString() : "0",
    total_sales:
      item.total_sales != null
        ? item.total_sales.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "0.00",
  }));

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          ยอดขายต่อเดือน
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <CustomDataTable columns={columns} rows={rows} />
      </MDBox>
    </Card>
  );
}

MonthlySalesTable.propTypes = {
  monthlySales: PropTypes.array.isRequired,
};

// ตารางสำหรับแสดง Sales By Location
function SalesByLocationTable({ salesByLocation }) {
  const columns = [
    { Header: "สาขา", accessor: "location", width: "33%", align: "left" },
    { Header: "จำนวนสินค้า", accessor: "total_quantity", width: "33%", align: "right" },
    { Header: "ยอดขาย", accessor: "total_sales", width: "33%", align: "right" },
  ];

  const rows = (salesByLocation || []).map((item) => ({
    location: item.location || "ไม่ระบุ",
    total_quantity: item.total_quantity != null ? item.total_quantity.toLocaleString() : "0",
    total_sales:
      item.total_sales != null
        ? item.total_sales.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "0.00",
  }));

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          ยอดขายตามสาขา
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <CustomDataTable columns={columns} rows={rows} />
      </MDBox>
    </Card>
  );
}

SalesByLocationTable.propTypes = {
  salesByLocation: PropTypes.array.isRequired,
};

// ตารางสำหรับแสดง Sales By Product
function SalesByProductTable({ salesByProduct }) {
  const columns = [
    { Header: "รหัสสินค้า", accessor: "product_id", width: "33%", align: "left" },
    { Header: "จำนวนสินค้า", accessor: "total_quantity", width: "33%", align: "right" },
    { Header: "ยอดขาย", accessor: "total_sales", width: "33%", align: "right" },
  ];

  const rows = (salesByProduct || []).map((item) => ({
    product_id: item.product_id || "N/A",
    total_quantity: item.total_quantity != null ? item.total_quantity.toLocaleString() : "0",
    total_sales:
      item.total_sales != null
        ? item.total_sales.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "0.00",
  }));

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          ยอดขายตามชนิดสินค้า
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <CustomDataTable columns={columns} rows={rows} />
      </MDBox>
    </Card>
  );
}

SalesByProductTable.propTypes = {
  salesByProduct: PropTypes.array.isRequired,
};

// ตารางสำหรับแสดง Daily Imports
function DailyImportsTable({ dailyImports }) {
  const columns = [
    { Header: "วันที่", accessor: "date", width: "50%", align: "left" },
    { Header: "ยอดนำเข้า", accessor: "imports", width: "50%", align: "right" },
  ];

  const rows = Object.entries(dailyImports || {}).map(([date, imports]) => ({
    date,
    imports:
      imports != null
        ? imports.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "0.00",
  }));

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          ยอดนำเข้ารายวัน
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <CustomDataTable columns={columns} rows={rows} />
      </MDBox>
    </Card>
  );
}

DailyImportsTable.propTypes = {
  dailyImports: PropTypes.object.isRequired,
};

// ตารางสำหรับแสดง Imports By Location
function ImportsByLocationTable({ importsByLocation }) {
  const columns = [
    { Header: "สาขา", accessor: "location", width: "50%", align: "left" },
    { Header: "ยอดนำเข้า", accessor: "imports", width: "50%", align: "right" },
  ];

  const rows = Object.entries(importsByLocation || {}).map(([location, imports]) => ({
    location: location || "ไม่ระบุ",
    imports:
      imports != null
        ? imports.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : "0.00",
  }));

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          ยอดนำเข้าตามสาขา
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <CustomDataTable columns={columns} rows={rows} />
      </MDBox>
    </Card>
  );
}

ImportsByLocationTable.propTypes = {
  importsByLocation: PropTypes.object.isRequired,
};

// ตารางสำหรับแสดง Stock
function StockTable({ stockData }) {
  const columns = [
    { Header: "รหัสสาขา", accessor: "location", width: "15%", align: "left" },
    { Header: "รหัสสินค้า", accessor: "product", width: "15%", align: "left" },
    { Header: "จำนวนคงเหลือ", accessor: "quantity", width: "15%", align: "right" },
    { Header: "ราคาเฉลี่ยต่อหน่วย", accessor: "averageUnitPrice", width: "20%", align: "right" },
    { Header: "มูลค่าคงเหลือ", accessor: "totalValue", width: "20%", align: "right" },
    { Header: "สถานะ", accessor: "status", width: "15%", align: "center" },
  ];

  const rows = Object.entries(stockData || {}).flatMap(([location, items]) =>
    (items || []).map((stock) => ({
      location,
      product: stock.product_id || "N/A",
      quantity: stock.remaining_quantity != null ? stock.remaining_quantity.toLocaleString() : "0",
      averageUnitPrice:
        stock.average_unit_price != null
          ? stock.average_unit_price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "0.00",
      totalValue:
        stock.total_value != null
          ? stock.total_value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "0.00",
      status: (
        <MDBox ml={-1}>
          {stock.remaining_quantity <= 0 ? (
            <MDTypography variant="caption" color="error" fontWeight="medium">
              หมด
            </MDTypography>
          ) : stock.remaining_quantity <= 10 ? (
            <MDTypography variant="caption" color="warning" fontWeight="medium">
              ใกล้หมด
            </MDTypography>
          ) : (
            <MDTypography variant="caption" color="success" fontWeight="medium">
              พร้อมขาย
            </MDTypography>
          )}
        </MDBox>
      ),
    }))
  );

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          สินค้าคงเหลือ
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <CustomDataTable columns={columns} rows={rows} />
      </MDBox>
    </Card>
  );
}

StockTable.propTypes = {
  stockData: PropTypes.object.isRequired,
};

// คอมโพเนนต์หลัก
function DashboardDataTables({ filters = {} }) {
  const { statistics, charts, stock, loading, error } = useDashboardData(filters);

  if (loading) {
    return <MDTypography>Loading...</MDTypography>;
  }

  if (error) {
    return <MDTypography color="error">Error: {error.message}</MDTypography>;
  }

  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <MonthlySalesTable monthlySales={statistics.monthlySales} />
        </Grid>
        <Grid item xs={12}>
          <SalesByLocationTable salesByLocation={statistics.salesByLocation} />
        </Grid>
        <Grid item xs={12}>
          <SalesByProductTable salesByProduct={statistics.salesByProduct} />
        </Grid>
        <Grid item xs={12}>
          <DailyImportsTable dailyImports={charts.dailyImports} />
        </Grid>
        <Grid item xs={12}>
          <ImportsByLocationTable importsByLocation={charts.importsByLocation} />
        </Grid>
        <Grid item xs={12}>
          <StockTable stockData={stock} />
        </Grid>
      </Grid>
    </MDBox>
  );
}

DashboardDataTables.propTypes = {
  filters: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
  }),
};

export default DashboardDataTables;
