import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { Toaster } from "@/components/ui/sonner";
import { PersonalizationProvider } from "@/components/enhanced/PersonalizationProvider";
import VlyToolbar from "@/components/VlyToolbar";
import "@/index.css";

// Import pages
import Landing from "@/pages/Landing";
import Chat from "@/pages/Chat";
import NotFound from "@/pages/NotFound";

// Initialize Convex client
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function App() {
  return (
    <ConvexProvider client={convex}>
      <ConvexAuthProvider client={convex}>
        <PersonalizationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <VlyToolbar />
          </BrowserRouter>
        </PersonalizationProvider>
      </ConvexAuthProvider>
    </ConvexProvider>
  );
}

// Mount the app
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}