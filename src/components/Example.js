import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import TodoList from "./TodoList";

function Example() {
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        // ตรวจสอบการ login จาก localStorage
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!isLoggedIn) {
          setError({ message: "กรุณาเข้าสู่ระบบก่อน" });
          return;
        }

        console.log("กำลังเชื่อมต่อกับ Supabase...");
        console.log("URL:", process.env.REACT_APP_SUPABASE_URL);

        const { data: sales, error } = await supabase.from("Sale").select("*");
        console.log("ผลลัพธ์จาก Supabase:", { data: sales, error });

        if (error) {
          console.error("Error จาก Supabase:", error);
          setError(error);
          return;
        }

        if (!sales || sales.length === 0) {
          console.error("Error: ไม่พบข้อมูลการขาย", {
            sales,
            error: null,
            connection: process.env.REACT_APP_SUPABASE_URL,
          });
          setError({
            message: "ไม่พบข้อมูลการขาย",
            details: {
              sales,
              connection: process.env.REACT_APP_SUPABASE_URL,
            },
          });
          return;
        }

        setSales(sales);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error จากการเรียก API:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "24px",
          marginLeft: "250px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "24px" }}>กำลังโหลดข้อมูล...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "24px",
          marginLeft: "250px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "24px", color: "red" }}>
            เกิดข้อผิดพลาด: {JSON.stringify(error, null, 2)}
          </h2>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div
        style={{
          padding: "24px",
          marginLeft: "250px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "24px", color: "red" }}>
            กรุณาเข้าสู่ระบบก่อน
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "24px",
        marginLeft: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>ข้อมูลการขาย</h2>
        {sales && sales.length > 0 ? (
          <div style={{ marginBottom: "24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    รหัสการขาย
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    รหัสสินค้า
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    จำนวน
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    ราคารวม
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    วันที่ขาย
                  </th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {sale.sale_id}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {sale.product_id}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {sale.quantity}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {sale.total_price?.toLocaleString("th-TH")} บาท
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {sale.sale_date ? new Date(sale.sale_date).toLocaleDateString("th-TH") : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "#666" }}>ไม่พบข้อมูลการขาย</div>
        )}
        <TodoList />
      </div>
    </div>
  );
}

export default Example;
