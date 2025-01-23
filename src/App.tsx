import { About } from "./components/About";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import "./App.css";
import './assets/fonts/font.css';


function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
