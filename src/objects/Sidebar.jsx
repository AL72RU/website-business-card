import { Box } from '@mui/material';
import ListMenu from './ListMenu';

const Sidebar = ({ theme }) => {

  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: 'none', sm: 'block' }}}
      padding={1}
    >
      <Box position='fixed' >
        <ListMenu theme={theme} />
      </Box>
    </Box>
  );
};

export default Sidebar;
