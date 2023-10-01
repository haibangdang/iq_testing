// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { TestType } from 'src/types/apps/takeTestTypes'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { fetchData } from 'src/store/apps/test'
import Typography from '@mui/material/Typography'

interface CellType {
  row: TestType
}

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const defaultColumns: GridColDef[] = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 30,
    headerName: '#',
    renderCell: ({ row }: CellType) => <LinkStyled href={`/take-test/${row.id}`}>{`#${row.id}`}</LinkStyled>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'testName',
    headerName: 'Test Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.testName}`}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'testType',
    headerName: 'Test Type',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.testType}`}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'difficultLevel',
    headerName: 'Difficult Level',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.difficultLevel}`}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'timeLimit',
    headerName: 'Time Limit',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`${row.timeLimit}`}</Typography>
  }
]

const TestType = () => {
  // ** State
  // const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // Fetch the test data when the component mounts
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  // Access the test data from the Redux store
  const store = useSelector((state: RootState) => state.test)
  console.log('store', store.tests)

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
          <Tooltip title='View'>
            <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/take-test/${row.id}`}>
              <Icon icon='mdi:eye-outline' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              autoHeight
              pagination
              rows={store.tests}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}

              // onRowSelectionModelChange={rows => setSelectedRows(rows)}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

//@ts-ignore
TestType.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default TestType
