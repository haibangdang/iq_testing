import * as React from 'react'
import { useEffect } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

import { RootState, AppDispatch } from 'src/store'

import { useDispatch, useSelector } from 'react-redux'
import { selectedTest } from 'src/store/apps/test'

import { TakeTestLayoutProps } from 'src/types/apps/takeTestTypes'

// ** Styled Component Import
import { TakeTestWrapper, SubmitButton } from 'src/@core/styles/libs/take-test'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

// export default function TakeTest() {
const TakeTestIQ = ({id} : TakeTestLayoutProps) => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(selectedTest(id))
  }, [dispatch])

  const store = useSelector((state: RootState) => state.test.selectedTest)
  console.log('store selected test', store);
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <TakeTestWrapper>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
        <Tabs
          orientation='vertical'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {/* @ts-ignore */}
          {store && store.questions && store.questions.map((item: any) => (
          <Tab key={item.id} label={item.questionText} {...a11yProps(item.id)} />
          ))}
        </Tabs>
        <TabPanel value={value} index={0}>
          Content of Question 01
        </TabPanel>
        <TabPanel value={value} index={1}>
          Content of Question 02
        </TabPanel>
        <TabPanel value={value} index={2}>
          Content of Question 03
        </TabPanel>
        <TabPanel value={value} index={3}>
          Content of Question 04
        </TabPanel>
        <TabPanel value={value} index={4}>
          Content of Question 05
        </TabPanel>
        <TabPanel value={value} index={5}>
          Content of Question 06
        </TabPanel>
        <TabPanel value={value} index={6}>
          Content of Question 07
        </TabPanel>
        <TabPanel value={value} index={7}>
          Content of Question 08
        </TabPanel>
        <TabPanel value={value} index={8}>
          Content of Question 09
        </TabPanel>
        <TabPanel value={value} index={9}>
          Content of Question 10
        </TabPanel>
      </Box>
      <SubmitButton>
        <Button variant='contained' startIcon={<FiberManualRecordIcon />}>
          Submit
        </Button>
      </SubmitButton>
    </TakeTestWrapper>
  )
}

TakeTestIQ.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TakeTestIQ