// Tasks.js
import { useState, useEffect } from "react";
import "./Tasks.css";

function Tasks({ token }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("https://ai-task-backend-69hj.onrender.com/tasks", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((r) => r.json())
      .then(setTasks)
      .catch((e) => console.error("GET /tasks failed:", e));
  }, [token]);

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await fetch("https://ai-task-backend-69hj.onrender.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ title: newTask }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`POST /tasks ${res.status}: ${txt}`);
      }
      const data = await res.json();
      setTasks((prev) => [...prev, data]);
      setNewTask("");
    } catch (err) {
      console.error(err);
      alert("Could not add task. Check console/network tab.");
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await fetch(`https://ai-task-backend-69hj.onrender.com/tasks/${id}/complete`, {
        method: "PATCH",
        headers: { Authorization: "Bearer " + token },
      });
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e) {
      console.error("PATCH /tasks/:id/complete failed:", e);
    }
  };

  return (
    <div className="tasks-container">
      <h2 className="tasks-title">Tasks</h2>

      <div className="tasks-input-row">
        <input
          className="tasks-input"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          type="button"                 
          className="tasks-add-btn"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <ul className="tasks-list">
        {tasks.map((task) => (
          <li key={task.id} className="tasks-item">
            <label className="tasks-label">
              <input
                type="checkbox"
                className="tasks-checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span
                className="tasks-text"
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "#999" : "#140101ff",
                }}
              >
                {task.title}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
