import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountBox, Home, Notes, QuestionMark } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawer = [
  {
    name: 'Home',
    path: '/home',
    Icon: Home
  },
  {
    name: 'Profile',
    path: '/profile',
    Icon: AccountBox
  },
  {
    name: 'Projects',
    path: '/projects',
    Icon: QuestionMark
  },
  {
    name: 'Notes',
    path: '/notes',
    Icon: Notes
  },
];

const Sidebar = ({ theme }) => {

  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: 'none', sm: 'block' }}}
      padding={1}
    >
      <div position='fixed' >
        <List>
          {drawer.map(({ name, path, Icon }, index) => (
            <ListItem disablePadding key={index}>
              <Link to={path} style={{ display: 'flex', alignItems: 'center', minWidth: '100%', textDecorationLine: 'none' }}>
                <ListItemIcon sx={{ padding: 0, minWidth: 0, marginInline: 1 }}>
                  {<Icon/>}
                </ListItemIcon>
                <ListItemText primary={name} sx={{ marginBlock: '10px', color: theme.palette.text.primary }}/>
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );
};

export default Sidebar;
