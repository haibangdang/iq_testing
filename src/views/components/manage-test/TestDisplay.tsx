// TestDisplay.tsx
import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { TestType, QuestionType } from 'src/types/apps/takeTestTypes'
import axios from 'axios'
import Button from '@mui/material/Button'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  question: QuestionType // add this line
  selectedAnswer?: string
  onAnswerChange: (questionId: number, event: React.ChangeEvent<HTMLInputElement>) => void
  testStarted: boolean
}

function TabPanel(props: TabPanelProps) {
  const { value, index, question, selectedAnswer, onAnswerChange, testStarted, ...other } = props

  console.log('Question : ', question)

  const answers = []
  for (let i = 1; i <= 10; i++) {
    const answerKey = `answer${i}` as keyof QuestionType
    const answer = question[answerKey]
    if (answer) {
      answers.push(answer)
    } else {
      break
    }
  }

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box sx={{ border: '1px solid gray', padding: 2, marginBottom: 2 }}>
            <Typography>{question.questionText}</Typography>
          </Box>
          <RadioGroup
            aria-label='answers'
            name={`question-${question.id}`}
            value={selectedAnswer}
            onChange={event => onAnswerChange(question.id, event)}
          >
            {answers.map((answer, i) => (
              <FormControlLabel
                key={i}
                value={`${i}_${answer}`}
                control={<Radio disabled={!testStarted} />}
                label={answer}
              />
            ))}
          </RadioGroup>
        </Box>
      )}
    </div>
  )
}

// function a11yProps(index: number) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`
//   }
// }

interface TestDisplayProps {
  test: TestType
}

const TestDisplay: React.FC<TestDisplayProps> = ({ test }) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<number, string>>({})

  const [startTime, setStartTime] = useState<Date | null>(null)
  const [testStarted, setTestStarted] = useState(false)

  // Somewhere in your component, after you retrieve the test data:
  const [hours, minutes, seconds] = test.timeLimit.split(':').map(Number)
  const timeLimitInSeconds = hours * 3600 + minutes * 60 + seconds

  const [timeRemaining, setTimeRemaining] = useState(timeLimitInSeconds)

  const handleAnswerChange = (questionId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: event.target.value
    }))
  }

  const [openDialog, setOpenDialog] = useState(false)
  const [testScore, setTestScore] = useState<number | null>(null)

  const handleSubmitTest = useCallback(async () => {
    const endTime = new Date()

    // Convert timeLimit string to duration in milliseconds
    const [hours, minutes, seconds] = test.timeLimit.split(':').map(Number)
    const durationMillis = (hours * 3600 + minutes * 60 + seconds) * 1000
    const endTimeAdjusted = new Date(endTime.getTime() - durationMillis)

    const userDataStr = window.localStorage.getItem('userData')
    const userDataObj = userDataStr ? JSON.parse(userDataStr) : null
    const userId = userDataObj ? userDataObj.id : null

    if (!userId || !startTime || !endTime) {
      // Handle error cases here, such as showing a warning message
      return
    }

    const payload = {
      userId: userId,
      testId: test.id,
      startTime: startTime ? startTime.toISOString() : endTimeAdjusted.toISOString(),
      endTime: endTime.toISOString(),
      duration: test.timeLimit,
      answers: Object.entries(selectedAnswers).map(([questionId, answerStr]) => {
        const [answerIndex] = answerStr.split('_')

        return {
          questionId: parseInt(questionId, 10),
          answer: (parseInt(answerIndex) + 1).toString()
        }
      })
    }

    try {
      const response = await axios.post('https://iqtest-server.onrender.com/api/tests/testResults', payload)
      if (response.status === 200) {
        // Handle success - maybe show a success message or navigate to another page
        setTestScore(response.data.totalScore)
        setOpenDialog(true)
        setTestStarted(false)
      }
    } catch (error) {
      // Handle error - show an error message to the user
    }
  }, [startTime, test.id, test.timeLimit, selectedAnswers])

  const handleStartTest = () => {
    setStartTime(new Date())
    setTestStarted(true)
  }

  useEffect(() => {
    if (testStarted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }

    if (timeRemaining === 0) {
      handleSubmitTest()
    }
  }, [testStarted, timeRemaining, handleSubmitTest])

  return (
    <Box>
      <Box sx={{ border: '1px solid gray', padding: '1rem', marginBottom: '1rem' }}>
        <Box sx={{ marginBottom: '1rem' }}>
          <Box>Name:</Box>
          <Typography variant='h5'>{test.testName}</Typography>
        </Box>
      </Box>
      <Box sx={{ border: '1px solid gray', padding: '1rem', marginBottom: '1rem' }}>
        <Box>
          <Box>Introduction:</Box>
          <Typography variant='body1'>{test.description}</Typography>
        </Box>
      </Box>

      <Grid container spacing={0} sx={{ bgcolor: 'background.paper' }}>
        <Grid item xs={9}>
          <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
            <Tabs
              orientation='vertical'
              value={value}
              onChange={handleChange}
              aria-label='Vertical tabs example'
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              {test.questions.map((question, index) => (
                <Tab key={index} label={question.questionText} />
              ))}
            </Tabs>
            {test.questions.map((question, index) => {
              const answers = []
              for (let i = 1; i <= 10; i++) {
                const answer = (question as any)[`answer${i}`]
                if (answer) {
                  answers.push(answer)
                } else {
                  break
                }
              }

              return (
                <TabPanel
                  key={index}
                  value={value}
                  index={index}
                  question={question}
                  selectedAnswer={selectedAnswers[question.id]}
                  onAnswerChange={handleAnswerChange}
                  testStarted={testStarted}
                >
                  <Typography variant='h6'>{question.questionText}</Typography>
                  {answers.map((answer, i) => (
                    <Typography key={i}>{answer}</Typography>
                  ))}
                </TabPanel>
              )
            })}
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ minWidth: 220, mt: 4, mr: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant='subtitle1'>Category: {test.testType}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant='subtitle1'>Time limit: {test.timeLimit}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant='subtitle1'>Difficulty: {test.difficultLevel}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <FormControlLabel control={<Checkbox checked={test.isPaid} name='isPaid' disabled />} label='Paid Test' />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Button variant='contained' color='primary' disabled={testStarted} onClick={handleStartTest}>
        Start Test
      </Button>

      <Typography variant='h6'>
        Time Remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60}
      </Typography>

      <Button variant='contained' color='secondary' onClick={handleSubmitTest} disabled={!testStarted}>
        Submit
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Your Score: {testScore}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TestDisplay
