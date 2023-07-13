// ** React Imports

// ** Context Imports

// ** MUI Imports

const TestPage = () => {
  return (
    <div>
      <h1>This is Test Page for user</h1>
    </div>
  )
}

TestPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TestPage
