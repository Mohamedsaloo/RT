import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./page/Home";
import Navbar from "./components/NavBar/Nav";
import Shop from "./page/Shop";
import Contact from "./page/Contact";
import ContextMenu from './components/ContextMenu';
import Projects from "./page/Projects";
import Footer from "./components/Footer";
import Error from "./page/Err";
import Privacy from "./page/Privacy";
import Log from "./page/login";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Navbar />
        <ContextMenu />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/log" element={<Log />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;
