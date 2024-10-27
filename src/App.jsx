import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { products } from "./products";
import { useTg } from "./hooks/useTg";
import { serverUrl } from "./config";

function App() {
  const [count, setCount] = useState(0);
  const { user, queryId, tg } = useTg();

  tg.MainButton.show();

  const onSendData = useCallback(() => {
    const data = {
      queryId: queryId,
      userId: user?.id,
      products: products,
    };
    console.log("Sending data:", data);
    fetch(`${serverUrl}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error during fetch:", error));
  }, [products, queryId]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  return (
    <>
      <div>
        <h1>Web App, {user?.username}</h1>
        <ul>
          {products.map((pr) => (
            <li key={pr.id}>{pr.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
