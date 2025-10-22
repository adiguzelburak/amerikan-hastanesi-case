import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "@/app/store"
import * as fakeApi from "@/lib/api/fakeApi"
import type { User } from "@/pages/home/components/columns"

// Define a type for the slice state
type UsersState = {
  users: User[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

// Define the initial state using that type
const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
}

// Async thunks
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fakeApi.getUsers()
  return response as User[]
})

export const addUser = createAsyncThunk("users/addUser", async (user: User) => {
  const response = await fakeApi.addUser(user)
  return response as User[]
})

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updatedUser }: { id: string; updatedUser: User }) => {
    const response = await fakeApi.updateUser(id, updatedUser)
    return response as User[]
  },
)

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    const response = await fakeApi.deleteUser(id)
    return response as User[]
  },
)

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? "Failed to fetch users"
      })
      // Add user
      .addCase(addUser.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.users = action.payload
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? "Failed to add user"
      })
      // Update user
      .addCase(updateUser.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.users = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? "Failed to update user"
      })
      // Delete user
      .addCase(deleteUser.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.users = action.payload
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? "Failed to delete user"
      })
  },
  selectors: {
    selectUsers: state => state.users,
    selectUsersStatus: state => state.status,
    selectUsersError: state => state.error,
  },
})

// Export selectors
export const { selectUsers, selectUsersStatus, selectUsersError } =
  usersSlice.selectors

// Export selector functions that take RootState
export const selectUsersFromState = (state: RootState) => state.users.users
export const selectUsersStatusFromState = (state: RootState) =>
  state.users.status
export const selectUsersErrorFromState = (state: RootState) => state.users.error

export default usersSlice.reducer
