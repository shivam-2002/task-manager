import styled from "styled-components";

const StyledTaskList = styled.div`
    width: 100%;
    max-width: 500px;
    margin: auto;
    padding: 20px;

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f9f9f9;
        padding: 10px;
        margin: 8px 0;
        border-radius: 5px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    input {
        flex: 1;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    .actions {
        display: flex;
        gap: 5px;
    }

    button {
        background: #007bff;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 3px;
        transition: 0.3s;

        &:hover {
            background: #0056b3;
        }
    }

    .complete {
        background: #28a745;

        &:hover {
            background: #218838;
        }
    }

    .delete {
        background: #ff4d4d;

        &:hover {
            background: #cc0000;
        }
    }
`;

export default StyledTaskList;