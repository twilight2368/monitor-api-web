import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { HeroUIProvider } from "@heroui/system";
import store from "@/app/store";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/montserrat";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <HeroUIProvider>
          <main className=" text-foreground bg-background">
            <App />
          </main>
        </HeroUIProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
);
