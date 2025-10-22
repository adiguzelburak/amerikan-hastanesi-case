import type { User } from "@/pages/home/components/columns"

const users: User[] = [
  {
    id: "1",
    name: "Burak",
    role: "Admin",
    permissions: ["Read", "Write", "Delete"],
  },
  {
    id: "2",
    name: "İrem",
    role: "Doctor",
    permissions: ["Read", "Write"],
  },
  {
    id: "3",
    name: "Ahmet",
    role: "Patient",
    permissions: ["Read"],
  },
  {
    id: "4",
    name: "Ayşe",
    role: "Patient",
    permissions: ["Read"],
  },
]

export function getUsers() {
  return new Promise(resolve => {
    setTimeout(() => resolve([...users]), 1000)
  })
}

export function addUser(newUser: User) {
  const newUserId = Math.random().toString(36).substring(2, 15)

  return new Promise(resolve => {
    setTimeout(() => {
      users.push({ ...newUser, id: newUserId })
      resolve([...users])
    }, 1000)
  })
}

export function deleteUser(id: string) {
  return new Promise(resolve => {
    setTimeout(() => {
      const newUsers = users.filter((user: User) => user.id !== id)
      resolve([...newUsers])
    }, 1000)
  })
}

export function updateUser(id: string, updatedUser: User) {
  return new Promise(resolve => {
    setTimeout(() => {
      const newUsers = users.map((user: User) =>
        user.id === id ? updatedUser : user,
      )
      resolve([...newUsers])
    }, 1000)
  })
}
