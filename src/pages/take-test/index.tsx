import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

// ** Next Imports
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

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
const TakeTest = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {

  console.log('apiData', apiData);
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
          <Tab label='Question 01: ' {...a11yProps(0)} />
          <Tab label='Question 02: ' {...a11yProps(1)} />
          <Tab label='Question 03: ' {...a11yProps(2)} />
          <Tab label='Question 04: ' {...a11yProps(3)} />
          <Tab label='Question 05: ' {...a11yProps(4)} />
          <Tab label='Question 06: ' {...a11yProps(5)} />
          <Tab label='Question 07: ' {...a11yProps(6)} />
          <Tab label='Question 08: ' {...a11yProps(7)} />
          <Tab label='Question 09: ' {...a11yProps(8)} />
          <Tab label='Question 10: ' {...a11yProps(9)} />
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

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('/tests/getAll')

  // const res = await axios.get('https://iqtest-server.onrender.com/api/tests')

  const apiData: any = res.data

  return {
    props: {
      apiData
    }
  }
}

TakeTest.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TakeTest

// https://iqtest-server.onrender.com/api/tests