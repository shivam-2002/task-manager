import styled from "styled-components";

const StyledFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    border-radius: 8px;
    background: #f8f9fa;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: auto;

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .label {
        font-size: 14px;
        font-weight: 600;
        color: #333;
    }

    .input,
    .textarea {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }

    .textarea {
        resize: none;
        height: 80px;
    }

    .button {
        padding: 10px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        font-size: 16px;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
            background-color: #0056b3;
        }
    }
`;

export default StyledFormContainer;