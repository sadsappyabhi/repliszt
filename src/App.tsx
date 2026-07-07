import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import About from "./pages/About";

function App() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
