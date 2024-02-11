import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {ChangeFilterType, TodoList} from "./components/TodoList";


export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

function App() {

  let [filter, setFilter] = useState<ChangeFilterType>('all')

  let [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS my Love", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false}
  ])

  const removedTask = (id: string) => {
    let filteredTasks = tasks.filter(t => t.id != id)
    setTasks(filteredTasks)
  }


  const addTask = (titleTask: string) => {
    let task = {id: v1(), title: titleTask, isDone: false}
    let newTasks = [...tasks, task]
    setTasks(newTasks)
  }

  let taskForTodoList = tasks

  if (filter === 'active') {
    taskForTodoList = tasks.filter(t => !t.isDone)
  }

  if (filter === 'completed') {
    taskForTodoList = tasks.filter(t => t.isDone)
  }

  const changeFilter = (value: ChangeFilterType) => {
    setFilter(value)
  }

  const changeTaskStatus = (id: string, isDone: boolean) => {
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.isDone = isDone
      setTasks([...tasks])
    }
  }

  return (
    <div className="App">
      <TodoList
        titleHead={'What to do?'}
        tasks={taskForTodoList}
        removedTask={removedTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;


