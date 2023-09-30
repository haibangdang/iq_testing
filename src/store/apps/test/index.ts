import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Dispatch } from 'redux'

// ** Test Type Definition
interface Test {
  id: number
  name: string
  testTypeId: number
  description: string
  timeLimit: string
  totalQuestion: number
  status: string | null
  explanation: string | null
  difficultLevel: string | null
  isPaid: boolean
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

interface TestsState {
  tests: Test[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TestsState = {
  tests: [],
  status: 'idle',
  error: null
}

// ** Fetch Tests Thunk
export const fetchData = createAsyncThunk('tests/fetchTests', async () => {
  const response = await axios.get('https://iqtest-server.onrender.com/api/tests')

  return response.data.test
})

// ** Delete Test Thunk
export const deleteTest = createAsyncThunk('tests/deleteTest', async (id: number | string, { dispatch }: Redux) => {
  const respond = await axios.delete(`https://iqtest-server.onrender.com/api/tests/${id}`)

  // return id
  dispatch(fetchData())

  return respond.data.test
})

// ** Tests Slice
export const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tests = action.payload
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch tests'
      })
      .addCase(deleteTest.fulfilled, (state, action) => {
        state.tests = state.tests.filter(test => test.id !== action.payload)
      })
  }
})

export default testsSlice.reducer
