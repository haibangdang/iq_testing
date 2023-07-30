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
  isPaid: boolean
}
