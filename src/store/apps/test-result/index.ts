import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Dispatch } from 'redux'

// ** TestResult Definition
interface TestResult {
  id: number
  testId: number
  userId: number
  startTime: Date
  endTime: Date
  duration: string
  totalQuestions: number
  totalScore: number
  testType: string
  testTypeName: string | null
  description: string | null
  timeLimit: string | null
  explanation: string | null
  difficultLevel: string | null
  totalCorrectAnswers: number
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

interface TestsState {
  selectedTestResult: any
  tests: TestResult[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TestsState = {
  tests: [],
  status: 'idle',
  error: null,
  selectedTestResult: null
}

let userDataStr: string | null = null
let userDataObj: any = null
let userId: number | null = null

if (typeof window !== 'undefined') {
  // Kiểm tra xem code đang chạy ở phía client
  userDataStr = window.localStorage.getItem('userData')
  userDataObj = userDataStr ? JSON.parse(userDataStr) : null
  userId = userDataObj ? userDataObj.id : null
}

// ** Fetch Tests Result Thunk
export const fetchTestResult = createAsyncThunk('tests/fetchTestResults', async () => {
  if (!userId) {
    throw new Error('User ID is not available')
  }
  const response = await axios.get(`https://iqtest-server.onrender.com/api/tests/history/${userId}`)

  return response.data.test
})

export const selectedTestResult = createAsyncThunk('tests/selectedTestResults', async (id: number | string) => {
  const response = await axios.get(`https://iqtest-server.onrender.com/api/tests/results/${id}`)

  return response.data
})

// ** Delete Test Thunk
export const deleteTestResult = createAsyncThunk(
  'tests/deleteTest',
  async (id: number | string, { dispatch }: Redux) => {
    const respond = await axios.delete(`https://iqtest-server.onrender.com/api/tests/results/${id}`)

    dispatch(fetchTestResult())

    return respond.data.test
  }
)

// ** Tests Result Slice
export const testResultsSlice = createSlice({
  name: 'testResults',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTestResult.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchTestResult.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tests = action.payload
      })
      .addCase(fetchTestResult.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch tests'
      })
      .addCase(deleteTestResult.fulfilled, (state, action) => {
        state.tests = state.tests.filter(test => test.id !== action.payload)
      })
  }
})

export default testResultsSlice.reducer
