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
      <ul className={styles.todoList__tasksList}>
        {tasks.map((task) => {
          const onClickHundler = () => {removedTask(task.id)}
          const onChangeHundler = (e: ChangeEvent<HTMLInputElement>) => {
            let isDoneValue = e.currentTarget.checked
            changeTaskStatus(task.id, isDoneValue)
          }
            return (
              <li className={cx(
                styles.todoList__taskItem,
                task.isDone && styles.done
              )}
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
      <div className={styles.todoList__filterButtons}>
        <button
          className={cx(
            styles.todoList__filterButton,
            filter === 'all' && styles.active
          )}
          onClick={onAllTasks}>
          All
        </button>
        <button
          className={cx(
            styles.todoList__filterButton,
            filter === 'active' && styles.active
          )}
          onClick={onActiveTasks}>
          Active
        </button>
        <button
          className={cx(
            styles.todoList__filterButton,
            filter === 'completed' && styles.active
          )}
          onClick={onDoneTasks}>
          Completed
        </button>
      </div>
    </div>
  )
}