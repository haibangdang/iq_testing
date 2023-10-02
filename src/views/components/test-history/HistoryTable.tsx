// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Store & Actions Imports
import { useDispatch } from 'react-redux'

// import { fetchData, deleteInvoice } from 'src/store/apps/invoice'
import { fetchTestResult, deleteTestResult } from 'src/store/apps/test-result'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { TestResultType } from 'src/types/apps/takeTestTypes'

// ** Custom Components Imports
// import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from './TableHeader'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// interface InvoiceStatusObj {
//   [key: string]: {
//     icon: string
//     color: ThemeColor
//   }
// }

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: TestResultType
}

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** Vars
// const invoiceStatusObj: InvoiceStatusObj = {
//   Sent: { color: 'secondary', icon: 'mdi:send' },
//   Paid: { color: 'success', icon: 'mdi:check' },
//   Draft: { color: 'primary', icon: 'mdi:content-save-outline' },
//   'Partial Payment': { color: 'warning', icon: 'mdi:chart-pie' },
//   'Past Due': { color: 'error', icon: 'mdi:information-outline' },
//   Downloaded: { color: 'info', icon: 'mdi:arrow-down' }
// }

// ** renders client column
// const renderClient = (row: InvoiceType) => {
//   if (row.avatar.length) {
//     return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
//   } else {
//     return (
//       <CustomAvatar
//         skin='light'
//         color={(row.avatarColor as ThemeColor) || ('primary' as ThemeColor)}
//         sx={{ mr: 3, fontSize: '1rem', width: 34, height: 34 }}
//       >
//         {getInitials(row.name || 'Hai Bang')}
//       </CustomAvatar>
//     )
//   }
// }

const defaultColumns: GridColDef[] = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: '#',
    renderCell: ({ row }: CellType) => <LinkStyled href={`/apps/test-result/view/${row.id}`}>{`#${row.id}`}</LinkStyled>
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'startTime',
    headerName: 'Start Time',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.startTime.toString()}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'endTime',
    headerName: 'End Time',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.endTime.toString()}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'duration',
    headerName: 'Duration',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.duration.toString()}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'totalScore',
    headerName: 'Total Score',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.totalScore.toString()}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'totalQuestion',
    headerName: 'totalQuestion',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.totalQuestions.toString()}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'testTypeName',
    headerName: 'Test Type',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.testTypeName?.toString() ?? ''}
        </Typography>
      )
    }
  }
]

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})
/* eslint-enable */

const HistoryTable = () => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const [testResults, setTestResults] = useState([])

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchTestResult())
  }, [dispatch, value])

  useEffect(() => {
    const getTestResults = async () => {
      try {
        // Get user data from local storage
        const userDataStr = window.localStorage.getItem('userData')
        const userDataObj = userDataStr ? JSON.parse(userDataStr) : null
        const userId = userDataObj ? userDataObj.id : null

        // Check if userId exists
        if (!userId) {
          console.error('User ID not found in localStorage.')

          return
        }

        // Construct the API endpoint with the userId
        const endpoint = `https://iqtest-server.onrender.com/api/tests/history/${userId}`

        const res = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        console.log('user got: ', data)
        setTestResults(data || [])
      } catch (error) {
        console.error('An error occurred while fetching the tests.', error)
      }
    }

    getTestResults()
  }, [])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Delete Test result'>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => dispatch(deleteTestResult(row.id))}>
              <Icon icon='mdi:delete-outline' />
            </IconButton>
          </Tooltip>
          <Tooltip title='View'>
            <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/apps/test-result/view/${row.id}`}>
              <Icon icon='mdi:eye-outline' />
            </IconButton>
          </Tooltip>
          {/* <OptionsMenu
            iconProps={{ fontSize: 20 }}
            iconButtonProps={{ size: 'small' }}
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            options={[
              {
                text: 'Download',
                icon: <Icon icon='mdi:download' fontSize={20} />
              },
              {
                text: 'Edit',
                href: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon='mdi:pencil-outline' fontSize={20} />
              },
              {
                text: 'Duplicate',
                icon: <Icon icon='mdi:content-copy' fontSize={20} />
              }
            ]}
          /> */}
        </Box>
      )
    }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
            <DataGrid
              autoHeight
              pagination
              rows={testResults || []}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowSelectionModelChange={rows => setSelectedRows(rows)}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default HistoryTable
