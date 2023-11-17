'use client'

import { useTasksStore } from '@/stores/tasksStore'

export default function TaskCounter() {
  const { tasks } = useTasksStore()
  return <span className="font-bold">{tasks.length}</span>
}
