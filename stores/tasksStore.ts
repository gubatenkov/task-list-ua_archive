import type { TTaskLabelValue, TTask } from '@/lib/schemaTypes'

import { createJSONStorage, persist } from 'zustand/middleware'
import initialTasks from '@/lib/tasks.json'
import { getRandomInt } from '@/lib/utils'
import { create } from 'zustand'

type Store = {
  updateLabel: (taskId: string, labelValue: TTaskLabelValue) => void
  updateEditTask: (taskInfo: Partial<TTask>) => void
  setEditTaskId: (taskId: string) => void
  deleteTask: (taskId: string) => void
  setTasks: (tasks: TTask[]) => void
  getEditTask: () => TTask | null
  clearEditTaskId: () => void
  editTaskId: string | null
  createTask: () => void
  tasks: TTask[] | []
}

export const useTasksStore = create<Store>()(
  persist(
    (set, getState) => ({
      createTask: () => {
        const newTask: TTask = {
          id: `ID-${getRandomInt(10000, 11000)}`,
          priority: 'medium',
          title: 'New task',
          label: 'feature',
          status: 'todo',
        }
        const withNewTask = [newTask, ...getState().tasks]
        set({
          editTaskId: newTask.id,
          tasks: withNewTask,
        })
      },
      updateEditTask: (partialTask) => {
        const editTaskId = getState().editTaskId
        const withUpdatedTask = getState().tasks.map((task) => {
          return task.id === editTaskId ? { ...task, ...partialTask } : task
        })
        set({
          tasks: withUpdatedTask,
        })
      },
      updateLabel: (taskId, labelValue) => {
        const withUpdated = getState().tasks.map((task) => {
          return task.id === taskId ? { ...task, label: labelValue } : task
        })
        set({
          tasks: withUpdated,
        })
      },
      getEditTask: () => {
        const editTaskId = getState().editTaskId
        const editTask = getState().tasks.find((task) => task.id === editTaskId)
        return editTask ? editTask : null
      },
      deleteTask: (taskId) => {
        const filteredTasks = getState().tasks.filter(
          (task) => task.id !== taskId
        )
        set({
          tasks: filteredTasks,
        })
      },
      setEditTaskId: (editTaskId) => {
        set({
          editTaskId,
        })
      },
      clearEditTaskId: () => {
        set({
          editTaskId: null,
        })
      },
      setTasks: (tasks) => {
        set({
          tasks,
        })
      },
      tasks: initialTasks as TTask[],
      editTaskId: null,
    }),
    {
      storage: createJSONStorage(() => localStorage),
      name: 'tasks-storage',
    }
  )
)
