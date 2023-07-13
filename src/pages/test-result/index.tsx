// ** React Imports

// ** Context Imports

// ** MUI Imports

const TestResultPage = () => {
  return (
    <div>
      <h1>This is Test Result for user</h1>
    </div>
  )
}

TestResultPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TestResultPage
