// TestDisplay.tsx
import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { TestType } from 'src/types/apps/takeTestTypes'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
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

interface TestDisplayProps {
  test: TestType
}

const TestDisplay: React.FC<TestDisplayProps> = ({ test }) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box>
      <Box>Name:</Box>
      <Typography>{test.testName}</Typography>
      <Box>Introduction:</Box>
      <Typography>{test.description}</Typography>
      <Grid container spacing={0} sx={{ bgcolor: 'background.paper' }}>
        <Grid item xs={9}>
          <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
            <Tabs
              orientation='vertical'
              value={value}
              onChange={handleChange}
              aria-label='Vertical tabs example'
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              {test.questions.map((question, index) => (
                <Tab key={index} label={question.questionText} {...a11yProps(index)} />
              ))}
            </Tabs>
            {test.questions.map((question, index) => (
              <TabPanel key={index} value={value} index={index}>
                <Typography>{question.questionText}</Typography>
              </TabPanel>
            ))}
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ minWidth: 220, mt: 4, mr: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography>Category: {test.testType}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography>Time limit: {test.timeLimit}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography>Difficulty: {test.difficultLevel}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <FormControlLabel control={<Checkbox checked={test.isPaid} name='isPaid' disabled />} label='paid test' />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TestDisplay
