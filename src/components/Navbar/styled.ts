import styled from "styled-components";

const StyledNavbar = styled.nav`
    background-color: #2c3e50;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    .logo {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .nav-links {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    button {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 5px;
        font-size: 1rem;
        transition: background 0.3s ease;

        &:hover {
            background: #c0392b;
        }
    }
`;

export default StyledNavbar;