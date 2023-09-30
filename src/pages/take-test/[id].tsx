// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Types
import { TestType } from 'src/types/apps/takeTestTypes'

// ** Demo Components Imports
import TakeTestIq from 'src/views/take-test/TakeTest'

const TakeTest = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <TakeTestIq id={id} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch('https://iqtest-server.onrender.com/api/tests', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Check if the response status is okay
    if (!res.ok) {
      console.error('Failed to fetch data')

      return {
        paths: [],
        fallback: true // Set to true for dynamic routing with fallback
      }
    }

    // Assuming your API returns an array of TestType objects
    const data = await res.json()

    console.error('fetch data: ', data)

    const paths = data.test.map((item: TestType) => ({
      params: { id: `${item.id}` }
    }))

    return {
      paths,
      fallback: true // Set to true for dynamic routing with fallback
    }
  } catch (error) {
    console.error('Error fetching data:', error)

    return {
      paths: [],
      fallback: true // Set to true for dynamic routing with fallback
    }
  }
}

export const getStaticProps: GetStaticProps = ({ params }: GetStaticPropsContext) => {
  return {
    props: {
      id: params?.id
    }
  }
}

TakeTest.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TakeTest
