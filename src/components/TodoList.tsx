import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TaskType} from "../App";

export type ChangeFilterType = 'all' | 'completed' | 'active'

type TodoListType = {
  titleHead: string;
  tasks: Array<TaskType>;
  removedTask: (id: string )=> void;
  changeFilter: (value: ChangeFilterType) => void;
  addTask: (titleTask: string) => void;
}




export const TodoList = ({titleHead, tasks, removedTask, changeFilter, addTask}: TodoListType) => {
  let [titleTask, setTitleTask] = useState('')

  const addTaskHundler = () => {
    addTask(titleTask)
    setTitleTask('')
  }

  const onChangeHundler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleTask(event.currentTarget.value)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTaskHundler()
    }
  }

  const onAllTasks = () => {
    changeFilter('all')
  }

  const onActiveTasks = () => {
    changeFilter('active')
  }
  const onDoneTasks = () => {
    changeFilter('completed')
  }

  return (
    <div>
      <h3>{titleHead}</h3>
      <div>
        <input value={titleTask}
               onChange={onChangeHundler}
               onKeyDown={onKeyDown}
        />
        <button onClick={addTaskHundler}>+</button>
      </div>
      <ul>
        {tasks.map((task) => {
          const onClickHundler = () => {removedTask(task.id)}

            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickHundler}>✖</button>
              </li>
            )
          }
        )}
      </ul>
      <div>
        <button onClick={onAllTasks}>All</button>
        <button onClick={onActiveTasks}>Active</button>
        <button onClick={onDoneTasks}>Completed</button>
      </div>
    </div>
  )
}