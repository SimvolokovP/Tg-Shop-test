import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { products } from "./products";
import { useTg } from "./hooks/useTg";

function App() {
  const [count, setCount] = useState(0);
  const { user } = useTg();

  return (
    <>
      <div>
        <h1>Web App, {user?.username}</h1>
        <ul>
          {products.map((pr) => (
            <li key={pr.id}>{pr.title}</li>
          ))}
        </ul>
        <button>Send</button>
      </div>
    </>
  );
}

export default App;
