import styled from "styled-components";

const StyledLogin = styled.div`
    .form {
        display: flex;
        flex-direction: column;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 300px;
    }

    label {
        font-weight: bold;
        margin-bottom: 0.3rem;
    }

    h2 {
        margin-bottom: 1rem;
        color: #333;
        text-align: center;
    }

    input {
        margin-bottom: 1rem;
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }

    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.8rem;
        cursor: pointer;
        font-size: 1rem;
        border-radius: 4px;
        transition: background 0.3s;

        &:hover {
            background-color: #0056b3;
        }
    }

    .signup-text {
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #555;

        a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;

            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

export default StyledLogin;