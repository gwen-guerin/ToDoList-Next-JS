import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../reducers/tasks';
import Task from './Task';
import styles from '../styles/Home.module.css';

function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.value);

  const [taskName, setTaskName] = useState('');
  const [taskUrgent, setTaskUrgent] = useState(false);

  const createTask = () => {
    const newTask = { id: `${taskName}-${Date.now()}`, name: taskName, completed: false, urgent: taskUrgent };
    dispatch(addTask(newTask));
    setTaskName('');
    setTaskUrgent(false);
  };

  const sortedTasks = [...tasks].sort((a, b) => Number(b.urgent) - Number(a.urgent));
  const tasksComponents = sortedTasks.map((data, i) => {
    return <Task key={i} {...data} />
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.addContainer}>
          <input type="text" placeholder="Task" id="taskName" onChange={(e) => setTaskName(e.target.value)} value={taskName} className={styles.addTask} />
          <div className={styles.urgentSection}>
            <input type="checkbox" id="urgent" onChange={() => setTaskUrgent(!taskUrgent)} checked={taskUrgent} className={styles.urgentCheckbox} />
            <span className={styles.urgent}>URGENT</span>
          </div>
          <button id="add" onClick={() => createTask()} className={styles.button}>ADD TASK</button>
        </div>

        <div className={styles.tasksContainer}>
          {tasksComponents}
        </div>
      </div>
    </div>
  );
}

export default Home;
