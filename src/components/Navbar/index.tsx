import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import StyledNavbar from "./styled";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <StyledNavbar>
            <div className="logo">Task Manager</div>
            <div className="nav-links">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </StyledNavbar>
    );
};

export default Navbar;