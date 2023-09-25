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
  answer1?: string
  answer2?: string
  answer3?: string
  answer4?: string
  answer5?: string
  answer6?: string
  answer7?: string
  answer8?: string
  answer9?: string
  answer10?: string
  correctAnswer: number
  point: number
}

export type AnswerType = {
  id: number
  answerText: string
}

export type TestResultType = {
  id: number
  testId: number
  userId: number
  startTime: Date
  endTime: Date
  duration: any
  totalQuestions: number
  totalScore: number
  testType: string
  testTypeName?: string
  description?: string
  timeLimit?: any
  explanation?: string
  difficultLevel?: string
  totalCorrectAnswers: number
  test?: TestType
}
