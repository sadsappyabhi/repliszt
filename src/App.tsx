import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import ListHome from "./pages/ListHome";
import { useAuth } from "./AuthContext";

function App() {
  return (
    <>
      <Header />
      <main className="grow">
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="lists"
            element={
              <ProtectedRoute>
                <ListHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate("/", { replace: true });
    }
  }, [session, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return <>{children}</>;
}

export default App;
