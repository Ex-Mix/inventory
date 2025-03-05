import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CustomDataTable from "components/DataTable";

function StockTable({ stockData }) {
  const columns = [
    { Header: "รหัสสาขา", accessor: "location", width: "15%", align: "left" },
    { Header: "รหัสสินค้า", accessor: "product", width: "15%", align: "left" },
    { Header: "จำนวนคงเหลือ", accessor: "quantity", width: "15%", align: "right" },
    { Header: "ราคาเฉลี่ยต่อหน่วย", accessor: "averageUnitPrice", width: "20%", align: "right" },
    { Header: "มูลค่าคงเหลือ", accessor: "totalValue", width: "20%", align: "right" },
    { Header: "สถานะ", accessor: "status", width: "15%", align: "center" },
  ];

  const rows = Object.entries(stockData).flatMap(([location, products]) =>
    Object.entries(products).map(([product, stock]) => ({
      location,
      product,
      quantity: stock.quantity,
      averageUnitPrice: stock.averageUnitPrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      totalValue: stock.totalValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      status: (
        <MDBox ml={-1}>
          {stock.quantity <= 0 ? (
            <MDTypography variant="caption" color="error" fontWeight="medium">
              หมด
            </MDTypography>
          ) : stock.quantity <= 10 ? (
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

  return <CustomDataTable columns={columns} rows={rows} title="สินค้าคงเหลือ" />;
}

StockTable.propTypes = {
  stockData: PropTypes.object.isRequired,
};

export default StockTable;
