import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {JSX, useEffect, useState} from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { verifyToken } from "./api/auth";
import Footer from "./components/Footer";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/login" />;
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const isValid = await verifyToken(token);
                    setIsAuthenticated(isValid);
                } catch (error) {
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>;

    return (
        <div className="main">
            <Router>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            <ToastContainer />

            <Footer />
        </div>
    );
};

export default App;