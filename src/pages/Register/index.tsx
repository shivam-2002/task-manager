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
                    onClose: () => {navigate("/login");}
                });
                setError("");
            } else {
                toast.error(res.statusText);
            }
        } catch (err: any) {
            let errorMessage = "Registration failed. Try again.";

            if (err.response && err.response.data && err.response.data.error) {
                errorMessage = err.response.data.error;
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
            toast.error(errorMessage, {
                autoClose: 1000,
            });
        }
    };

    return (
        <StyledLogin>
            <div className="form">
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
                <button onClick={handleRegister}>Register</button>
                <p>
                    Already have an account? <a href="/Login">Login</a>
                </p>
            </div>
        </StyledLogin>
    );
};

export default Register;