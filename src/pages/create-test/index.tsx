import * as React from 'react'
import { useContext, useState } from 'react'
import Grid from '@mui/material/Grid'
import TurnRightIcon from '@mui/icons-material/TurnRight'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

// import dayjs, { Dayjs } from 'dayjs'

// ** Styled Component Import
import { CreateTestWrapper, SubmitButton } from 'src/@core/styles/libs/create-test'
import Introduction from 'src/views/components/create-test/Introduction'
import { TestContext } from 'src/context/TestContext'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'

// import Answers from 'src/views/components/create-test/Answers'
// import { TestContext } from 'src/context/TestContext'
// import { useState } from 'react'

const CreateTest = () => {
  // Get the context value
  // Get the context value
  const { test, testName, category, description, selectedTime, isPaid } = useContext(TestContext)

  // Add state for alert
  const [alert, setAlert] = useState<{
    show: boolean
    message: string
    severity: 'error' | 'info' | 'success' | 'warning'
  }>({ show: false, message: '', severity: 'success' })

  const handleClose = (event: React.SyntheticEvent | Event, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlert(prevAlert => ({ ...prevAlert, show: false }))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAlertClose = (_event: React.SyntheticEvent<Element, Event>) => {
    setAlert(prevAlert => ({
      ...prevAlert,
      show: false
    }))
  }

  const handleSubmit = async () => {
    const emptyAnswers = {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
      answer7: '',
      answer8: '',
      answer9: '',
      answer10: ''
    }

    const payload = {
      name: testName,
      testTypeId: 1,
      description,
      timeLimit: selectedTime ? selectedTime.format('HH:mm:ss') : '00:00:00',
      totalQuestion: test.length,
      status: 'Active',
      explanation: category,
      difficultLevel: 'Hard',
      isPaid: isPaid ? 1 : 0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      questions: test.map((question, index) => ({
        questionText: question.questionText,
        ...emptyAnswers,
        ...question.answers.reduce((acc: Record<string, string>, curr: string, idx: number) => {
          acc[`answer${idx + 1}`] = curr

          return acc
        }, {}),
        correctAnswer: question.correctAnswer,
        point: 1,
        questionType: question.questionType, // Update it accordingly
        difficultLevel: question.difficultLevel, // Update it accordingly
        imagePath: question.imagePath // Update it accordingly
      }))
    }

    console.log('Payload: ', payload)

    const response = await fetch('https://iqtest-server.onrender.com/api/tests/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const responseData = await response.json()

    if (!response.ok) {
      // Handle error
      console.error('Error submitting data')
      setAlert({ show: true, message: `Error: ${responseData.message}`, severity: 'error' })
    } else {
      // Handle success
      console.log('Success!')
      setAlert({ show: true, message: `Success!`, severity: 'success' })
    }

    // Reload the page after submit
    window.location.reload()
  }

  return (
    <CreateTestWrapper>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Introduction />
        </Grid>
        <Grid item xs={3}>
          <SubmitButton onClick={handleSubmit}>
            <Button variant='contained' startIcon={<TurnRightIcon />}>
              add new test
            </Button>
          </SubmitButton>

          {/* Add Alert component here */}
          <Snackbar open={alert.show} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleAlertClose} severity={alert.severity} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </CreateTestWrapper>
  )
}

export default CreateTest
