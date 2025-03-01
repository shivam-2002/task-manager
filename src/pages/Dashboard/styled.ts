import styled from "styled-components";

const StyledDashboard = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

    .navbar {
        width: 100%;
    }

    .dashboard-container {
        display: flex;
        flex: 1;
        overflow: hidden;
    }

    .sidebar {
        width: 200px;
        background-color: #34495e;
        color: white;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        transition: all 0.3s ease;

        @media (max-width: 768px) {
            width: 100%;
            padding: 1rem;
            align-items: center;
            box-sizing: border-box;
            gap: 0;
        }
    }

    .main-content {
        flex: 1;
        padding: 2rem;
        background-color: #ecf0f1;
        gap: 1.5rem;
        overflow-y: auto;
    }

    .title {
        font-size: 2rem;
        font-weight: bold;
    }

    .add-task-btn {
        background-color: #2ecc71;
        color: white;
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: 0.3s ease;

        &:hover {
            background-color: #27ae60;
        }
    }
    
    @media (max-width: 768px) {
        .dashboard-container {
            flex-direction: column;
        }

        .main-content {
            padding: 1rem;
        }
    }
`;

export default StyledDashboard;

export const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "400px",
        width: "90%",
    },
};