// src/layouts/dashboard/data/dashboardData.js
import { useSupabase } from "hooks/useSupabase";

export function useDashboardData(filters = {}) {
  const {
    data: monthlySales,
    loading: monthlyLoading,
    error: monthlyError,
  } = useSupabase("monthlySales", filters);
  const {
    data: salesByLocation,
    loading: locationLoading,
    error: locationError,
  } = useSupabase("salesByLocation", filters);
  const {
    data: salesByProduct,
    loading: productLoading,
    error: productError,
  } = useSupabase("salesByProduct", filters);
  const {
    data: dailyImports,
    loading: importsLoading,
    error: importsError,
  } = useSupabase("dailyImports", filters);
  const {
    data: importsByLocation,
    loading: importsLocLoading,
    error: importsLocError,
  } = useSupabase("importsByLocation", filters);
  const { data: stock, loading: stockLoading, error: stockError } = useSupabase("stock", filters);

  // คำนวณ totalSales จาก monthlySales
  const totalSales = monthlySales
    ? monthlySales.reduce((sum, item) => sum + (item.total_sales || 0), 0)
    : 0;

  // คำนวณ totalLocations จาก salesByLocation
  const totalLocations = salesByLocation ? salesByLocation.length : 0;

  // คำนวณ totalProducts จาก salesByProduct
  const totalProducts = salesByProduct ? salesByProduct.length : 0;

  return {
    statistics: {
      monthlySales: monthlySales || [],
      salesByLocation: salesByLocation || [],
      salesByProduct: salesByProduct || [],
      totalImports: dailyImports
        ? dailyImports.reduce((sum, item) => sum + (item.total_imports || 0), 0)
        : 0,
      totalSales, // เพิ่ม totalSales
      totalLocations, // เพิ่ม totalLocations
      totalProducts, // เพิ่ม totalProducts
    },
    charts: {
      dailyImports: dailyImports
        ? Object.fromEntries(
            dailyImports.map((item) => [item.import_date, item.total_imports || 0])
          )
        : {},
      importsByLocation: importsByLocation
        ? Object.fromEntries(
            importsByLocation.map((item) => [item.location || "ไม่ระบุ", item.total_imports || 0])
          )
        : {},
    },
    stock: stock ? Object.groupBy(stock, (item) => item.location || "ไม่ระบุ") : {},
    loading:
      monthlyLoading ||
      locationLoading ||
      productLoading ||
      importsLoading ||
      importsLocLoading ||
      stockLoading,
    error:
      monthlyError ||
      locationError ||
      productError ||
      importsError ||
      importsLocError ||
      stockError,
  };
}
