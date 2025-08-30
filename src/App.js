import { useState } from "react";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import Chat from "./components/Chat";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) return <Login setToken={setToken} />;

  return (
    <div style={{ padding: "20px" }}>
      <button 
        onClick={() => { 
          localStorage.removeItem("token"); 
          setToken(null); 
        }}
      >
        Logout
      </button>
      <Tasks token={token} />
      <Chat token={token} />
    </div>
  );
}

export default App;
