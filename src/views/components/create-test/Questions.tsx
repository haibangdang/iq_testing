import React, { useContext } from 'react'
import { Grid, Box } from '@mui/material'
import Editor from './Editor'
import Answers from './Answers'
import { TestContext } from 'src/context/TestContext'

interface QuestionProps {
  index: number
  //   handleAddAnswer: () => void
  handleListItemClick: (index: number) => void
}

const Question: React.FC<QuestionProps> = ({ index }) => {
  const { test, handleAddAnswer, handleSetCorrectAnswer } = useContext(TestContext)
  const question = test[index]

  const handleAddAnswerClick = () => {
    handleAddAnswer(index)
  }

  const handleListItemClick = (answerIndex: number) => {
    handleSetCorrectAnswer(index, answerIndex)
  }

  return (
    <Grid container spacing={0} sx={{ bgcolor: 'background.paper' }}>
      <Grid item xs={12} md={12}>
        <Editor />
      </Grid>
      <Grid item xs={12} md={12}>
        <Answers
          index={index}
          answers={question.answers}
          correctAnswer={question.correctAnswer}
          handleListItemClick={handleListItemClick}
          handleAddAnswer={handleAddAnswerClick} // Use the function that calls handleAddAnswer with the current question index
        />
      </Grid>
    </Grid>
  )
}

export default Question
