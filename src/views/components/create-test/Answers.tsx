import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

export default function Answers() {
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component='nav' aria-label='secondary mailbox folder'>
        <ListItemButton selected={selectedIndex === 0} onClick={event => handleListItemClick(event, 0)}>
          <ListItemText primary='Answer 1:' />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 1} onClick={event => handleListItemClick(event, 1)}>
          <ListItemText primary='Answer 2: (Correct Answer)' />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 2} onClick={event => handleListItemClick(event, 2)}>
          <ListItemText primary='Answer 3:' />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 3} onClick={event => handleListItemClick(event, 3)}>
          <ListItemText primary='Answer 4: ' />
        </ListItemButton>
        <ListItemButton onClick={event => handleListItemClick(event, 3)}>
          <ListItemText primary='Add new' />
        </ListItemButton>
      </List>
    </Box>
  )
}
