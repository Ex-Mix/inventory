import { useState, useEffect } from "react";
import { supabase } from "config/supabaseClient";

export function useSupabase(tableName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!isLoggedIn) {
          setError({ message: "กรุณาเข้าสู่ระบบก่อน" });
          return;
        }

        const { data: result, error } = await supabase.from(tableName).select("*");

        if (error) {
          console.error(`Error จาก Supabase (${tableName}):`, error);
          setError(error);
          return;
        }

        if (!result || result.length === 0) {
          setError({
            message: `ไม่พบข้อมูล${tableName}`,
            details: {
              data: result,
              connection: process.env.REACT_APP_SUPABASE_URL,
            },
          });
          return;
        }

        setData(result);
      } catch (error) {
        console.error(`Error จากการเรียก API (${tableName}):`, error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName]);

  return { data, loading, error };
}
