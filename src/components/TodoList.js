import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูล todos ทั้งหมด
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // เพิ่ม todo ใหม่
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ task: newTodo, is_completed: false }])
        .select();

      if (error) throw error;

      setTodos([...todos, ...data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  // อัพเดทสถานะ todo
  const toggleTodo = async (id, is_completed) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ is_completed: !is_completed })
        .eq("id", id);

      if (error) throw error;

      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, is_completed: !is_completed } : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };

  // ลบ todo
  const deleteTodo = async (id) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) throw error;

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  if (loading) {
    return <div>กำลังโหลด...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">รายการสิ่งที่ต้องทำ</h1>

      {/* ฟอร์มเพิ่ม todo */}
      <form onSubmit={addTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="เพิ่มสิ่งที่ต้องทำ..."
          className="border p-2 mr-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          เพิ่ม
        </button>
      </form>

      {/* แสดงรายการ todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.is_completed}
              onChange={() => toggleTodo(todo.id, todo.is_completed)}
              className="mr-2"
            />
            <span className={todo.is_completed ? "line-through" : ""}>{todo.task}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
