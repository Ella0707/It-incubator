import React, {useState} from 'react';
import './App.css';
import {ChangeFilterType, TodoList} from "./components/TodoList";


export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
}

function App() {

  let [filter, setFilter] = useState<ChangeFilterType>('all')

  let [tasks, setTasks] = useState([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS my Love", isDone: true},
    {id: 3, title: "ReactJS", isDone: false}
  ])

  const removedTask = (id: number) => {
   let  filteredTasks = tasks.filter(t => t.id != id)
    setTasks(filteredTasks)
  }

  let taskForTodoList = tasks

  if (filter === 'active') {
    taskForTodoList  = tasks.filter( t => !t.isDone )
  }

  if (filter === 'completed') {
    taskForTodoList  = tasks.filter( t => t.isDone )
  }

  const changeFilter = ( value: ChangeFilterType) => {
    setFilter(value)
  }

  return (
    <div className="App">
      <TodoList
        title={'What to do?'}
        tasks={taskForTodoList}
        removedTask={removedTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;


