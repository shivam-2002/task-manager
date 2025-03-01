import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginAPI } from "../../api/auth";
import { login } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import StyledLogin from "./styled";
import {toast} from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await loginAPI(email, password);
            if (res.status === 200) {
                dispatch(login(res.data.token));
                navigate("/dashboard");
            } else {
                toast.error(res.statusText);
            }
        }  catch (err: any) {
            toast.error(err.response.data.error, {
                autoClose: 1000,
            });
        }

    };

    return (
        <StyledLogin>
            <div className="form">
                <h2>Login</h2>
                <label htmlFor="email">Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleSubmit}>Login</button>
                <p className="signup-text">
                    Don't have an account? <a href="/register">Sign up</a>
                </p>
            </div>
        </StyledLogin>
    );
};

export default Login;