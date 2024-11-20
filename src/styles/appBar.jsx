import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DrawerCloseButton = styled(Button)(() => ({
  position: 'absolute',
  top: 0,
  left: '201px',
  zIndex: 1999,
  width: 'calc(100% - 201px)',
  height: '100%',
  cursor: 'default'
}));