import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TestType } from 'src/types/apps/takeTestTypes'

const TestDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [test, setTest] = useState<TestType | null>(null)

  console.log('Id: ', id)

  // Fetch test details based on testId
  useEffect(() => {
    const getTestDetail = async () => {
      try {
        const res = await fetch(`https://iqtest-server.onrender.com/api/tests/${id}`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        setTest(data)
      } catch (error) {
        console.error('An error occurred while fetching the test details.', error)
      }
    }

    if (id) {
      getTestDetail()
    }
  }, [id])

  console.log('Test: ', test)

  // If test details are still loading or not found
  if (!test) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* Display the test details here */}
      <h1>{test.testName}</h1>
      <p>Difficulty Level: {test.difficultLevel}</p>
      <p>Description: {test.description}</p>
      <p>Total Questions: {test.totalQuestion}</p>
      {/* You can add more information from the test object as needed */}
    </div>
  )
}

export default TestDetail
