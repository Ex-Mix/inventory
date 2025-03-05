import { useState } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";

function CustomDataTable({ columns, rows, title }) {
  return (
    <MDBox pt={6} pb={3}>
      <DataTable
        table={{ columns, rows }}
        isSorted={true}
        entriesPerPage={true}
        showTotalEntries={true}
        noEndBorder
        canSearch={true}
        pagination={true}
        entriesPerPageOptions={[5, 10, 15, 20]}
      />
    </MDBox>
  );
}

CustomDataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      width: PropTypes.string,
      align: PropTypes.string,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
};

CustomDataTable.defaultProps = {
  title: "",
};

export default CustomDataTable;
