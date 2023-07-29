import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import IconButton from '@mui/material/IconButton' // <-- Import this
import DeleteIcon from '@mui/icons-material/Delete' // <-- Import this

interface AnswersProps {
  index: number
  answers: string[]
  correctAnswer: number | null
  handleListItemClick: (index: number) => void
  handleAddAnswer: () => void
  handleAnswerChange: (answerIndex: number, newAnswer: string) => void
  handleRemoveAnswer: (answerIndex: number) => void // <-- Add this
}

export default function Answers({
  answers,
  correctAnswer,
  handleListItemClick,
  handleAddAnswer,
  handleAnswerChange,
  handleRemoveAnswer // <-- Add this
}: AnswersProps) {
  if (!answers || !Number.isInteger(correctAnswer)) {
    return null
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component='nav' aria-label='secondary mailbox folder'>
        {answers.map((answer, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <ClickAwayListener onClickAway={() => handleAnswerChange(index, answer)}>
              <TextField value={answer} onChange={e => handleAnswerChange(index, e.target.value)} fullWidth />
            </ClickAwayListener>
            <ListItemButton selected={correctAnswer === index} onClick={() => handleListItemClick(index)}>
              <ListItemText
                primary={correctAnswer === index ? ' (Correct Answer)' : 'Select as Correct'}
                sx={{ color: correctAnswer === index ? 'green' : 'black' }}
              />
            </ListItemButton>
            <IconButton onClick={() => handleRemoveAnswer(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <ListItemButton onClick={handleAddAnswer}>
          <ListItemText primary='Add new' />
        </ListItemButton>
      </List>
    </Box>
  )
}
