import { useRef, useState } from "react";
import styles from "./Tasks.module.css";
import Modal from "../Modal/Modal";
import { addNewTask, changeTaskStatus, deleteTask } from "../utils";
import { useOutletContext } from "react-router-dom";
export default function Tasks() {
  const [tasks, setTasks] = useOutletContext();
  const [dialog, setDialog] = useState(false);
  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);
  const id = useRef(4);

  function handleAddNewTask() {
    try {
      const newTask = addNewTask(id.current, name, completed);
      setTasks([...tasks, newTask]);
      setName("");
      id.current = id.current + 1;
      toggleDialog();
    } catch (e) {
      console.error(e.message);
    }
  }
  function handleChangeStatus(id) {
    setTasks(changeTaskStatus(tasks, id));
  }
  function handleDeleteTask(id) {
    setTasks(deleteTask(tasks, id));
  }
  function toggleDialog() {
    setDialog(!dialog);
  }
  return (
    <>
      <div className={styles.main} data-testid="main">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`${styles.task} ${
              task.completed ? styles.finished : ""
            } task`}
          >
            <span>{task.name}</span>
            <div className={styles.task_buttons}>
              <input
                type="checkbox"
                defaultChecked={task.completed}
                className={styles.completed_button}
                onClick={() => handleChangeStatus(task.id)}
              />
              <input
                type="button"
                value="delete"
                className={styles.delete_button}
                onClick={() => handleDeleteTask(task.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <button
          className={styles.new_task_button}
          onClick={() => toggleDialog()}
        >
          Add task
        </button>
      </div>
      <Modal
        dialog={dialog}
        toggleDialog={toggleDialog}
        setName={setName}
        name={name}
        setCompleted={setCompleted}
        completed={completed}
        handleAddNewTask={handleAddNewTask}
      />
    </>
  );
}
