import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import StyledDashboard, { customStyles } from "./styled";
import Navbar from "../../components/Navbar";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import Modal from "react-modal";
import '../../shared/modal.css'

const Dashboard = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    if (!token) return null;

    return (
        <StyledDashboard>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="dashboard-container">
                <aside className="sidebar">
                    <h2>Dashboard</h2>
                    <p>Manage your tasks efficiently</p>
                </aside>
                <main className="main-content">
                    <button className="add-task-btn" onClick={() => setShowForm(true)}>
                        Add Task
                    </button>
                    <Modal
                        isOpen={showForm}
                        style={customStyles}
                        onRequestClose={() => setShowForm(false)}
                        ariaHideApp={false}
                    >
                        <div className="modal-header">
                            <h2>Add Task</h2>
                            <button className="close-btn" onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                        </div>
                        <TaskForm token={token} setShowForm={setShowForm} />
                    </Modal>
                    <TaskList token={token} />
                </main>
            </div>
        </StyledDashboard>
    );
};

export default Dashboard;