// TestDisplay.tsx
import React from 'react'
import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import { TestResultDetailItem, TestResultDetailType } from 'src/types/apps/takeTestTypes'
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
  detailItem: TestResultDetailItem
  selectedAnswer?: string
  correctAnswer?: string
}

function TabPanel(props: TabPanelProps) {
  const { value, index, detailItem, selectedAnswer, correctAnswer, ...other } = props

  console.log('Detail item : ', detailItem)

  const answers = []
  for (let i = 1; i <= 10; i++) {
    const answerKey = `answer${i}` as keyof TestResultDetailItem
    const answer = detailItem[answerKey]
    if (answer) {
      answers.push(answer)
    } else {
      break
    }
  }

  const determineColor = (answerIndex: number) => {
    const selectedAns = Number(selectedAnswer) - 1
    const correctAns = Number(correctAnswer) - 1

    if (answerIndex === selectedAns && answerIndex === correctAns) {
      return 'green' // Selected and correct
    } else if (answerIndex === selectedAns) {
      return 'red' // Selected but incorrect
    } else if (answerIndex === correctAns) {
      return 'green' // Not selected but correct
    }

    return ''
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
            <Typography>{detailItem.questionText}</Typography>
          </Box>
          <RadioGroup
            aria-label='answers'
            name={`question-${detailItem.id}`}
            value={(Number(selectedAnswer) - 1).toString()}
          >
            {answers.map((answer, i) => (
              <FormControlLabel
                key={i}
                value={`${i}`}
                control={<Radio style={{ color: determineColor(i) }} disabled={true} />}
                label={answer}
                style={{ color: determineColor(i) }}
              />
            ))}
          </RadioGroup>
        </Box>
      )}
    </div>
  )
}

interface TestResultDisplayProps {
  testResult: TestResultDetailType | null
}

const TestResultDisplay: React.FC<TestResultDisplayProps> = ({ testResult }) => {
  const [value, setValue] = React.useState(0)

  //   const testResultDetailList = testResult?.testResultDetails

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const [openRetakeDialog, setOpenRetakeDialog] = useState(false)

  const handleOpenRetakeDialog = () => {
    setOpenRetakeDialog(true)
  }

  const handleConfirmRetake = () => {
    const testId = testResult?.testId
    if (testId) {
      window.location.href = `/apps/test/view/${testId}`
    }
  }

  const determineScoreColor = (score: number | undefined) => {
    if (score === undefined) return 'inherit'
    if (score >= 100) return 'green'
    if (score >= 80) return 'orange'

    return 'red'
  }

  return (
    <Box>
      <Box sx={{ border: '1px solid gray', padding: '1rem', marginBottom: '1rem' }}>
        <Box sx={{ marginBottom: '1rem' }}>
          <Box>Name:</Box>
          {/* <Typography variant='h5'>{testResult.testName}</Typography> */}
        </Box>
      </Box>
      <Box sx={{ border: '1px solid gray', padding: '1rem', marginBottom: '1rem' }}>
        <Box>
          <Box>Introduction:</Box>
          <Typography variant='body1'>{testResult?.description}</Typography>
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
              {testResult?.testResultDetails.map((detailItem, index) => (
                <Tab key={index} label={detailItem.questionText} />
              ))}
            </Tabs>
            {testResult?.testResultDetails.map((detailItem, index) => {
              const answers = []
              for (let i = 1; i <= 10; i++) {
                const answer = (detailItem as any)[`answer${i}`]
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
                  detailItem={detailItem}
                  selectedAnswer={detailItem.answer}
                  correctAnswer={detailItem.correctAnswer.toString()}
                >
                  <Typography variant='h6'>{detailItem.questionText}</Typography>
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
              <Typography variant='subtitle1' fontWeight='bold'>
                Category: {testResult?.testTypeName?.toString()}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant='subtitle1' fontWeight='bold'>
                Time limit: {testResult?.timeLimit}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant='subtitle1' fontWeight='bold'>
                Difficulty: {testResult?.difficultLevel}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant='subtitle1'
                fontWeight='bold'
                sx={{ color: determineScoreColor(testResult?.totalScore) }}
              >
                Total score: {testResult?.totalScore}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Button variant='contained' color='primary' onClick={handleOpenRetakeDialog}>
        Retake Test
      </Button>

      <Dialog open={openRetakeDialog} onClose={() => setOpenRetakeDialog(false)}>
        <DialogTitle>Are you sure you want to retake the test?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenRetakeDialog(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirmRetake} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Button variant='contained' color='primary' disabled={testStarted} onClick={handleStartTest}>
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
      </Dialog> */}
    </Box>
  )
}

export default TestResultDisplay
