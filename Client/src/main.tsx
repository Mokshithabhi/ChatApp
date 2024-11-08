// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
// import "./index.css"
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context.tsx";
import { SocketContextProvider } from "./context/socket.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
