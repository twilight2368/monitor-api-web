import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { HeroUIProvider } from "@heroui/system";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/montserrat";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <main className=" text-foreground bg-background">
          <App />
        </main>
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>
);
