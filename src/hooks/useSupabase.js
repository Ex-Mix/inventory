import { useState, useEffect } from "react";
import { supabase } from "config/supabaseClient";

export function useSupabase(queryType, filters = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setError({ message: "กรุณาเข้าสู่ระบบก่อน" });
          setLoading(false);
          return;
        }

        let result;
        const { year, month } = filters;

        switch (queryType) {
          case "monthlySales":
            result = await supabase.rpc("get_monthly_sales", { p_year: year || null });
            break;
          case "salesByLocation":
            result = await supabase.rpc("get_sales_by_location", {
              p_year: year || null,
              p_month: month || null,
            });
            break;
          case "salesByProduct":
            result = await supabase.rpc("get_sales_by_product", {
              p_year: year || null,
              p_month: month || null,
            });
            break;
          case "dailyImports":
            result = await supabase.rpc("get_daily_imports", {
              p_year: year || null,
              p_month: month || null,
            });
            break;
          case "importsByLocation":
            result = await supabase.rpc("get_imports_by_location", {
              p_year: year || null,
              p_month: month || null,
            });
            break;
          case "stock":
            result = await supabase.rpc("get_stock", {
              p_year: year || null,
              p_month: month || null,
            });
            break;
          default:
            throw new Error("Invalid query type");
        }

        if (result.error) throw result.error;
        if (!result.data || result.data.length === 0) {
          setError({ message: `ไม่พบข้อมูลสำหรับ ${queryType}` });
          setLoading(false);
          return;
        }

        console.log(`Data for ${queryType}:`, result.data);
        setData(result.data);
      } catch (error) {
        console.error(`Error fetching ${queryType}:`, error);
        setError(error.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [queryType, filters.year, filters.month]);

  return { data, loading, error };
}
