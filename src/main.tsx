import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { HeroUIProvider } from "@heroui/system";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/montserrat";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <HeroUIProvider>
        <main className=" text-foreground bg-background">
          <App />
        </main>
      </HeroUIProvider>
    </BrowserRouter>{" "}
  </StrictMode>
);
