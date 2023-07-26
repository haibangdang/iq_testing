import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// import { Dispatch } from 'redux'

// ** Fetch all Tests
export const fetchAllTest = createAsyncThunk('fetchAllTests', async () => {
  try {
    const response = await fetch('https://iqtest-server.onrender.com/api/tests', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const responseData = await response.json();

return responseData;

  } catch (error:any) {
    throw new Error(error.message);
  }
});

// ** Select Chat
export const selectedTest = createAsyncThunk('selectedTest',async (id: number|undefined) => {
  try {
    const response = await fetch(`https://iqtest-server.onrender.com/api/tests/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const responseData = await response.json();

    console.log('selectedTest', responseData);

  return responseData;

  } catch (error:any) {
    throw new Error(error.message);
  }
})

// ** Delete test
// export const deleteTest = createAsyncThunk('deleteTest', async (id: number, { dispatch }) => {
//   try {
//     const response = await fetch('https://iqtest-server.onrender.com/api/tests', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Request failed');
//     }

//     const responseData = await response.json();

//     await dispatch(fetchAllTest())


//     return responseData;

//   } catch (error:any) {
//     throw new Error(error.message);
//   }
// })

export const testSlice = createSlice({
  name: 'appChat',
  initialState: {
    test: {},
    selectedTest: null
  },
  reducers: {},

  extraReducers: builder => {
    builder.addCase(fetchAllTest.fulfilled, (state, action) => {
      state.test = action.payload.test
    })
    builder.addCase(selectedTest.fulfilled, (state, action) => {
      state.selectedTest = action.payload
    })
  }
})

export default testSlice.reducer