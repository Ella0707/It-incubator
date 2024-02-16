import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {ChangeFilterType, TodoList} from "./components/TodoList";


export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

type TodolistsType = {
  id: string;
  title: string;
  filter: ChangeFilterType;
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

  const arr = [
    {
      id: v1(),
      title: 'Title-1',
    },
    {
      id: v1(),
      title: 'Title-2'
    },
  ]

  let [todolists, setTodolists]=useState<TodolistsType[]>([
    {id: v1(), title: 'What to learn', filter: 'all'},
    {id: v1(), title: 'What to buy', filter: 'all'},
  ])

  return (
    <div className="App">
      <div className='content'>
        {todolists.map((el) => {
          return (
            <TodoList
              key={el.id}
              titleHead={el.title}
              tasks={taskForTodoList}
              removedTask={removedTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              filter={el.filter}
            />
          )
        })}

      </div>
    </div>
  );
}

export default App;


