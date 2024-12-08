import { Box, Card, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Snake from './projecs/Snake';
import { Link } from 'react-router-dom';
import { FormatListBulleted, Gesture } from '@mui/icons-material';

export default function Projects({ theme }) {

  return (
    <Box flex={4} p={2} minHeight={'calc(100vh - 97px)'}>
      <Typography variant='h6'>
        {'Here will be my mini-projects.'}
      </Typography>

      <Card variant={'outlined'} color={'neutral'} sx={{ padding: 2, marginTop: 2 }}>
        <Link to={'/projects/todolist'} style={{ paddingBlock: '10px', display: 'flex', alignItems: 'center', minWidth: '100%', textDecorationLine: 'none' }}  >
          <ListItemIcon sx={{ padding: 0, minWidth: 0, marginLeft: 3, marginRight: 2 }}>
            <FormatListBulleted />
          </ListItemIcon>
          <ListItemText primary={'Todo List'} sx={{ color: theme.palette.text.primary }}/>
        </Link>
      </Card>

      <Card variant={'outlined'} color={'neutral'} sx={{ padding: 2, marginTop: 2 }}>
        <Link to={'/projects/snake'} style={{ paddingBlock: '10px', display: 'flex', alignItems: 'center', minWidth: '100%', textDecorationLine: 'none' }}  >
          <ListItemIcon sx={{ padding: 0, minWidth: 0, marginLeft: 3, marginRight: 2 }}>
            <Gesture />
          </ListItemIcon>
          <ListItemText primary={'Snake game'} sx={{ color: theme.palette.text.primary }}/>
        </Link>
      </Card>

    </Box>
  );
}