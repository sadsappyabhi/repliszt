import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import ListHome from "./pages/ListHome";

function App() {
  return (
    <>
      <Header />
      <main className="grow">
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="lists" element={<ListHome />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
