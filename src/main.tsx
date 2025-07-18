import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "@/components/ui/sonner";
import { PersonalizationProvider } from "@/components/enhanced/PersonalizationProvider";
import VlyToolbar from "@/components/VlyToolbar";
import "@/index.css";

// Simple test components
function TestLanding() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>YETI AI Landing Page</h1>
      <p>This is working!</p>
      <a href="/chat">Go to Chat</a>
    </div>
  );
}

function TestChat() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>YETI AI Chat Page</h1>
      <p>Chat is working!</p>
      <a href="/">Back to Home</a>
    </div>
  );
}

function TestNotFound() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <a href="/">Go Home</a>
    </div>
  );
}

// Initialize Convex client
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function App() {
  return (
    <ConvexProvider client={convex}>
      <PersonalizationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TestLanding />} />
            <Route path="/chat" element={<TestChat />} />
            <Route path="*" element={<TestNotFound />} />
          </Routes>
          <Toaster />
          <VlyToolbar />
        </BrowserRouter>
      </PersonalizationProvider>
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
} else {
  console.error("Root element not found!");
}