import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function Descriptions() {
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 0 }
      }}
      noValidate
      autoComplete='off'
    >
      <Box>
        <Box>Description:</Box>
        <TextField
          fullWidth
          id='outlined-multiline-static'
          label=''
          multiline
          rows={9}
          defaultValue='Add details about question ...'
        />
      </Box>
    </Box>
  )
}
