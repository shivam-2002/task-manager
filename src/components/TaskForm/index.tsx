import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../slices/taskSlice";
import { createTask } from "../../api/tasks";
import StyledFormContainer from "./styled";
import {toast} from "react-toastify";

const TaskForm = ({ token, setShowForm }: { token: string, setShowForm: (val: boolean) => void }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newTask = await createTask(token, { title, description, dueDate, completed: false });
            dispatch(addTask({id: newTask.data.taskId, description, status: false, title, due_date: dueDate}));

            setTitle("");
            setDescription("");
            setDueDate("");
            setShowForm(false);
        } catch (error: any) {
            toast.error(error, {
                autoClose: 1000
            });
        }

    };

    return (
        <StyledFormContainer onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="label" htmlFor="title">Task Title</label>
                <input
                    className="input"
                    type="text"
                    id="title"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label className="label" htmlFor="description">Description</label>
                <textarea
                    className="textarea"
                    id="description"
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label className="label" htmlFor="dueDate">Due Date</label>
                <input
                    className="input"
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>

            <button className="button" type="submit">Add Task</button>
        </StyledFormContainer>
    );
};

export default TaskForm;