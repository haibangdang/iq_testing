export type TakeTestLayoutProps = {
  id: number | undefined
}

export type TestType = {
  id: number
  testName: string
  testType: string
  difficultLevel: string
  description: string
  timeLimit: any
  totalQuestion: number
  questions: QuestionType[]
  isPaid: boolean
}

export type QuestionType = {
  id: number
  questionText: string
  answers: AnswerType[]
  correctAnswer: number
  point: number
}

export type AnswerType = {
  id: number
  answerText: string
}
