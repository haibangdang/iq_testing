import React, { useContext, useState, useEffect } from 'react'
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
import Question from './Questions'

import { TimePicker } from '@mui/x-date-pickers/TimePicker'

import TextField from '@mui/material/TextField'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { TestType } from 'src/types/apps/takeTestTypes'

import dayjs from 'dayjs'

// ** MUI Imports
// import Button from '@mui/material/Button'

// ** Icon Imports
// import Icon from 'src/@core/components/icon'

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
          <Typography component='div'>{children}</Typography>
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

interface IntroductionProps {
  initialData?: TestType | null
}

export default function Introduction({ initialData = null }: IntroductionProps) {
  const {
    test,
    setTest,
    handleRemoveQuestion,
    testName,
    setTestName,
    category,
    setCategory,
    setCategoryIndex,
    description,
    setDescription,
    selectedTime,
    setSelectedTime,
    isPaid,
    setIsPaid,
    difficulty,
    setDifficulty
  } = useContext(TestContext)

  type DataType = {
    id: number
    name: string
    description?: string
  }

  const [data, setData] = useState<DataType[]>([])
  const [diffcultyLevelList, setDiffcultyLevelList] = useState<DataType[]>([])
  const [testTypeList, setTestTypeList] = useState<DataType[]>([])

  // const [time, setTime] = useState<Date | null>(new Date())

  // const [difficulty, setDifficulty] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    if (initialData) {
      setTest(initialData.questions)
      console.log('initialData.questions: ', initialData.questions)
      setTestName(initialData.testName)
      setDescription(initialData.description)
      setCategory(initialData.testType)

      const selectedCategoryItem = testTypeList.find(item => item.name === initialData.testType.toString())

      if (selectedCategoryItem) {
        setCategoryIndex(selectedCategoryItem.id)
      }
      setSelectedTime(dayjs(initialData.timeLimit, 'HH:mm:ss'))
      setIsPaid(initialData.isPaid)
      console.log('initialData.difficultLevel: ', initialData.difficultLevel)
      setDifficulty(initialData.difficultLevel)
    }
  }, [
    initialData,
    setTest,
    setDescription,
    setTestName,
    setCategory,
    setCategoryIndex,
    setSelectedTime,
    setIsPaid,
    setDifficulty,
    testTypeList
  ])

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchDifficultyLevel = async () => {
    try {
      const response = await fetch('https://iqtest-server.onrender.com/api/difficultyLevel/', {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setDiffcultyLevelList(data)
    } catch (error) {
      console.error('Error fetching diffculty level:', error)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchTestType = async () => {
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
      setTestTypeList(data)
    } catch (error) {
      console.error('Error fetching test type:', error)
    }
  }

  useEffect(() => {
    fetchData()
    fetchDifficultyLevel()
    fetchTestType()
  }, [])

  const handleAddQuestion = () => {
    const currentLength = test.length
    setTest(prevTest => [
      ...prevTest,
      {
        questionName: `Question ${currentLength + 1}`,
        questionText: `Question ${currentLength + 1}`,
        answers: [],
        correctAnswer: -1
      }
    ])
  }

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string)

    // const index = data.findIndex(item => item.name === event.target.value.toString())

    // setCategoryIndex(index)

    const selectedItem = data.find(item => item.name === event.target.value.toString())

    if (selectedItem) {
      setCategoryIndex(selectedItem.id) // set id of selected item instead of index
    }
  }

  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleListItemClick = (index: number) => {
    setValue(index) // Switch tabs to the selected question
    setCurrentQuestionIndex(index) // Select the question
  }

  return (
    <Box>
      <Box>Name:</Box>
      <TextField
        multiline
        maxRows={4}
        fullWidth
        sx={{ height: '150px' }}
        value={testName}
        label='Test Name'
        onChange={event => setTestName(event.target.value)}
        id='textarea-outlined-controlled'
      />
      <Box>Introduction:</Box>
      <TextField
        multiline
        maxRows={4}
        fullWidth
        sx={{ height: '150px' }}
        value={description}
        label='Description'
        onChange={event => setDescription(event.target.value)}
        id='textarea-outlined-controlled'
      />
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
                <Tab
                  key={index}
                  icon={
                    <DeleteOutlineIcon
                      onClick={event => {
                        event.stopPropagation()
                        handleRemoveQuestion(index)
                      }}
                    />
                  }
                  label={`Question ${index + 1}`}
                  {...a11yProps(index)}
                />
              ))}
              <Tab label='Add New' onClick={handleAddQuestion} />
            </Tabs>
            {test.map((question, index) => (
              <TabPanel key={index} value={value} index={index}>
                <Question index={index} handleListItemClick={handleListItemClick} />
              </TabPanel>
            ))}
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ minWidth: 220, mt: 4, mr: 2 }}>
            <Box sx={{ mb: 2 }}>
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
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <TimePicker
                  label='Time limit'
                  views={['hours', 'minutes', 'seconds']}
                  format='hh:mm:ss'
                  value={selectedTime}
                  onChange={newValue => {
                    setSelectedTime(newValue)
                  }}
                />
              </FormControl>
            </Box>

            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id='difficulty-select-label'>Difficulty</InputLabel>
                <Select
                  labelId='difficulty-select-label'
                  id='difficulty-select'
                  value={difficulty}
                  label='Difficulty'
                  onChange={e => setDifficulty(e.target.value)}
                >
                  {diffcultyLevelList &&
                    diffcultyLevelList.map((item: any) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}

                  {/* <MenuItem value={'easy'}>Easy</MenuItem>
                  <MenuItem value={'medium'}>Medium</MenuItem>
                  <MenuItem value={'hard'}>Hard</MenuItem> */}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <FormControlLabel
                  control={
                    <Checkbox checked={isPaid} onChange={event => setIsPaid(event.target.checked)} name='isPaid' />
                  }
                  label='paid test'
                />
              </FormControl>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
