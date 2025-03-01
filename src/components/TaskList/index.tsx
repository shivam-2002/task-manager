import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, updateTask as updateTaskSlice, deleteTask as deleteTaskSlice } from "../../slices/taskSlice";
import { fetchTasks, deleteTask, updateTask } from "../../api/tasks";
import { RootState } from "../../store";
import StyledTaskList from "./styled";
import Modal from "react-modal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import '../../shared/modal.css'
import {customStyles} from "../../pages/Dashboard/styled";

const TaskList = ({ token }: { token: string }) => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [editTask, setEditTask] = useState<any>(null);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    useEffect(() => {
        fetchTasks(token).then((res: any) => dispatch(setTasks(res.data)));
    }, [dispatch, token]);

    const handleComplete = async (task: any) => {
        const updatedTask = { ...task, status: !task.status };
        await updateTask(token, task.id, updatedTask);
        dispatch(updateTaskSlice(updatedTask));
    };

    const handleEditSave = async () => {
        if (!editTask) return;
        await updateTask(token, editTask.id, editTask);
        dispatch(updateTaskSlice(editTask));
        setEditTask(null);
    };

    const handleDelete = async () => {
        if (deleteConfirm !== null) {
            await deleteTask(token, deleteConfirm);
            dispatch(deleteTaskSlice(deleteConfirm));
            setDeleteConfirm(null);
        }
    };

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        const reorderedTasks = Array.from(tasks);
        const [movedItem] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedItem);
        dispatch(setTasks(reorderedTasks));
    };

    const completedTasks = tasks.filter((task) => task.status);
    const activeTasks = tasks.filter((task) => !task.status);

    return (
        <StyledTaskList>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                        <ul ref={provided.innerRef} {...provided.droppableProps}>
                            {activeTasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <span onClick={() => setSelectedTask(task)} className="task-title">
                                                {task.title.length > 25 ? task.title.substring(0, 25) + "..." : task.title}
                                            </span>

                                            <div className="actions">
                                                <button className="complete" onClick={() => handleComplete(task)}>
                                                    {task.status ? "Undo" : "Complete"}
                                                </button>
                                                <button onClick={() => setEditTask(task)}>Edit</button>
                                                <button className="delete" onClick={() => setDeleteConfirm(task.id)}>Delete</button>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>

            {completedTasks.length > 0 && <hr className="separator" />}
            <ul>
                {completedTasks.map((task) => (
                    <li key={task.id} className="completed">
                        <span  onClick={() => setSelectedTask(task)} className="task-title">{task.title.length > 25 ? task.title.substring(0, 25) + "..." : task.title}</span>
                        <button className="complete" onClick={() => handleComplete(task)}>Undo</button>
                    </li>
                ))}
            </ul>

            {/* Edit Modal */}
            <Modal isOpen={editTask !== null} onRequestClose={() => setEditTask(null)} style={customStyles}>
                <div className="modal-header">
                    <h2>Edit Task</h2>
                    <button className="close-btn" onClick={() => setEditTask(null)}>✖</button>
                </div>

                <div className="edit-ctn">
                    <div className="form-group">
                        <label className="label" htmlFor="title">Task Title</label>
                        <input
                            className="input"
                            type="text"
                            id="title"
                            placeholder="Enter task title"
                            value={editTask?.title}
                            onChange={(e) => setEditTask({...editTask, title: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="description">Description</label>
                        <textarea
                            className="textarea"
                            id="description"
                            placeholder="Enter task description"
                            value={editTask?.description}
                            onChange={(e) => setEditTask({...editTask, description: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="dueDate">Due Date</label>
                        <input
                            className="input"
                            type="date"
                            id="dueDate"
                            value={editTask?.due_date ? editTask.due_date.split("T")[0] : ""}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setEditTask({...editTask, due_date: e.target.value})}
                            required
                        />
                    </div>

                    <div className="status-ctn">
                        <input
                            className="input"
                            type="checkbox"
                            id="status"
                            checked={editTask?.status}
                            onChange={(e) => setEditTask({...editTask, status: !editTask.status})}
                        />
                        <label className="label" htmlFor="status">Completed</label>
                    </div>

                    <button className="button" type="submit" onClick={handleEditSave}>Save</button>

                </div>
            </Modal>

            {/* Task Details Modal */}
            <Modal isOpen={selectedTask !== null} onRequestClose={() => setSelectedTask(null)} style={customStyles}>
                <div className="modal-header">
                    <h2>Task Details</h2>
                    <button className="close-btn" onClick={() => setSelectedTask(null)}>✖</button>
                </div>
                <div className="edit-ctn">
                    <div className="form-group">
                        <label className="label">Task Title</label>
                        <input
                            className="input"
                            type="text"
                            value={selectedTask?.title}
                            contentEditable={false}
                            onMouseDown={(e) => e.preventDefault()}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Description</label>
                        <textarea
                            className="textarea"
                            value={selectedTask?.description}
                            contentEditable={false}
                            onMouseDown={(e) => e.preventDefault()}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Due Date</label>
                        <input
                            className="input"
                            type="date"
                            value={selectedTask?.due_date ? selectedTask.due_date.split("T")[0] : ""}
                            contentEditable={false}
                            onMouseDown={(e) => e.preventDefault()}
                        />
                    </div>

                    <div className="status-ctn">
                        <input
                            className="input"
                            type="checkbox"
                            checked={selectedTask?.status}
                            contentEditable={false}
                            onMouseDown={(e) => e.preventDefault()}
                        />
                        <label className="label">Completed</label>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={deleteConfirm !== null} onRequestClose={() => setDeleteConfirm(null)} style={customStyles}>
                <div className="delete-modal">
                    <p>Are you sure you want to delete this task?</p>
                    <button onClick={handleDelete}>Yes</button>
                    <button className="cancel" onClick={() => setDeleteConfirm(null)}>No</button>
                </div>
            </Modal>
        </StyledTaskList>
    );
};

export default TaskList;