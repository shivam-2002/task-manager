import styled from "styled-components";

const StyledTaskList = styled.div`
    width: auto;
    min-width: 500px;
    margin: auto;
    box-sizing: border-box;
    height: auto;

    @media (max-width: 768px) {
        min-width: 300px;
    }

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
        cursor: pointer;
    }

    .task-title {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    .completed {
        text-decoration: line-through;
        color: gray;
    }

    .separator {
        margin: 15px 0;
        border: 1px solid #ddd;
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