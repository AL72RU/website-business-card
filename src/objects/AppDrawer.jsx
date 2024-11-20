import { Close } from '@mui/icons-material';
import { Box, Divider, Drawer } from '@mui/material';
import { useUIContext } from '../context/UIContext';
import { DrawerCloseButton } from '../styles/appBar';
import ListMenu from './ListMenu';

const AppDrawer = ({ theme }) => {
  const { drawerOpen, setDrawerOpen } = useUIContext();

  return (
    <>
      {drawerOpen && <DrawerCloseButton onClick={() => setDrawerOpen(false)} />}

      <Drawer
        open={drawerOpen}
        aria-hidden='false'
      >
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Close onClick={() => setDrawerOpen(false)}
                 sx={{ padding: '10px' }}/>
        </Box>
        <ListMenu theme={theme} />
        <Divider />
      </Drawer>
    </>
  );
};

export default AppDrawer;