import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

// import { useState } from 'react'

// Answers.tsx

interface AnswersProps {
  index: number
  answers: string[]
  correctAnswer: number | null
  handleListItemClick: (index: number) => void
  handleAddAnswer: () => void
}

export default function Answers({ answers, correctAnswer, handleListItemClick, handleAddAnswer }: AnswersProps) {
  // const [answers, setAnswers] = useState<string[]>(['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'])
  // const [correctAnswer, setCorrectAnswer] = useState<number | null>(null)

  // const handleListItemClick = (index: number) => {
  //   setCorrectAnswer(index)
  // }

  // const handleAddAnswer = () => {
  //   if (answers.length < 10) {
  //     setAnswers(prevAnswers => [...prevAnswers, `Answer ${prevAnswers.length + 1}`])
  //   } else {
  //     alert('You can add up to 10 answers')
  //   }
  // }

  // const handleSubmit = () => {
  //   // handle your submit logic here
  //   // you can access your answers using `answers` state and correct answer using `correctAnswer` state
  // }
  if (!answers || !Number.isInteger(correctAnswer)) {
    return null
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component='nav' aria-label='secondary mailbox folder'>
        {answers.map((answer, index) => (
          <ListItemButton key={index} selected={correctAnswer === index} onClick={() => handleListItemClick(index)}>
            <ListItemText primary={answer + (correctAnswer === index ? ' (Correct Answer)' : '')} />
          </ListItemButton>
        ))}
        <ListItemButton onClick={handleAddAnswer}>
          <ListItemText primary='Add new' />
        </ListItemButton>
      </List>
    </Box>
  )
}
