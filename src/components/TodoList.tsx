import React from "react";
import {TaskType} from "../App";

export type ChangeFilterType = 'all' | 'completed' | 'active'

type TodoListType = {
  title: string;
  tasks: Array<TaskType>;
  removedTask: (id: number )=> void;
  changeFilter: (value: ChangeFilterType) => void;
}


export const TodoList = ({title, tasks, removedTask, changeFilter}: TodoListType) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => removedTask(task.id)}>✖</button>
              </li>
            )
          }
        )}
      </ul>
      <div>
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('active')}>Active</button>
        <button onClick={() => changeFilter('completed')}>Completed</button>
      </div>
    </div>
  )
}