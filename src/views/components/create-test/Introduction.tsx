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

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { TimePicker } from '@mui/x-date-pickers/TimePicker'

import Editor from './Editor'
import Answers from './Answers'
import { useEffect, useState } from 'react'

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
  const [data, setData] = useState([])

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

      // You can handle the error state or display an error message here if needed
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
              <Tab label='Question 1' {...a11yProps(0)} />
              <Tab label='Question 2' {...a11yProps(1)} />
              <Tab label='Add New' />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Grid container spacing={0} sx={{ bgcolor: 'background.paper' }}>
                <Grid item xs={12} md={12}>
                  <Editor />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Answers />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container spacing={0} sx={{ bgcolor: 'background.paper' }}>
                <Grid item xs={12} md={12}>
                  <Editor />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Answers />
                </Grid>
              </Grid>
            </TabPanel>
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
          {/* <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DemoContainer components={['TimePicker']}>
                <TimePicker label='Basic time picker' />
              </DemoContainer>
            </LocalizationProvider>
          </Box> */}
        </Grid>
      </Grid>
    </Box>
  )
}
