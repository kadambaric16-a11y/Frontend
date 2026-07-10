import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const API = "http://127.0.0.1:8000";

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos/`);
      setTodos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add Todo
  const addTodo = async () => {
    if (title.trim() === "") return;

    try {
      await axios.post(`${API}/todos/`, {
        title,
        description: "",
        completed: false,
      });

      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error(error);
      alert("Failed to add todo");
    }
  };

  // Update Todo
  const updateTodo = async () => {
    if (title.trim() === "") return;

    try {
      await axios.put(`${API}/todos/${editId}`, {
        title,
        description: "",
        completed: false,
      });

      setTitle("");
      setEditId(null);
      fetchTodos();
    } catch (error) {
      console.error(error);
      alert("Failed to update todo");
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    if (!window.confirm("Delete this Todo?")) return;

    try {
      await axios.delete(`${API}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
      alert("Failed to delete todo");
    }
  };

  return (
    <div
      style={{
        width: "600px",
        margin: "40px auto",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h1>Todo App</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search Todo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "95%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {/* Add / Update */}
      <input
        type="text"
        placeholder="Enter Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "10px",
          width: "70%",
          marginRight: "10px",
        }}
      />

      <button
        onClick={editId ? updateTodo : addTodo}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        {editId ? "Update" : "Add"}
      </button>

      <hr />

      {todos.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      ).length === 0 ? (
        <p>No Todos Found</p>
      ) : (
        todos
          .filter((todo) =>
            todo.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((todo) => (
            <div
              key={todo.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                textAlign: "left",
              }}
            >
              <h3>{todo.title}</h3>

              <p>{todo.description || "No Description"}</p>

              <p>
                Status:{" "}
                {todo.completed ? "✅ Completed" : "❌ Not Completed"}
              </p>

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    setTitle(todo.title);
                    setEditId(todo.id);
                  }}
                  style={{
                    background: "green",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
      )}
    </div>
  );
}

export default App;