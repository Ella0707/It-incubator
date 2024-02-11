import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TaskType} from "../App";
import cx from 'classnames'
import styles from './TodoList.module.scss'

export type ChangeFilterType = 'all' | 'completed' | 'active'

type TodoListType = {
  titleHead: string;
  tasks: Array<TaskType>;
  removedTask: (id: string )=> void;
  changeFilter: (value: ChangeFilterType) => void;
  addTask: (titleTask: string) => void;
  changeTaskStatus: ( id: string, isDoneValue: boolean ) => void;
  filter: string;
}


export const TodoList = ({titleHead, tasks, removedTask, changeFilter, addTask, changeTaskStatus, filter}: TodoListType) => {
  let [titleTask, setTitleTask] = useState('')
  let [error, setError] = useState<string | null>(null)

  const addTaskHundler = () => {
    if (titleTask.trim() != '') {
      addTask(titleTask.trim())
      setTitleTask('')
    } else {
      setError('Title is required')
    }
  }

  const onChangeHundler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleTask(event.currentTarget.value)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
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
    <div className={styles.todoList}>
      <h3 className={styles.todoList__title}>{titleHead}</h3>
      <div className={styles.todoList__top}>
        <div className={styles.todoList__head}>
          <input
            className={cx(styles.todoList__input, error && styles.error)}
            value={titleTask}
            onChange={onChangeHundler}
            onKeyDown={onKeyDown}
          />
          <button
            className={styles.todoList__buttonAdd}
            onClick={addTaskHundler}>
            +
          </button>
        </div>
        {error &&
          <div className={styles.todoList__inputError}>
            {error}
          </div>
        }
      </div>
      <ul>
        {tasks.map((task) => {
          const onClickHundler = () => {removedTask(task.id)}
          const onChangeHundler = (e: ChangeEvent<HTMLInputElement>) => {
            let isDoneValue = e.currentTarget.checked
            changeTaskStatus(task.id, isDoneValue)
          }
            return (
              <li className={task.isDone ? styles.done : styles.todoList__taskItem}
                key={task.id}>
                <input
                  className={styles.todoList__checkbox}
                  type="checkbox"
                  checked={task.isDone}
                  onChange={onChangeHundler}
                />
                <span
                  className={styles.todoList__taskTitle}
                >
                  {task.title}
                </span>
                <button
                  className={styles.todoList__deleteButton}
                  onClick={onClickHundler}>
                  ✖
                </button>
              </li>
            )
          }
        )}
      </ul>
      <div>
        <button
          className={filter === 'all' ? styles.active : styles.todoList__filterButton}
          onClick={onAllTasks}>
          All
        </button>
        <button
          className={filter === 'active' ? styles.active : styles.todoList__filterButton}
          onClick={onActiveTasks}>
          Active
        </button>
        <button
          className={filter === 'completed' ? styles.active : styles.todoList__filterButton}
          onClick={onDoneTasks}>
          Completed
        </button>
      </div>
    </div>
  )
}