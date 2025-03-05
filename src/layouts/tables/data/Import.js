import { useState } from "react";
import PropTypes from "prop-types";

// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import MDBadge from "components/MDBadge";

// Custom components
import CustomDataTable from "components/DataTable";
import { useSupabase } from "hooks/useSupabase";

function Import() {
  const { data: imports, loading, error } = useSupabase("Import");

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

  const ImportInfo = ({ location_id, product_id }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {location_id}
        </MDTypography>
        <MDTypography variant="caption">{product_id}</MDTypography>
      </MDBox>
    </MDBox>
  );

  ImportInfo.propTypes = {
    location_id: PropTypes.string.isRequired,
    product_id: PropTypes.string.isRequired,
  };

  const PriceInfo = ({ quantity, total_price }) => (
    <MDBox lineHeight={1} textAlign="right">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {quantity}
      </MDTypography>
      <MDTypography variant="caption">{total_price?.toLocaleString("th-TH")} บาท</MDTypography>
    </MDBox>
  );

  PriceInfo.propTypes = {
    quantity: PropTypes.number.isRequired,
    total_price: PropTypes.number.isRequired,
  };

  const columns = [
    { Header: "รายละเอียดการนำเข้า", accessor: "importInfo", width: "45%", align: "left" },
    { Header: "ราคา", accessor: "priceInfo", align: "right" },
    { Header: "วันที่นำเข้า", accessor: "import_date", align: "center" },
    { Header: "สถานะ", accessor: "status", align: "center" },
    { Header: "จัดการ", accessor: "action", align: "center" },
  ];

  const rows = imports.map((import_) => ({
    importInfo: <ImportInfo location_id={import_.location_id} product_id={import_.product_id} />,
    priceInfo: <PriceInfo quantity={import_.quantity} total_price={import_.total_price} />,
    import_date: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {import_.import_date || "-"}
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

  return <CustomDataTable columns={columns} rows={rows} title="ข้อมูลการนำเข้า" />;
}

export default Import;
