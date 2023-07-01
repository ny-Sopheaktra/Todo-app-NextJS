import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "../components/Todoitem";
import { redirect } from "next/dist/server/api-utils";

function getTodo() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: { id}, data: {complete}})
}

export default async function Home() {
  const todo = await getTodo()
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todo List</h1>
        <Link
          className="border border-slate-250 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 outline-none"
          href="new">New Task</Link>
      </header>
      <ul className="px-4">
        {todo.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  )
}