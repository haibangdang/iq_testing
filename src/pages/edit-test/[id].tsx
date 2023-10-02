import * as React from 'react'
import { useContext, useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import TurnRightIcon from '@mui/icons-material/TurnRight'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

// import dayjs, { Dayjs } from 'dayjs'

// ** Styled Component Import
import { EditTestWrapper, SubmitButton } from 'src/@core/styles/libs/edit-test'
import Introduction from 'src/views/components/create-test/Introduction'
import { TestContext } from 'src/context/TestContext'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'

// import { QuestionType } from 'src/types/apps/takeTestTypes'

// import Answers from 'src/views/components/create-test/Answers'
// import { TestContext } from 'src/context/TestContext'
// import { useState } from 'react'

const EditTest = () => {
  // Get the context value
  // Get the context value
  const { test, testName, category, categoryIndex, description, selectedTime, isPaid, difficulty } =
    useContext(TestContext)

  const router = useRouter()
  const { id } = router.query // Lấy id từ route

  const [testData, setTestData] = useState(null)

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

  useEffect(() => {
    if (!id) return

    const fetchTestData = async () => {
      try {
        const response = await fetch(`https://iqtest-server.onrender.com/api/tests/${id}`)
        const data = await response.json()
        setTestData(data)
      } catch (error) {
        console.error('Error fetching test data:', error)
      }
    }

    fetchTestData()
  }, [id])

  type AnswerAccumulator = {
    [key: string]: string
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

    console.log('Test: ', test)
    console.log('Test data: ', testData)

    const extractAnswers = (question: { answers?: string[]; [key: string]: any }) => {
      if (question.answers && question.answers.length) {
        return question.answers.reduce((acc: AnswerAccumulator, curr, idx) => {
          acc[`answer${idx + 1}`] = curr

          return acc
        }, {})
      }

      const extracted: AnswerAccumulator = {}
      for (let i = 1; i <= 10; i++) {
        extracted[`answer${i}`] = question[`answer${i}`] || ''
      }

      return extracted
    }

    const payload = {
      name: testName,
      testTypeId: categoryIndex,
      description,
      timeLimit: selectedTime ? selectedTime.format('HH:mm:ss') : '00:00:00',
      totalQuestion: test.length,
      status: 'Active',
      explanation: category,
      difficultLevel: difficulty,
      isPaid: isPaid ? 1 : 0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      questions: test.map((question, index) => {
        // Cơ bản lấy thông tin từ question
        const questionInfo = {
          id: null,
          questionText: question.questionText.replace(/<\/?p>/g, ''),
          ...emptyAnswers,
          ...extractAnswers(question),
          correctAnswer: question.correctAnswer,
          point: 1,
          questionType: question.questionType, // Update it accordingly
          difficultLevel: question.difficultLevel, // Update it accordingly
          imagePath: question.imagePath // Update it accordingly
        }

        if (question.id !== null && question.id !== undefined) {
          questionInfo.id = question.id
        }

        return questionInfo
      })
    }

    console.log('Payload update: ', payload)

    const response = await fetch(`https://iqtest-server.onrender.com/api/tests/${id}`, {
      method: 'PUT',
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

  if (!testData) return <div>Loading...</div>

  return (
    <EditTestWrapper>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Introduction initialData={testData} />
        </Grid>
        <Grid item xs={3}>
          <SubmitButton onClick={handleSubmit}>
            <Button variant='contained' startIcon={<TurnRightIcon />}>
              Update Test
            </Button>
          </SubmitButton>

          <Snackbar open={alert.show} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleAlertClose} severity={alert.severity} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </EditTestWrapper>
  )
}

export default EditTest
