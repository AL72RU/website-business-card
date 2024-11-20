import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountBox, Home, Notes, QuestionMark } from '@mui/icons-material';
import { useUIContext } from '../context/UIContext';

const drawerList = [
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

const ListMenu = ({ theme }) => {
  const { setDrawerOpen } = useUIContext();

  return (
    <List>
      {drawerList.map(({ name, path, Icon }, index) => (
        <ListItemButton key={index}  sx={{ padding: 0 }}>
          <Link to={path} style={{ paddingBlock: '10px', display: 'flex', alignItems: 'center', minWidth: '100%', textDecorationLine: 'none' }} onClick={() => setDrawerOpen(false)} >
            <ListItemIcon sx={{ padding: 0, minWidth: 0, marginLeft: 3, marginRight: 1 }}>
              {<Icon/>}
            </ListItemIcon>
            <ListItemText primary={name} sx={{ color: theme.palette.text.primary }}/>
          </Link>
        </ListItemButton>
      ))}
    </List>
  );
};

export default ListMenu;