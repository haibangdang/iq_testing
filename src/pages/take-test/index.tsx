// ** Demo Components Imports
import TakeTest from 'src/views/take-test/TakeTest'
import { TakeTestLayoutProps } from 'src/types/apps/takeTestTypes'

const TakeTestIq = ({id}: TakeTestLayoutProps) => {
  return <TakeTest id={id} />
}

TakeTestIq.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TakeTestIq
