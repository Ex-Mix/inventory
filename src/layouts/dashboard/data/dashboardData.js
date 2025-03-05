import { useSupabase } from "hooks/useSupabase";

export function useDashboardData() {
  const { data: sales, loading: salesLoading, error: salesError } = useSupabase("Sale");
  const { data: imports, loading: importsLoading, error: importsError } = useSupabase("Import");

  // คำนวณยอดขายรวม
  const totalSales = sales?.reduce((sum, sale) => sum + (sale.total_price || 0), 0) || 0;

  // คำนวณยอดนำเข้าสินค้าทั้งหมด
  const totalImports = imports?.reduce((sum, import_) => sum + (import_.total_price || 0), 0) || 0;

  // คำนวณจำนวนสาขา (unique location_id)
  const uniqueLocations = new Set([
    ...(sales?.map((sale) => sale.location_id) || []),
    ...(imports?.map((import_) => import_.location_id) || []),
  ]);
  const totalLocations = uniqueLocations.size;

  // คำนวณจำนวนสินค้า (unique product_id)
  const uniqueProducts = new Set([
    ...(sales?.map((sale) => sale.product_id) || []),
    ...(imports?.map((import_) => import_.product_id) || []),
  ]);
  const totalProducts = uniqueProducts.size;

  // คำนวณยอดขายรายวัน
  const dailySales =
    sales?.reduce((acc, sale) => {
      const date = sale.sale_date?.split("T")[0] || "ไม่มีวันที่";
      acc[date] = (acc[date] || 0) + (sale.total_price || 0);
      return acc;
    }, {}) || {};

  // คำนวณยอดนำเข้าตามวัน
  const dailyImports =
    imports?.reduce((acc, import_) => {
      const date = import_.import_date?.split("T")[0] || "ไม่มีวันที่";
      acc[date] = (acc[date] || 0) + (import_.total_price || 0);
      return acc;
    }, {}) || {};

  // คำนวณยอดขายแยกตามสาขา
  const salesByLocation =
    sales?.reduce((acc, sale) => {
      acc[sale.location_id] = (acc[sale.location_id] || 0) + (sale.total_price || 0);
      return acc;
    }, {}) || {};

  // คำนวณยอดนำเข้าแยกตามสาขา
  const importsByLocation =
    imports?.reduce((acc, import_) => {
      acc[import_.location_id] = (acc[import_.location_id] || 0) + (import_.total_price || 0);
      return acc;
    }, {}) || {};

  // คำนวณสินค้าคงเหลือแยกตามสาขา
  const stockByLocation = {};
  [...uniqueLocations].forEach((location) => {
    stockByLocation[location] = {};

    // รวมยอดนำเข้าทั้งหมดของแต่ละสินค้าในสาขานี้
    const importTotals =
      imports
        ?.filter((import_) => import_.location_id === location)
        ?.reduce((acc, import_) => {
          if (!acc[import_.product_id]) {
            acc[import_.product_id] = {
              quantity: 0,
              totalPrice: 0,
            };
          }
          acc[import_.product_id].quantity += import_.quantity || 0;
          acc[import_.product_id].totalPrice += import_.total_price || 0;
          return acc;
        }, {}) || {};

    // รวมยอดขายทั้งหมดของแต่ละสินค้าในสาขานี้
    const saleTotals =
      sales
        ?.filter((sale) => sale.location_id === location)
        ?.reduce((acc, sale) => {
          if (!acc[sale.product_id]) {
            acc[sale.product_id] = 0;
          }
          acc[sale.product_id] += sale.quantity || 0;
          return acc;
        }, {}) || {};

    // คำนวณยอดคงเหลือ
    Object.entries(importTotals).forEach(([product, importData]) => {
      const saleQuantity = saleTotals[product] || 0;
      const remainingQuantity = Math.max(0, importData.quantity - saleQuantity);
      const averageUnitPrice =
        importData.quantity > 0 ? importData.totalPrice / importData.quantity : 0;

      stockByLocation[location][product] = {
        quantity: remainingQuantity,
        averageUnitPrice,
        totalValue: remainingQuantity * averageUnitPrice,
      };
    });
  });

  return {
    statistics: {
      totalSales,
      totalImports,
      totalLocations,
      totalProducts,
    },
    charts: {
      dailySales,
      dailyImports,
      salesByLocation,
      importsByLocation,
    },
    stock: stockByLocation,
    loading: salesLoading || importsLoading,
    error: salesError || importsError,
  };
}
