import * as React from 'react'
import Grid from '@mui/material/Grid'
import TurnRightIcon from '@mui/icons-material/TurnRight'
import Button from '@mui/material/Button'

// ** Styled Component Import
import { CreateTestWrapper, SubmitButton } from 'src/@core/styles/libs/create-test'
import Introduction from 'src/views/components/create-test/Introduction'
import Answers from 'src/views/components/create-test/Answers'
import { TestContext } from 'src/context/TestContext'
import { useState } from 'react'

const CreateTest = () => {
  const [answers, setAnswers] = useState<string[]>(['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'])
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)

  const handleListItemClick = (index: number) => {
    setCorrectAnswer(index)
  }

  const handleAddAnswer = () => {
    if (answers.length < 10) {
      setAnswers(prevAnswers => [...prevAnswers, `Answer ${prevAnswers.length + 1}`])
    } else {
      alert('You can add up to 10 answers')
    }
  }

  const handleSubmit = async () => {
    const payload = {
      answers: answers,
      correctAnswer: correctAnswer
    }

    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      // handle error
      console.error('Error submitting data')
    } else {
      // handle success
      console.log('Success!')
    }
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
          {/* <Answers
            answers={answers}
            correctAnswer={correctAnswer}
            handleListItemClick={handleListItemClick}
            handleAddAnswer={handleAddAnswer}
          /> */}
        </Grid>
      </Grid>
    </CreateTestWrapper>
  )
}

export default CreateTest
