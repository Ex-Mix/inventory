/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import MDBadge from "components/MDBadge";

// Custom components
import CustomDataTable from "components/DataTable";
import { useSupabase } from "hooks/useSupabase";

function Sale() {
  const { data: sales, loading, error } = useSupabase("Sale");

  if (loading) {
    return (
      <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </MDBox>
    );
  }

  if (error) {
    return (
      <MDBox p={3}>
        <Alert severity="error">{error.message || JSON.stringify(error)}</Alert>
      </MDBox>
    );
  }

  const SaleInfo = ({ location_id, product_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {location_id}
        </MDTypography>
        <MDTypography variant="caption">{product_id}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const PriceInfo = ({ quantity, total_price }) => (
    <MDBox lineHeight={1} textAlign="right">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {quantity}
      </MDTypography>
      <MDTypography variant="caption">{total_price?.toLocaleString("th-TH")} บาท</MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "รายละเอียดการขาย", accessor: "saleInfo", width: "45%", align: "left" },
    { Header: "ราคา", accessor: "priceInfo", align: "right" },
    { Header: "วันที่ขาย", accessor: "sale_date", align: "center" },
    { Header: "สถานะ", accessor: "status", align: "center" },
    { Header: "จัดการ", accessor: "action", align: "center" },
  ];

  const rows = sales.map((sale) => ({
    saleInfo: <SaleInfo location_id={sale.location_id} product_id={sale.product_id} />,
    priceInfo: <PriceInfo quantity={sale.quantity} total_price={sale.total_price} />,
    sale_date: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {sale.sale_date || "-"}
      </MDTypography>
    ),
    status: (
      <MDBox ml={-1}>
        <MDBadge badgeContent="สำเร็จ" color="success" variant="gradient" size="sm" />
      </MDBox>
    ),
    action: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        แก้ไข
      </MDTypography>
    ),
  }));

  return <CustomDataTable columns={columns} rows={rows} title="ข้อมูลการขาย" />;
}

export default Sale;
