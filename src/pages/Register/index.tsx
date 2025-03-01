import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import StyledLogin from "../Login/styled";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await register(email, password, name);
            if (res.status === 200) {
                toast.success("Successfully registered!", {
                    autoClose: 1000,
                });
                navigate("/login");
            } else {
                toast.error(res.statusText);
            }
        } catch (err: any) {
            let errorMessage = "Registration failed. Try again.";

            // Check if API returned a response with an error message
            if (err.response && err.response.data && err.response.data.error) {
                errorMessage = err.response.data.error; // Extracting the "error" field
            } else if (err.message) {
                errorMessage = err.message; // General error (e.g., network failure)
            }

            setError(errorMessage);
            toast.error(errorMessage, {
                autoClose: 1000,
            });
        }
    };

    return (
        <StyledLogin>
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
                {error && <p style={{color: "red"}}>{error}</p>}
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
                       required/>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                       required/>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" value={password}
                       onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Register</button>
                <p>
                    Already have an account? <a href="/Login">Login</a>
                </p>
            </form>
        </StyledLogin>
    );
};

export default Register;