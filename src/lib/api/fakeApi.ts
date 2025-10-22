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
    name: "Evren",
    role: "Patient",
    permissions: ["Read"],
  },
  {
    id: "4",
    name: "Furkan",
    role: "Patient",
    permissions: ["Read"],
  },
  {
    id: "5",
    name: "Zeynep",
    role: "Doctor",
    permissions: ["Read", "Write"],
  },
  {
    id: "6",
    name: "Mehmet",
    role: "Patient",
    permissions: ["Read"],
  },
  {
    id: "7",
    name: "Ayşe",
    role: "Admin",
    permissions: ["Read", "Write", "Delete"],
  },
  {
    id: "8",
    name: "Can",
    role: "Doctor",
    permissions: ["Read", "Write"],
  },
  {
    id: "9",
    name: "Selin",
    role: "Patient",
    permissions: ["Read"],
  },
  {
    id: "10",
    name: "Emre",
    role: "Patient",
    permissions: ["Read"],
  },
  {
    id: "11",
    name: "Deniz",
    role: "Doctor",
    permissions: ["Read", "Write"],
  },
  {
    id: "12",
    name: "Murat",
    role: "Admin",
    permissions: ["Read", "Write", "Delete"],
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
      const index = users.findIndex((user: User) => user.id === id)
      if (index > -1) {
        users.splice(index, 1)
      }
      resolve([...users])
    }, 1000)
  })
}

export function updateUser(id: string, updatedUser: User) {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = users.findIndex((user: User) => user.id === id)
      if (index > -1) {
        users[index] = updatedUser
      }
      resolve([...users])
    }, 1000)
  })
}
