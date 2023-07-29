import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField' // <-- Import this

interface AnswersProps {
  index: number
  answers: string[]
  correctAnswer: number | null
  handleListItemClick: (index: number) => void
  handleAddAnswer: () => void
  handleAnswerChange: (answerIndex: number, newAnswer: string) => void // <-- Add this
}

export default function Answers({
  answers,
  correctAnswer,
  handleListItemClick,
  handleAddAnswer,
  handleAnswerChange
}: AnswersProps) {
  if (!answers || !Number.isInteger(correctAnswer)) {
    return null
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component='nav' aria-label='secondary mailbox folder'>
        {answers.map((answer, index) => (
          <ListItemButton key={index} selected={correctAnswer === index} onClick={() => handleListItemClick(index)}>
            <TextField
              value={answer}
              onChange={e => handleAnswerChange(index, e.target.value)} // <-- Handle change
            />
            <ListItemText primary={correctAnswer === index ? ' (Correct Answer)' : ''} />
          </ListItemButton>
        ))}
        <ListItemButton onClick={handleAddAnswer}>
          <ListItemText primary='Add new' />
        </ListItemButton>
      </List>
    </Box>
  )
}
