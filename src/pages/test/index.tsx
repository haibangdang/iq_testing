import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link'
import HistoryTable from 'src/views/components/test/HistoryTable'

const TestPage = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <h1>Test History</h1>
          <Box>VIew Your Test History</Box>
        </Box>
        <Box component={Link} href='/create-test'>
          <Button variant='contained'>Add</Button>
        </Box>
      </Box>
      <Box sx={{ mt: 4}}>
        <HistoryTable />
      </Box>
    </Box>
  )
}

TestPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TestPage
