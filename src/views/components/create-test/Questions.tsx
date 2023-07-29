import React, { useContext } from 'react'

// import React, { useContext, useState } from 'react'
import { Grid } from '@mui/material'
import Editor, { Modules } from './Editor'
import Answers from './Answers'
import { TestContext } from 'src/context/TestContext'

interface QuestionProps {
  index: number
  handleListItemClick: (index: number) => void
}

const Question: React.FC<QuestionProps> = ({ index }) => {
  const { test, handleAddAnswer, handleSetCorrectAnswer, handleAnswerChange } = useContext(TestContext)
  const question = test[index]

  const handleAddAnswerClick = () => {
    handleAddAnswer(index)
  }

  const handleListItemClick = (answerIndex: number) => {
    handleSetCorrectAnswer(index, answerIndex)
  }

  const modules: Modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  }

  const handleAnswerChangeWrapper = (answerIndex: number, newAnswer: string) => {
    handleAnswerChange(index, answerIndex, newAnswer)
  }

  return (
    <Grid container spacing={0} sx={{ bgcolor: 'background.paper' }}>
      <Grid item xs={12} md={12}>
        {/* <Editor initialValue={editorContent} onChange={handleEditorChange} modules={modules} /> */}
        <Editor initialValue={question.questionText} modules={modules} index={index} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Answers
          index={index}
          answers={question.answers}
          correctAnswer={question.correctAnswer}
          handleListItemClick={handleListItemClick}
          handleAddAnswer={handleAddAnswerClick}
          handleAnswerChange={handleAnswerChangeWrapper}
        />
      </Grid>
    </Grid>
  )
}

export default Question
