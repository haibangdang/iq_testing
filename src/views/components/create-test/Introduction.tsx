import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Descriptions from './Descriptions'
import Answers from './Answers'

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
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={0} sx={{ bgcolor: 'background.paper' }}>
      <Grid item xs={12} md={12}>
        <Box>Introduction:</Box>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
          <Tabs
            orientation='vertical'
            value={value}
            onChange={handleChange}
            aria-label='Vertical tabs example'
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label='Question 01' {...a11yProps(0)} />
            <Tab label='Question 02' {...a11yProps(1)} />
            <Tab label='Question 03' {...a11yProps(2)} />
            <Tab label='Add New' {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Grid container spacing={0} sx={{ bgcolor: 'background.paper' }}>
              <Grid item xs={12} md={12}>
                <Descriptions />
              </Grid>
              <Grid item xs={12} md={12}>
                <Answers />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={0} sx={{ bgcolor: 'background.paper' }}>
              <Grid item xs={12} md={12}>
                <Descriptions />
              </Grid>
              <Grid item xs={12} md={12}>
                <Answers />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container spacing={0} sx={{ bgcolor: 'background.paper' }}>
              <Grid item xs={12} md={12}>
                <Descriptions />
              </Grid>
              <Grid item xs={12} md={12}>
                <Answers />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={3}>
            Add New
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  )
}
