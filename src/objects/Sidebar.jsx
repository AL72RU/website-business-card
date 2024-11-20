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
      <div position='fixed' >
        <ListMenu theme={theme} />
      </div>
    </Box>
  );
};

export default Sidebar;
