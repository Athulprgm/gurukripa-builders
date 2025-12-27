import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatHub from "./components/ChatHub";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
      <ChatHub />
    </div>
  );
}

export default App;
