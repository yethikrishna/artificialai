import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { Toaster } from "@/components/ui/sonner";
import { PersonalizationProvider } from "@/components/enhanced/PersonalizationProvider";
import VlyToolbar from "@/components/VlyToolbar";
import "./index.css";

// Import pages
import Landing from "@/pages/Landing";
import Chat from "@/pages/Chat";
import NotFound from "@/pages/NotFound";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>
);