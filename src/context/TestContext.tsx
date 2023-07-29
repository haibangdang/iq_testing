import { createContext, useState } from 'react'

interface ITestContext {
  test: any[]
  setTest: React.Dispatch<React.SetStateAction<any[]>>
  handleAddAnswer: (questionIndex: number) => void
  handleSetCorrectAnswer: (questionIndex: number, answerIndex: number) => void
}

const TestContext = createContext<ITestContext>({
  test: [],
  setTest: () => {
    throw new Error('setTest function must be overridden')
  },
  handleAddAnswer: () => {
    throw new Error('handleAddAnswer function must be overridden')
  },
  handleSetCorrectAnswer: () => {
    throw new Error('handleSetCorrectAnswer function must be overridden')
  }
})

const TestProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [test, setTest] = useState<any[]>([
    {
      questionText: 'Question 1',
      answers: [],
      correctAnswer: -1
    }
  ])

  // Add logic to handle adding an answer to a specific question
  const handleAddAnswer = (questionIndex: number) => {
    setTest(prevTest => {
      const newTest = [...prevTest]
      const newQuestion = {
        ...newTest[questionIndex],
        answers: [...newTest[questionIndex].answers, `Answer ${newTest[questionIndex].answers.length + 1}`]
      }
      newTest[questionIndex] = newQuestion

      return newTest
    })
  }

  const handleSetCorrectAnswer = (questionIndex: number, answerIndex: number) => {
    setTest(prevTest => {
      const newTest = [...prevTest]
      newTest[questionIndex].correctAnswer = answerIndex

      return newTest
    })
  }

  const value = { test, setTest, handleAddAnswer, handleSetCorrectAnswer }

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>
}

export { TestContext, TestProvider }
