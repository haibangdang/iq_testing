import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TestResultDetailType } from 'src/types/apps/takeTestTypes'
import TestResultDisplay from 'src/views/components/test-result/TestResultDisplay'

const TestResultDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [testResult, setTestResult] = useState<TestResultDetailType | null>(null)

  console.log('resultId: ', id)

  // Fetch test result details based on resultId
  useEffect(() => {
    const getTestResultDetail = async () => {
      try {
        const res = await fetch(`https://iqtest-server.onrender.com/api/tests/results/${id}`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        console.log('Test result detail data: ', data)
        setTestResult(data)
      } catch (error) {
        console.error('An error occurred while fetching the test details.', error)
      }
    }

    if (id) {
      getTestResultDetail()
    }
  }, [id])

  console.log('Test: ', testResult)

  // If test details are still loading or not found
  if (!testResult) {
    return <div>Loading...</div>
  }

  // return (
  //   <div>
  //     {/* Display the test details here */}
  //     <h1>{test.testName}</h1>
  //     <p>Difficulty Level: {test.difficultLevel}</p>
  //     <p>Description: {test.description}</p>
  //     <p>Total Questions: {test.totalQuestion}</p>
  //     {/* You can add more information from the test object as needed */}
  //   </div>
  // )

  return (
    <div>
      {/* <h1>{test.testName}</h1> */}
      {/* Use the TestDisplay component to display test details */}
      <TestResultDisplay testResult={testResult} />
    </div>
  )
}

TestResultDetail.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TestResultDetail
