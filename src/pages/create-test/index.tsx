import * as React from 'react'
import Grid from '@mui/material/Grid'
import TurnRightIcon from '@mui/icons-material/TurnRight'
import Button from '@mui/material/Button'

// ** Styled Component Import
import { CreateTestWrapper, SubmitButton } from 'src/@core/styles/libs/create-test'
import Introduction from 'src/views/components/create-test/Introduction'

const CreateTest = () => {
  return (
    <CreateTestWrapper>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Introduction />
        </Grid>
        <Grid item xs={3}>
          <SubmitButton>
            <Button variant='contained' startIcon={<TurnRightIcon />}>
              add new test
            </Button>
          </SubmitButton>
        </Grid>
      </Grid>
    </CreateTestWrapper>
  )
}

export default CreateTest
