import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, updateTask as updateTaskSlice, deleteTask as deleteTaskSlice } from "../../slices/taskSlice";
import { fetchTasks, deleteTask, updateTask } from "../../api/tasks";
import { RootState } from "../../store";
import StyledTaskList from "./styled";

const TaskList = ({ token }: { token: string }) => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [editTask, setEditTask] = useState<any>(null);

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

    const handleDelete = async (taskId: number) => {
        await deleteTask(token, taskId);
        dispatch(deleteTaskSlice(taskId));
    };

    return (
        <StyledTaskList>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {editTask?.id === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTask.title}
                                    onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                                />
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={editTask.status}
                                        onChange={() => setEditTask({ ...editTask, status: !editTask.status })}
                                    />
                                    Completed
                                </label>
                            </>
                        ) : (
                            <span style={{ textDecoration: task.status ? "line-through" : "none" }}>
                                {task.title}
                            </span>
                        )}

                        <div className="actions">
                            {editTask?.id === task.id ? (
                                <button onClick={handleEditSave}>Save</button>
                            ) : (
                                <>
                                    <button className="complete" onClick={() => handleComplete(task)}>
                                        {task.status ? "Undo" : "Complete"}
                                    </button>
                                    <button onClick={() => setEditTask(task)}>Edit</button>
                                    <button className="delete" onClick={() => handleDelete(task.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </StyledTaskList>
    );
};

export default TaskList;