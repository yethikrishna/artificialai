import { Toaster } from "@/components/ui/sonner";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import Landing from "@/pages/Landing.tsx";
import NotFound from "@/pages/NotFound.tsx";
import { useLenis } from "@/hooks/use-lenis";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { ConfigProvider, theme } from 'antd';
import "./index.css";
import "@/components/animations/CustomRiveStyles.css";
import { useEffect } from "react";
import Chat from "@/pages/Chat.tsx";
import { PersonalizationProvider } from "@/components/enhanced/PersonalizationProvider";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*"
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

function App() {
  useLenis();
  
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#000000',
          borderRadius: 10,
        },
      }}
    >
      <PersonalizationProvider>
        <BrowserRouter>
          <RouteSyncer />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Landing />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/rive-test" element={
              <div>
                <div className="p-4">
                  <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
                </div>
                <Suspense fallback={<div className="flex items-center justify-center p-8">Loading...</div>}>
                  {React.createElement(React.lazy(() => import('@/components/animations/RiveTestPage').then(module => ({ default: module.RiveTestPage }))))}
                </Suspense>
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </PersonalizationProvider>
    </ConfigProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InstrumentationProvider>
      <ConvexAuthProvider client={convex}>
        <App />
        <Toaster />
      </ConvexAuthProvider>
    </InstrumentationProvider>
  </StrictMode>,
);