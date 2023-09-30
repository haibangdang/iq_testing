import { createContext, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

interface ITestContext {
  test: any[]
  setTest: React.Dispatch<React.SetStateAction<any[]>>
  testName: string
  setTestName: React.Dispatch<React.SetStateAction<string>>
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
  categoryIndex: number | null
  setCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  selectedTime: Dayjs | null
  setSelectedTime: React.Dispatch<React.SetStateAction<Dayjs | null>>
  isPaid: boolean
  setIsPaid: React.Dispatch<React.SetStateAction<boolean>>
  difficulty: string
  setDifficulty: React.Dispatch<React.SetStateAction<string>>
  handleAddAnswer: (questionIndex: number) => void
  handleSetCorrectAnswer: (questionIndex: number, answerIndex: number) => void
  handleUpdateQuestionText: (questionIndex: number, newText: string) => void
  handleAnswerChange: (questionIndex: number, answerIndex: number, newAnswer: string) => void
  handleRemoveAnswer: (questionIndex: number, answerIndex: number) => void
  handleRemoveQuestion: (questionIndex: number) => void
}

const TestContext = createContext<ITestContext>({
  test: [],
  setTest: () => {
    throw new Error('setTest function must be overridden')
  },
  testName: '',
  setTestName: () => {
    throw new Error('setTestName function must be overridden')
  },
  category: '',
  setCategory: () => {
    throw new Error('setCategory function must be overridden')
  },
  categoryIndex: null,
  setCategoryIndex: () => {
    throw new Error('setCategoryIndex function must be overridden')
  },
  description: '',
  setDescription: () => {
    throw new Error('setDescription function must be overridden')
  },
  selectedTime: null,
  setSelectedTime: () => {
    throw new Error('setSelectedTime function must be overridden')
  },
  isPaid: false,
  setIsPaid: () => {
    throw new Error('setIsPaid function must be overridden')
  },
  difficulty: '',
  setDifficulty: () => {
    throw new Error('setDifficulty function must be overridden')
  },
  handleAddAnswer: () => {
    throw new Error('handleAddAnswer function must be overridden')
  },
  handleSetCorrectAnswer: () => {
    throw new Error('handleSetCorrectAnswer function must be overridden')
  },
  handleUpdateQuestionText: () => {
    throw new Error('handleUpdateQuestionText function must be overridden')
  },
  handleAnswerChange: () => {
    throw new Error('handleAnswerChange function must be overridden')
  },
  handleRemoveAnswer: () => {
    throw new Error('handleRemoveAnswer function must be overridden')
  },
  handleRemoveQuestion: () => {
    // Add this
    throw new Error('handleRemoveQuestion function must be overridden')
  }
})

const TestProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [test, setTest] = useState<any[]>([
    {
      questionName: 'Question 1',
      questionText: 'Question 1',
      answers: [],
      correctAnswer: -1
    }
  ])

  const [testName, setTestName] = useState('')
  const [category, setCategory] = useState('')
  const [categoryIndex, setCategoryIndex] = useState<number | null>(null)
  const [description, setDescription] = useState('')
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'))
  const [isPaid, setIsPaid] = useState(false)

  const [difficulty, setDifficulty] = useState<string>('')

  // Add logic to handle adding an answer to a specific question
  const handleAddAnswer = (questionIndex: number) => {
    setTest(prevTest => {
      const newTest = [...prevTest]

      // if (!newTest[questionIndex]) {
      //   console.error(`Question with index ${questionIndex} does not exist`)

      //   return prevTest
      // }

      if (newTest[questionIndex].answers.length < 10) {
        const newQuestion = {
          ...newTest[questionIndex],
          answers: [...newTest[questionIndex].answers, `Answer ${newTest[questionIndex].answers.length + 1}`]
        }
        newTest[questionIndex] = newQuestion
      } else {
        alert('You can add up to 10 answers only.')
      }

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

  const handleUpdateQuestionText = (questionIndex: number, newText: string) => {
    setTest(prevTest => {
      const newTest = [...prevTest]
      newTest[questionIndex].questionText = newText

      return newTest
    })
  }

  const handleAddQuestion = () => {
    setTest(prevTest => [
      ...prevTest,
      {
        questionName: `Question ${prevTest.length + 1}`, // thêm questionName
        questionText: `Question ${prevTest.length + 1}`,
        answers: [],
        correctAnswer: -1
      }
    ])
  }

  const handleAnswerChange = (questionIndex: number, answerIndex: number, newAnswer: string) => {
    setTest(prevTest => {
      const newTest = [...prevTest]
      if (newTest[questionIndex] === undefined) {
        console.error(`Question with index ${questionIndex} does not exist`)

        return prevTest
      }

      // if (!newTest[questionIndex] || !newTest[questionIndex].answers) {
      //   console.error(`Question or answers array does not exist for index ${questionIndex}`)

      //   return prevTest
      // }

      if (newTest[questionIndex].answers[answerIndex] === undefined) {
        console.error(`Answer with index ${answerIndex} does not exist for question ${questionIndex}`)

        return prevTest
      }

      newTest[questionIndex].answers[answerIndex] = newAnswer

      return newTest
    })
  }

  const handleRemoveAnswer = (questionIndex: number, answerIndex: number) => {
    setTest(prevTest => {
      const newTest = [...prevTest]
      newTest[questionIndex].answers.splice(answerIndex, 1)
      if (newTest[questionIndex].correctAnswer === answerIndex) {
        newTest[questionIndex].correctAnswer = -1
      } else if (newTest[questionIndex].correctAnswer > answerIndex) {
        newTest[questionIndex].correctAnswer -= 1
      }

      return newTest
    })
  }

  const handleRemoveQuestion = (questionIndex: number) => {
    // Display a confirmation dialog
    if (window.confirm('Are you sure you want to delete this question?')) {
      // If the user clicked "OK", then proceed with the deletion
      setTest(prevTest => {
        let newTest = [...prevTest]
        newTest.splice(questionIndex, 1)

        newTest = newTest.map((question, i) => {
          return { ...question, questionName: `Question ${i + 1}` }
        })

        return newTest
      })
    }
  }

  const value = {
    test,
    setTest,
    testName,
    setTestName,
    category,
    setCategory,
    categoryIndex,
    setCategoryIndex,
    description,
    setDescription,
    selectedTime,
    setSelectedTime,
    isPaid,
    setIsPaid,
    difficulty,
    setDifficulty,
    handleAddAnswer,
    handleSetCorrectAnswer,
    handleUpdateQuestionText,
    handleAddQuestion,
    handleAnswerChange,
    handleRemoveAnswer,
    handleRemoveQuestion
  }

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>
}

export { TestContext, TestProvider }
