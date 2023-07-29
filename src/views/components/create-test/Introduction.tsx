import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'

import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { TestContext } from 'src/context/TestContext'

import Editor from './Editor'
import Answers from './Answers'
import Questions from './Questions'
import { useEffect, useState, useContext } from 'react'

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

export default function Introduction() {
  const { test, setTest } = useContext(TestContext)

  const [data, setData] = useState([])

  const [answers, setAnswers] = useState<string[]>(['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'])
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)

  const handleAddQuestion = () => {
    setTest(prevTest => [
      ...prevTest,
      { questionText: `Question ${prevTest.length + 1}`, answers: [], correctAnswer: -1 }
    ])
  }

  console.log('data', data)
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('https://iqtest-server.onrender.com/api/testtypes/', {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const [category, setCategory] = React.useState('')

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string)
  }

  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box>
      <Box>Introduction:</Box>

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
              {test.map((question, index) => (
                <Tab label={question.questionText} {...a11yProps(index)} />
              ))}
              <Tab label='Add New' onClick={handleAddQuestion} />
            </Tabs>
            {test.map((question, index) => (
              <TabPanel value={value} index={index}>
                <Grid container spacing={0} sx={{ bgcolor: 'background.paper' }}>
                  <Grid item xs={12} md={12}>
                    <Editor />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Answers
                      index={index}
                      answers={test[index].answers}
                      correctAnswer={test[index].correctAnswer}
                      handleListItemClick={(answerIndex: number) => {
                        const newTest = [...test]
                        newTest[index].correctAnswer = answerIndex
                        setTest(newTest)
                      }}
                      handleAddAnswer={() => {
                        const newTest = [...test]
                        if (newTest[index].answers.length < 10) {
                          // Add this condition
                          newTest[index].answers = [
                            ...newTest[index].answers,
                            `Answer ${newTest[index].answers.length + 1}`
                          ]
                          setTest(newTest)
                        } else {
                          alert('You can add up to 10 answers')
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
            ))}
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ minWidth: 220, mt: 4, mr: 2 }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Category</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={category}
                label='Age'
                onChange={handleChangeSelect}
              >
                {data &&
                  data.map((item: any) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
