import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

// Lazy load heavy components for better performance
const About = lazy(() => import("./components/About"));
const Stats = lazy(() => import("./components/Stats"));
const Services = lazy(() => import("./components/Services"));
const Gallery = lazy(() => import("./components/Gallery"));
const Contact = lazy(() => import("./components/Contact"));
const ChatHub = lazy(() => import("./components/ChatHub"));

// Loading fallback component
const LoadingFallback = () => (
  <div
    style={{
      minHeight: "200px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--color-text-muted)",
    }}
  >
    <div>Loading...</div>
  </div>
);

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />

      <Suspense fallback={<LoadingFallback />}>
        <Stats />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <Services />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <Gallery />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>

      <Footer />

      <Suspense fallback={null}>
        <ChatHub />
      </Suspense>
    </div>
  );
}

export default App;
